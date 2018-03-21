<?php

/**
 * Implementation of hook_views_plugins().
 */
function yandex_views_views_plugins() {
  return array(
    'module' => 'yandex_views',
    'style' => array(
      'yandex_map' => array(
        'title' => t('Yandex Map'),
        'handler' => 'yandex_views_plugin_style_map',
        'theme' => 'yandex_views_map',
        'type' => 'normal',
        'uses row plugin' => FALSE,
        'uses fields' => TRUE,
        'uses options' => TRUE,
        'uses grouping' => FALSE,
        'even empty' => TRUE,
      ),
    ),
  );
}

