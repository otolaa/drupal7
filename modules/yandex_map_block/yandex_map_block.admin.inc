<?php

function yandex_block_admin_settings($form, &$form_state) {
    //
    $form['ymb_height'] = array(
        '#type' => 'textfield',
        '#title' => t('Yandex map height'),
        '#size' => 30,
        '#maxlength' => 500,
        '#default_value' => variable_get('ymb_height', "300"),
        '#description' => t('height from maps 300px'),
    );

    $form['ymb_center'] = array(
        '#type' => 'textfield',
        '#title' => t('Center maps'),
        '#size' => 30,
        '#maxlength' => 500,
        '#default_value' => variable_get('ymb_center', "55.7537,37.6199"),
        '#description' => t('Moscow - 55.7537,37.6199 (latitude,longitude)'),
    );

    $form['ymb_zoom'] = array(
        '#type' => 'textfield',
        '#title' => t('Map scale'),
        '#size' => 30,
        '#maxlength' => 500,
        '#default_value' => variable_get('ymb_zoom', "11"),
    );

    $form['ymb_preset'] = array(
        '#type' => 'textfield',
        '#title' => t('Preset'),
        '#size' => 30,
        '#maxlength' => 500,
        '#default_value' => variable_get('ymb_preset', "islands#dotIcon"),
        '#description' => t('<a href="http://api.yandex.ru/maps/doc/jsapi/beta/ref/reference/option.presetStorage.xml" target="_blank">http://api.yandex.ru/maps/doc/jsapi/beta/ref/reference/option.presetStorage.xml</a>'),
    );

    $form['ymb_iconcolor'] = array(
        '#type' => 'textfield',
        '#title' => t('iconColor'),
        '#size' => 30,
        '#maxlength' => 500,
        '#default_value' => variable_get('ymb_iconcolor', "#1faee9"),
        '#description' => t('#1faee9'),
    );

    $form['balloonContent'] = array(
        '#type' => 'textfield',
        '#title' => t('Balloon Content'),
        '#size' => 30,
        '#maxlength' => 500,
        '#default_value' => variable_get('balloonContent', ""),
        '#description' => t('My company description'),
    );

    $form['address'] = array(
        '#type' => 'item',
        '#title' => t('Yandex setting'),
        '#prefix' => '<div id="yandex-map-address-0" class="yandex-map-address">',
        '#suffix' => '</div>',
        '#markup' => '<div id="YMapsID"></div>',
        //'#required' => $instance['required'],
    );

    $form['#attached']['js'][] = array(
        'data' => 'https://api-maps.yandex.ru/2.1/?lang=ru_RU',
        'type' => 'external',
        'weight'=>6,
    );

    $form['#attached']['js'][] = array(
        'data' => drupal_get_path('module', 'yandex_map_block') . '/js/yandex_map_block_admin.js',
        'type' => 'file',
        'weight'=>7,
    );

    //
    $ymb['ymb'] = [
        'height'=>$form['ymb_height']['#default_value'],
        'center'=>$form['ymb_center']['#default_value'],
        'preset'=>$form['ymb_preset']['#default_value'],
        'iconcolor'=>$form['ymb_iconcolor']['#default_value'],
        'zoom'=>$form['ymb_zoom']['#default_value'],
        'id'=>"YMapsID",
        ];
    $form['#attached']['js'][] = [
        'data' => $ymb,
        'type' => 'setting',
    ];

    return system_settings_form($form);
}