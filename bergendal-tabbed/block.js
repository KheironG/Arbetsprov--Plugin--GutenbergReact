const { __ }                = wp.i18n;
const { registerBlockType } = wp.blocks;
import ReactContentTabs from 'react-content-tabs';

registerBlockType( 'bergendal-blocks/bergendal-tabbed', {
    title: __( 'Bergendal Tabbed' ),
    description: __( 'This block is used for creating tabbed content' ),
    category: 'widgets',
    edit: ( props ) => {
        return (
            <Tabs.Tabs>
      <Tabs.TabBar>
        <Tabs.Tab tabFor="upcoming">Upcoming</Tabs.Tab>
        <Tabs.Tab tabFor="completed">Completed</Tabs.Tab>
        <Tabs.Tab tabFor="calendar">Calendar</Tabs.Tab>
      </Tabs.TabBar>

      <Tabs.ContentWrapper>
        <Tabs.Content id="upcoming">Upcoming content.</Tabs.Content>
        <Tabs.Content id="completed">Completed content.</Tabs.Content>
        <Tabs.Content id="calendar">Calendar content.</Tabs.Content>
      </Tabs.ContentWrapper>
    </Tabs.Tabs>
        );
    },
    save() {
        return (
			<div>
				<div>
					<h4>Title goes here.</h4>
					<p>The description of your concept item goes here.</p>
				</div>
			</div>
        )
    },
} );
