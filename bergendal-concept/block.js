const { __ }                    = wp.i18n;
const { registerBlockType }     = wp.blocks;
const { RichText, MediaUpload } = wp.editor;
const { Button }				= wp.components;

registerBlockType( 'bergendal-blocks/bergendal-concept', {
    title: __( 'Bergendal Concept' ),
    description: __( 'This block is used for describing the Bergendal Concept' ),
    icon: 'welcome-write-blog',
    category: 'widget',
	attributes: {
		title: {
			type: 'string',
			source: 'text',
			selector: 'h3'
		},
		description: {
			type: 'string',
			source: 'text',
			selector: 'p'
		},
		mediaID: {
			type: 'number'
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src'
		}
	},
    edit: ( { className, setAttributes, attributes: { title, description, mediaID, mediaURL } } ) => {

		const onChangeTitle = title => {
			setAttributes( { title: title } );
		}

		const onChangeDescription = description => {
			setAttributes( { description: description } );
		}

		const onSelectImage = newImage => {
			setAttributes( {
				mediaID: newImage.id,
				mediaURL: newImage.url
			} );
		}

        return (
			<div className={ className }>
				<div className="bergendal-concept-frame">
					<div className="bergendal-concept-image-container">
						<img class="bergendal-concept-image" src={ !mediaID ? '' : mediaURL  } />
						<MediaUpload
							onSelect={ onSelectImage }
							value={ mediaID }
							render={ ( { open } ) => (
								<Button
									onClick={ open }
									className="button button-large">
										{ !mediaID ? __( 'Select Image' ) :  __( 'Change Image' )  }
								</Button>
							) }
						/>
					</div>
					<RichText
						tagName='h3'
						className="bergendal-concept-title"
						onChange={ onChangeTitle }
						value={ title }
						placeholder= { __( 'Title goes here...' ) }
					/>
					<RichText
						tagName='p'
						className="bergendal-concept-description"
						onChange={ onChangeDescription }
						value={ description }
						placeholder= { __( 'Description goes here...' ) }
					/>
				</div>
			</div>
        );
    },
    save: ( { className, setAttributes, attributes: { title, description, mediaID, mediaURL } } ) => {
        return (
			<div className={ className }>
				<div className="bergendal-concept-frame">

						{ mediaURL && ( <img src={ mediaURL } className='bergendal-concept-image' /> ) }

					<RichText.Content
						tagName='h3'
						className="bergendal-concept-title"
						value={ title }
					/>
					<RichText.Content
						tagName='p'
						className="bergendal-concept-description"
						value={ description }
					/>
				</div>
			</div>
        );
    },
} );
