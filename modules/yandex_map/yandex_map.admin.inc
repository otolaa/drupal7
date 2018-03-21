<?php

	function yandex_map_admin_settings($form, &$form_state) {

      $form  = array();
	      $form['yandex_map_height'] = array(
		    '#type' => 'textfield',
		    '#title' => t('Yandex map height'),
		    '#size' => 30,
		    '#maxlength' => 500,
		    '#default_value' => variable_get('yandex_map_height', "300px"),
		    '#description' => t('height from maps 300px'),
		  );

		  $form['yandex_map_center'] = array(
		    '#type' => 'textfield',
		    '#title' => t('Center maps'),
		    '#size' => 30,
		    '#maxlength' => 500,
		    '#default_value' => variable_get('yandex_map_center', "37.6199,55.7537"),
		    '#description' => t('Moscow - 37.6199,55.7537 (longitude,latitude) <a href="http://api.yandex.ru/maps/tools/getlonglat/" target="_blank">http://api.yandex.ru/maps/tools/getlonglat/</a>'),
		  );

		  $form['yandex_map_preset'] = array(
		    '#type' => 'textfield',
		    '#title' => t('Preset'),
		    '#size' => 30,
		    '#maxlength' => 500,
		    '#default_value' => variable_get('yandex_map_preset', "islands#dotIcon"),
		    '#description' => t('<a href="http://api.yandex.ru/maps/doc/jsapi/beta/ref/reference/option.presetStorage.xml" target="_blank">http://api.yandex.ru/maps/doc/jsapi/beta/ref/reference/option.presetStorage.xml</a>'),
		  );

		  $form['yandex_map_iconcolor'] = array(
		    '#type' => 'textfield',
		    '#title' => t('iconColor'),
		    '#size' => 30,
		    '#maxlength' => 500,
		    '#default_value' => variable_get('yandex_map_iconcolor', "#1faee9"),
		    '#description' => t('#1faee9'),
		  );


	  return system_settings_form($form);
      //
	}