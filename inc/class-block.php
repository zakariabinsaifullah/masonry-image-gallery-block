<?php
/**
 * Block type registration.
 *
 * @package MGB\MasonryImageGallery
 */

namespace MGB\MasonryImageGallery;

defined( 'ABSPATH' ) || exit;

/**
 * Class Block
 *
 * Registers the masonry-gallery block type from its block.json metadata.
 * The block.json file references the pre-registered external library handles
 * (migb-lightbox, migb-magnific-css) as view-script and style dependencies,
 * so WordPress loads them only on pages that render the block.
 */
class Block {

	/**
	 * Register the block type.
	 *
	 * Called on the 'init' hook at priority 10, after Assets::register()
	 * has already made the library handles available.
	 */
	public function register(): void {
		register_block_type( MIGB_PATH . 'build/blocks/masonry-gallery' );
	}
}
