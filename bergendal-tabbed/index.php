<?php
defined( 'ABSPATH' ) || exit;

function bergendal_blocks_bergendal_tabbed_enqueue_block_editor_assets() {
    wp_enqueue_script(
        'bergendal-blocks-bergendal-tabbed',
        plugins_url( 'block.build.js', __FILE__ ),
        array( 'wp-blocks', 'wp-i18n', 'wp-element' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'block.build.js' )
    );
}
add_action( 'enqueue_block_editor_assets', 'bergendal_blocks_bergendal_tabbed_enqueue_block_editor_assets' );
?>
