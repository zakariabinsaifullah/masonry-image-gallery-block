<?php
/**
 * Main plugin class — wires up all components.
 *
 * @package MGB\MasonryImageGallery
 */

namespace MGB\MasonryImageGallery;

defined( 'ABSPATH' ) || exit;

/**
 * Class Plugin
 *
 * Singleton entry-point. Instantiates each component and registers
 * every WordPress hook from a single, readable location.
 */
final class Plugin {

	/**
	 * Singleton instance.
	 *
	 * @var Plugin|null
	 */
	private static ?Plugin $instance = null;

	/**
	 * Returns the singleton instance, creating it on first call.
	 */
	public static function instance(): self {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Private constructor — registers all plugin hooks.
	 */
	private function __construct() {
		$assets = new Assets();
		$block  = new Block();

		// Priority 5: register external assets before the block reads block.json.
		add_action( 'init', array( $assets, 'register' ), 5 );

		// Priority 10: register the block type (default init priority).
		add_action( 'init', array( $block, 'register' ), 10 );
	}
}
