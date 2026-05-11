<?php
/**
 * Plugin Name:       Masonry Image Gallery Block
 * Description:       Masonry Image Gallery is a custom Gutenberg block built with native Gutenberg components. Easily create beautiful image galleries in the Block Editor.
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Version:           2.3.1
 * Author:            Zakaria Binsaifullah
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       mgb-masonry-image-gallery
 *
 * @package MGB\MasonryImageGallery
 */

namespace MGB\MasonryImageGallery;

defined( 'ABSPATH' ) || exit;

// Plugin constants.
define( 'MIGB_VERSION',    '2.3.1' );
define( 'MIGB_PATH',       plugin_dir_path( __FILE__ ) );
define( 'MIGB_URL',        plugin_dir_url( __FILE__ ) );
define( 'MIGB_ASSETS_URL', MIGB_URL . 'assets/' );

// Load classes.
require_once MIGB_PATH . 'inc/class-assets.php';
require_once MIGB_PATH . 'inc/class-block.php';
require_once MIGB_PATH . 'inc/class-plugin.php';

// Kickoff.
Plugin::instance();
