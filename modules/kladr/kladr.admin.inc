<?php

	function kladr_admin_settings($form, &$form_state) {

      $form  = array();
		  $form['kladr_yandex_map_height'] = array(
		    '#type' => 'textfield',
		    '#title' => t('kladr yandex map height'),
		    '#size' => 100,
		    '#maxlength' => 500,
		    //'#default_value' => variable_get('yandex_map_key', '[gmap]'),
		    '#default_value' => variable_get('kladr_yandex_map_height', "300px"),
		    '#description' => t('height from maps 300px'),
		  );

		   $form['kladr_map_center'] = array(
		    '#type' => 'textfield',
		    '#title' => t('Center maps'),
		    '#size' => 30,
		    '#maxlength' => 500,
		    '#default_value' => variable_get('kladr_map_center', "37.6199,55.7537"),
		    '#description' => t('Moscow - 37.6199,55.7537 (longitude,latitude) <a href="http://api.yandex.ru/maps/tools/getlonglat/" target="_blank">http://api.yandex.ru/maps/tools/getlonglat/</a>'),
		  );

		  $form['kladr_map_preset'] = array(
		    '#type' => 'textfield',
		    '#title' => t('Preset'),
		    '#size' => 30,
		    '#maxlength' => 500,
		    '#default_value' => variable_get('kladr_map_preset', "islands#dotIcon"),
		    '#description' => t('<a href="http://api.yandex.ru/maps/doc/jsapi/beta/ref/reference/option.presetStorage.xml" target="_blank">http://api.yandex.ru/maps/doc/jsapi/beta/ref/reference/option.presetStorage.xml</a>'),
		  );

		  $form['kladr_map_iconcolor'] = array(
		    '#type' => 'textfield',
		    '#title' => t('iconColor'),
		    '#size' => 30,
		    '#maxlength' => 500,
		    '#default_value' => variable_get('kladr_map_iconcolor', "#1faee9"),
		    '#description' => t('#1faee9'),
		  );

		  // the "token key" from kladr
		  $form['kladr_token'] = array(
		    '#type' => 'textfield',
		    '#title' => t('token'),
		    '#size' => 100,
		    '#maxlength' => 500,
		    //'#default_value' => variable_get('yandex_map_key', '[gmap]'),
		    '#default_value' => variable_get('kladr_token', "51dfe5d42fb2b43e3300006e"),
		    '#description' => t('http://kladr-api.ru/'),
		  );

		   $form['kladr_key'] = array(
		    '#type' => 'textfield',
		    '#title' => t('key'),
		    '#size' => 100,
		    '#maxlength' => 500,
		    //'#default_value' => variable_get('yandex_map_key', '[gmap]'),
		    '#default_value' => variable_get('kladr_key', "86a2c2a06f1b2451a87d05512cc2c3edfdf41969"),
		    '#description' => t('http://kladr-api.ru/'),
		  );


	  return system_settings_form($form);
      //
	}