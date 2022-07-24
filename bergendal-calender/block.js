const { __ }                 = wp.i18n;
const { registerBlockType }  = wp.blocks;
const { withSelect, select } = wp.data;
import { Markup } from 'interweave';

const bergendalIcon = wp.element.createElement('svg',
	{
		width: 30,
		height: 30,
        color: '#5E7330'
	},
	wp.element.createElement( 'path',
		{
			d: "M59.14,28.917a13.323,13.323,0,0,0-9.689-8.04,10.252,10.252,0,0,0,1.813-6.326,11.947,11.947,0,0,0-3.582-7.743,10.447,10.447,0,0,1,6.746-2l.027-.515A15.721,15.721,0,0,0,46.3,5.528,25.574,25.574,0,0,0,36.753.692c-6.692-1.53-12.718-.515-17.1,2.95a14.728,14.728,0,0,0-4.085,5.036A18.3,18.3,0,0,0,0,26.745,18.578,18.578,0,0,0,4.636,39.293a16.73,16.73,0,0,0,12.75,5.748C27.019,45,30.594,39.859,33.518,32.613a13.324,13.324,0,0,0,1.189,6.778A9.837,9.837,0,1,0,43.97,25.308a12.9,12.9,0,0,0,5.149-3.969A12.8,12.8,0,0,1,51.611,45.8s.263.45,1.428-.1a13.346,13.346,0,0,0,6.1-16.783M19.973,4.046C24.2.7,30.072-.316,36.516,1.168c3.817,1.066,6.3,2.966,7.737,5.422a22.409,22.409,0,0,0-4.234,3.352A12.727,12.727,0,0,0,28.595,2.548l-.1,0a10.921,10.921,0,0,0-9.709,5.941c-.173-.005-.345-.008-.519-.008h0a18.39,18.39,0,0,0-2.079.119,14.234,14.234,0,0,1,3.786-4.55M40.7,15.368a13.225,13.225,0,0,1-4.5,9.943,72.094,72.094,0,0,1,4.5-10.093c0,.05,0,.1,0,.151m-9.889,9.318c-.557,1.3-1.116,2.581-1.694,3.833a13.294,13.294,0,0,1-1.677.108A12.931,12.931,0,0,1,14.573,15.36l0-.162a14.184,14.184,0,0,1,1.345-6.048,17.807,17.807,0,0,1,2.355-.157c.092,0,.183,0,.274,0a10.914,10.914,0,0,0-.418,7.857c.348.954.794.65.794.65a10.4,10.4,0,0,1,.183-8.49A17.569,17.569,0,0,1,31.213,14.6s.33-.486-.421-1.151A18.36,18.36,0,0,0,19.354,8.511,10.407,10.407,0,0,1,28.4,3.06l.1,0a12.212,12.212,0,0,1,11.13,7.274c-4.812,4.993-7.651,11.636-8.818,14.349M14.4,41.759c-3.972.063-7.553-1.251-9.686-3.75a16.836,16.836,0,0,1-4.2-11.264A17.781,17.781,0,0,1,15.3,9.242a14.733,14.733,0,0,0-1.251,5.964l0,.162A13.439,13.439,0,0,0,27.442,29.142a13.818,13.818,0,0,0,1.422-.076C25.622,35.953,21.732,41.643,14.4,41.759m33.064-9.107a6.688,6.688,0,0,1-6.64,6.739,6.527,6.527,0,0,1-6.786-6.585,12.774,12.774,0,0,1,9.609-11.293A13.118,13.118,0,0,1,39.2,26.2c.151-.036.456-.092.454-.091.17-.029.531-.071.538-.072.176-.017.353-.028.532-.029s.371.01.554.024c.166.014.491.058.491.058a6.685,6.685,0,0,1,5.693,6.558M45.861,13.9a16.432,16.432,0,0,1-1.877,7.006,13.25,13.25,0,0,0-5.366,2.5,13.692,13.692,0,0,0,2.6-8.037c0-.331-.017-.658-.041-.983a28.945,28.945,0,0,1,4.082-5.5,15.1,15.1,0,0,1,.6,5.018"
		}
	)
);

registerBlockType( 'bergendal-blocks/bergendal-calender', {
    title: __( 'Bergendal Calender' ),
    description: __( 'This block is used for fetching the latest Calender events' ),
    icon: bergendalIcon,
    category: 'common',

    edit: withSelect( select => {
        const query = { per_page: 3 };
        const posts = select( 'core' ).getEntityRecords( 'postType', 'calender', query );
        if (posts) {
            const thumbIDs = posts.map( function(a) { return a.featured_media } );
            const thumbs   = select( 'core').getMediaItems( { include: thumbIDs } );
            if (thumbs) {
                return {
                    posts: posts,
                    thumbs: thumbs
                };
            }
        }
})( props => {

    if (!props.posts || !props.thumbs ) {
        return 'Loading posts...';
    }

	const thumbs = props.thumbs;
	const posts = props.posts;

	//Compiles items to imageItem or textItem
	const items = document.createElement('div');
	items.className = props.className;
	for ( let  i = 0; i < posts.length; i++ ) {

		const frame = document.createElement('div');
		const div = document.createElement('div');
		const title = document.createElement('h3');
		const date  = document.createElement('p');
		const desc  = document.createElement('p');
		const button = document.createElement('a');

		//If textItem
		if ( posts[i].featured_media == 0 ) {
			const textItem  = document.createElement('div');
			const innerFrame = document.createElement('div');
			textItem.className = 'bergendal-calender-item';
			frame.className = 'bergendal-calender-frame';
			innerFrame.className = 'bergendal-calender-inner-frame-text';
			date.className = 'bergendal-calender-date';
			title.className = 'bergendal-calender-title';
			desc.className = 'bergendal-calender-desc';
			button.className = 'link-button';

			date.textContent = posts[i].date;
			title.textContent = posts[i].title.raw;
			desc.textContent = posts[i].acf.brief_description;
			button.textContent = 'LÄS MER';
			button.href = posts[i].guid.raw;

			textItem.appendChild(frame);
			frame.appendChild(innerFrame);
			innerFrame.appendChild(div);
			div.appendChild(date);
			div.appendChild(title);
			innerFrame.appendChild(desc);
			innerFrame.appendChild(button);
			items.appendChild(textItem);

		//if imageItem, extract url from thumbs
		}  else if ( posts[i].featured_media != 0 ) {
			let imageURL;
			for ( let thumb of thumbs ) {
				if ( thumb.id == posts[i].featured_media ) {
					imageURL = thumb.guid.raw;
				}
			}
			const imageItem  = document.createElement('a');
			const innerFrame = document.createElement('img');
			imageItem.className = 'bergendal-calender-item';
			frame.className = 'bergendal-calender-frame';
			innerFrame.className = 'bergendal-calender-inner-frame-image';
			div.className = 'bergendal-calender-image-item-text';
			date.className = 'bergendal-calender-date';
			title.className = 'bergendal-calender-title';

			imageItem.href = posts[i].link;
			innerFrame.src = imageURL;
			title.textContent = posts[i].title.raw;
			date.textContent = posts[i].date;
			desc.textContent =posts[i].acf.brief_description;

			imageItem.appendChild(frame);
			frame.appendChild(innerFrame);
			frame.appendChild(div);
			div.appendChild(date);
			div.appendChild(title);
			items.appendChild(imageItem);
		}

	}
	return (
			<Markup content={items.outerHTML} />
	);
}),

    save: () => {  }
});
