<?php
/**
 * Hide core Category taxonomy from WPGraphQL schema
 */
add_filter('register_taxonomy_args', function ($args, $taxonomy) {
  if ($taxonomy === 'category') {
    $args['show_in_graphql'] = false;
  }
  return $args;
}, 10, 2);