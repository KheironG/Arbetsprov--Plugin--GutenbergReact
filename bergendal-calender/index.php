<?php
defined( 'ABSPATH' ) || exit;

function bergendal_blocks_bergendal_calender_enqueue_block_editor_assets() {
    wp_enqueue_script(
        'bergendal-blocks-bergendal-calender',
        plugins_url( 'block.build.js', __FILE__ ),
        array( 'wp-blocks', 'wp-i18n', 'wp-editor', 'wp-components', 'wp-data', 'wp-element' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'block.build.js' )
    );

    wp_enqueue_style(
        'bergendal-blocks-bergendal-calender',
        plugins_url( 'editor.css', __FILE__ ),
        array( 'wp-edit-blocks' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
    );
}
add_action( 'enqueue_block_editor_assets', 'bergendal_blocks_bergendal_calender_enqueue_block_editor_assets' );

//Enqueues frontend assets
function bergendal_blocks_bergendal_calender_enqueue_block_assets() {
    wp_enqueue_style(
        'bergendal-blocks-bergendal-calender-frontend',
        plugins_url( 'style.css', __FILE__ ),
        array(),
        filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
    );
}
add_action( 'enqueue_block_assets', 'bergendal_blocks_bergendal_calender_enqueue_block_assets' );

?>
