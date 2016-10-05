<?php
/*
Plugin Name: BK Slider
Plugin URI: http://bravokeyl.com/
Description: Simple responsive slider
Version: 5.0.2
Author: bravokeyl
Author URI: http://bravokeyl.com/
License: GPLv2 or later
Text Domain: bk-slider
*/

if ( !function_exists( 'add_action' ) ) {
	exit;
}

define( 'BKSLIDER_VERSION', '5.0.2' );
define( 'BKSLIDER_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

if ( ! function_exists('bk_slider_register_post_type') ) {
  function bk_slider_register_post_type() {
  	$labels = array(
  		'name'                  => _x( 'BK Slider', 'Post Type General Name', 'bk-slider' ),
  		'singular_name'         => _x( 'BK Slider', 'Post Type Singular Name', 'bk-slider' ),
  		'menu_name'             => __( 'Slider', 'bk-slider' ),
  		'name_admin_bar'        => __( 'Slider', 'bk-slider' ),
  		'archives'              => __( 'Slide Archives', 'bk-slider' ),
  		'parent_item_colon'     => __( 'Parent Slide:', 'bk-slider' ),
  		'all_items'             => __( 'All Slides', 'bk-slider' ),
  		'add_new_item'          => __( 'Add New Slide', 'bk-slider' ),
  		'add_new'               => __( 'Add New', 'bk-slider' ),
  		'new_item'              => __( 'New Slide', 'bk-slider' ),
  		'edit_item'             => __( 'Edit Slide', 'bk-slider' ),
  		'update_item'           => __( 'Update Slide', 'bk-slider' ),
  		'view_item'             => __( 'View Slide', 'bk-slider' ),
  		'search_items'          => __( 'Search Slide', 'bk-slider' ),
  		'not_found'             => __( 'Not found', 'bk-slider' ),
  		'not_found_in_trash'    => __( 'Not found in Trash', 'bk-slider' ),
  		'featured_image'        => __( 'Featured Image', 'bk-slider' ),
  		'set_featured_image'    => __( 'Set featured image', 'bk-slider' ),
  		'remove_featured_image' => __( 'Remove featured image', 'bk-slider' ),
  		'use_featured_image'    => __( 'Use as featured image', 'bk-slider' ),
  		'insert_into_item'      => __( 'Insert into slide', 'bk-slider' ),
  		'uploaded_to_this_item' => __( 'Uploaded to this slide', 'bk-slider' ),
  		'items_list'            => __( 'Slides list', 'bk-slider' ),
  		'items_list_navigation' => __( 'Slides list navigation', 'bk-slider' ),
  		'filter_items_list'     => __( 'Filter slides list', 'bk-slider' ),
  	);
  	$args = array(
  		'label'                 => __( 'BK Slider', 'bk-slider' ),
  		'description'           => __( 'Simple responsive slider', 'bk-slider' ),
  		'labels'                => $labels,
  		'supports'              => array( 'title', 'excerpt', 'thumbnail', ),
  		'hierarchical'          => false,
  		'public'                => true,
  		'show_ui'               => true,
  		'show_in_menu'          => true,
  		'menu_position'         => 25,
  		'menu_icon'             => 'dashicons-format-gallery',
  		'show_in_admin_bar'     => true,
  		'show_in_nav_menus'     => false,
  		'can_export'            => true,
  		'has_archive'           => false,
  		'exclude_from_search'   => false,
  		'publicly_queryable'    => true,
  		'capability_type'       => 'page',
  	);
  	register_post_type( 'bk_slider', $args );
  }
  add_action( 'init', 'bk_slider_register_post_type', 0 );
}

function bk_slider_shortcode( $atts ) {
	$atts = shortcode_atts( array('n' => '4'), $atts, 'bk_slider' );
  $n = intval($atts['n']);
  $output  = '<ul id="sm" class="sm">';
  $output .= bk_slider_get_slides($n);
  $output .= '</ul>';
  return $output;
}
add_shortcode( 'bk_slider', 'bk_slider_shortcode' );

add_action('wp_enqueue_scripts','bk_slider_enqueue_scripts');

function bk_slider_enqueue_scripts() {

  $purl = esc_url(plugins_url('/js/bk-slider.js',__FILE__));
  $style = esc_url(plugins_url('/css/bk-slider.css',__FILE__));

  if(is_front_page()) {
    wp_enqueue_script('bk-slider',$purl,array('jquery'),'5.0.2');
    wp_enqueue_style('bk-slider',$style,array(),'5.0.2');
  }
}

function bk_slider_cpt($n) {
  $output = '';
  $args = array(
    "post_type" => "bk_slider",
    "posts_per_page" => $n
  );
  $q = new WP_Query($args);
  while($q->have_posts()){
    $q->the_post();
    $link  = '';
    $link .= '<a href="'.esc_url(get_permalink()).'">';
    $link .= '<div class="banner_title">'.esc_attr(get_the_title()).'</div>';
    $link .= '</a>';
    $slide_image = get_the_post_thumbnail();
    $output .= '<li>'.$link.$slide_image.'</li>';
  }
  return $output;
}
function bk_slider_get_slides($n) {
  $slides = bk_slider_cpt($n);
  return $slides;
}
