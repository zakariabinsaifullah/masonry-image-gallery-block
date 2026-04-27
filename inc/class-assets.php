<?php
/**
 * Asset registration — external library scripts and styles.
 *
 * @package MGB\MasonryImageGallery
 */

namespace MGB\MasonryImageGallery;

defined( 'ABSPATH' ) || exit;

/**
 * Class Assets
 *
 * Registers all third-party library handles so they can be declared
 * as dependencies in block.json. WordPress will then only enqueue
 * them on pages that actually contain the block.
 */
class Assets {

	/**
	 * Register all external library assets.
	 *
	 * Called on the 'init' hook at priority 5, before block registration,
	 * so the handles are ready when block.json is parsed.
	 */
	public function register(): void {
		wp_register_style(
			'migb-magnific-css',
			MIGB_ASSETS_URL . 'css/magnific-popup.css',
			array(),
			MIGB_VERSION
		);

		wp_register_script(
			'migb-magnific-popup',
			MIGB_ASSETS_URL . 'js/jquery.magnific-popup.min.js',
			array( 'jquery' ),
			MIGB_VERSION,
			true
		);

		// Lightbox depends on magnific-popup, so enqueuing it pulls in the whole chain.
		wp_register_script(
			'migb-lightbox',
			MIGB_ASSETS_URL . 'js/lightbox.js',
			array( 'jquery', 'migb-magnific-popup' ),
			MIGB_VERSION,
			true
		);
	}
}
