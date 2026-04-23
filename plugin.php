<?php
/**
 * Plugin Name:       Masonry Image Gallery Block
 * Description:       <strong>Masonry Image Gallery</strong> is a custom <strong>Gutenberg Block</strong> built with <strong>Gutenberg Native Components</strong>. You can easily create an image gallery in Gutenberg Editor with this block.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           2.2.3
 * Author:            Zakaria Binsaifullah
 * Author URI:        https://makegutenblock.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       masonry-image-gallery
 *
 * @package           @wordpress/create-block
 */

// Stop Direct Access
if (!defined("ABSPATH")) {
  exit();
}

require_once plugin_dir_path(__FILE__) . "admin/admin.php";

/**
 * Blocks Final Class
 */
final class MIGB_BLOCKS_CLASS
{
  public function __construct()
  {
    // define constants
    $this->migb_define_constants();

    // load textdomain
    add_action("plugins_loaded", [$this, "migb_load_textdomain"]);

    // block initialization
    add_action("init", [$this, "migb_blocks_init"]);

    // enqueue block assets
    add_action("enqueue_block_assets", [$this, "migb_external_libraries"]);

    // admin page
    add_action("activated_plugin", [$this, "migb_user_redirecting"]);
  }

  /**
   * Initialize the plugin
   */
  public static function init()
  {
    static $instance = false;
    if (!$instance) {
      $instance = new self();
    }
    return $instance;
  }

  /**
   * Textdomain Loader
   */
  public function migb_load_textdomain()
  {
    load_plugin_textdomain(
      "masonry-image-gallery",
      false,
      dirname(plugin_basename(__FILE__)) . "/languages/"
    );
  }

  // Admin Page Redirecting
  public function migb_user_redirecting($plugin)
  {
    if (plugin_basename(__FILE__) === $plugin) {
      wp_redirect(admin_url("tools.php?page=migb-gallery"));
      die();
    }
  }

  /**
   * Define the plugin constants
   */
  private function migb_define_constants()
  {
    define("MIGB_VERSION", "2.2.3");
    define("MIGB_URL", plugin_dir_url(__FILE__));
    define("MIGB_LIB_URL", MIGB_URL . "lib/");
  }

  // render inline css
  public function migb_render_inline_css($handle, $css)
  {
    wp_register_style($handle, false);
    wp_enqueue_style($handle);
    wp_add_inline_style($handle, $css);
  }

  /**
   * Blocks Registration
   */
  public function migb_register_block($name, $options = [])
  {
    register_block_type(__DIR__ . "/build/blocks/" . $name, $options);
  }

  /**
   * Blocks Initialization
   */
  public function migb_blocks_init()
  {
    // register single block
    $this->migb_register_block("masonry-gallery", [
      "render_callback" => [$this, "migb_render_block"],
    ]);
  }

  // render function
  public function migb_render_block($attributes, $content)
  {
    require_once __DIR__ . "/templates/migb.php";
    $handle = "migb-" . $attributes["galleryId"];
    $this->migb_render_inline_css($handle, migb_callback($attributes));
    return $content;
  }

  /**
   * Enqueue Block Assets
   */
  public function migb_external_libraries()
  {
    // admin css
    if (is_admin()) {
      wp_enqueue_style("migb-admin-editor", MIGB_URL . "admin/css/editor.css");
    }

    if (has_block("migb/masonry-gallery")) {
      // frontend css
      wp_enqueue_style(
        "migb-magnific-css",
        MIGB_LIB_URL . "css/magnific-popup.css",
        [],
        MIGB_VERSION,
        "all"
      );
      // enqueue JS
      wp_enqueue_script(
        "migb-magnific-popup",
        MIGB_LIB_URL . "js/jquery.magnific-popup.min.js",
        ["jquery"],
        MIGB_VERSION,
        true
      );
      wp_enqueue_script(
        "migb-lib",
        MIGB_LIB_URL . "js/lightbox.js",
        ["jquery"],
        MIGB_VERSION,
        true
      );
    }
  }
}

/**
 * Kickoff
 */
MIGB_BLOCKS_CLASS::init();

/**
 * SDK Integration
 */
if (!function_exists('migb_plugin_masonry_gallery')) {
  function migb_plugin_masonry_gallery()
  {
    // Include DCI SDK.
    require_once dirname(__FILE__) . '/admin/dci/start.php';
    wp_register_style('dci-sdk-masonry_gallery', plugins_url('admin/dci/assets/css/dci.css', __FILE__), array(), '1.2.1', 'all');
    wp_enqueue_style('dci-sdk-masonry_gallery');

    dci_dynamic_init(array(
      'sdk_version'  => '1.2.0',
      'product_id'   => 8,
      'plugin_name'  => 'Image Masonry Gallery',
      'plugin_title' => 'Image Masonry Gallery',
      'api_endpoint' => 'https://dashboard.codedivo.com/wp-json/dci/v1/data-insights',
      'slug'         => 'mgb-masonry-image-gallery',
      'menu'         => array(
        'slug' => 'migb-gallery',
      ),
      'public_key'          => 'pk_4MgzKc0g2JYsIDvrTkkcezlotTvp6hyL',
      'is_premium'          => false,
      'popup_notice'        => true,
      'deactivate_feedback' => false,
      'text_domain'         => 'masonry-image-gallery',
      'plugin_msg'          => '
    Thanks for using Image Masonry Gallery! We hope you enjoy using it. Please allow us to collect non-sensitive diagnostic data and information about your experience with our plugin to improve it.
    ',
    ));
  }
  add_action('admin_init', 'migb_plugin_masonry_gallery');
}
