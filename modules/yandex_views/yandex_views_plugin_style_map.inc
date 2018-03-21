	<?php

	class yandex_views_plugin_style_map extends views_plugin_style {
	  /**
	   * Set default options
	   */
	  function option_definition() {
	    $options = parent::option_definition();

	    $options['map_width'] = array('default' => '100%');
	    $options['map_height'] = array('default' => '400px');
	    $options['map_center'] = array('default' => '0,0');
	    $options['map_zoom'] = array('default' => '4');
	    // http://api.yandex.ru/maps/doc/jsapi/beta/ref/reference/option.presetStorage.xml
	    $options['map_clusterer'] = array('default' => 'islands#invertedBlueClusterIcons');

	    ///$options['map_type'] = array('default' => 'ROADMAP');
	    $options['marker_icon_field'] = array('default' => '');
	    $options['marker_color_field'] = array('default' => '');
	    $options['marker_link_field'] = array('default' => '');

        //-- balloonContentHeader && balloonContent
	    $options['map_title'] = array('default' => '');
	    $options['map_description'] = array('default' => array());

	    return $options;
	  }

	  /**
	   * Options form.
	   */
	  function options_form(&$form, &$form_state) {
	    $settings = $this->options;
	    parent::options_form($form, $form_state);

	    $field_options = array('' => t('< none >'));
	    $fields = $this->display->handler->get_handlers('field');
	    foreach ($fields as $id => $handler) {
	      $field_options[$id] = $handler->ui_name(FALSE);
	    }

	    $form['map_width'] = array(
	      '#title' => t('Map width'),
	      '#type' => 'textfield',
	      '#default_value' => $this->options['map_width'],
	      '#size' => 5,
	    );

	    $form['map_height'] = array(
	      '#title' => t('Map height'),
	      '#type' => 'textfield',
	      '#default_value' => $this->options['map_height'],
	      '#size' => 5,
	    );

	    $form['map_center'] = array(
	      '#title' => t('Map center'),
	      '#type' => 'textfield',
	      '#default_value' => $this->options['map_center'],
	      '#size' => 40,
	    );

	    $form['map_zoom'] = array(
	      '#title' => t('Map zoom'),
	      '#type' => 'select',
	      '#options' => drupal_map_assoc(array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14)),
	      '#default_value' => $this->options['map_zoom'],
	    );

        // -- clusterer
	    $form['map_clusterer'] = array(
	      '#title' => t('Map clusterer'),
	      '#type' => 'textfield',
	      '#default_value' => $this->options['map_clusterer'],
	      '#size' => 40,
	      '#description' => t('<a href="http://api.yandex.ru/maps/doc/jsapi/beta/ref/reference/option.presetStorage.xml" target="_blank">http://api.yandex.ru/maps/doc/jsapi/beta/ref/reference/option.presetStorage.xml</a>'),
	    );



	    $form['marker_icon_field'] = array(
	      '#title' => t('Marker icon field'),
	      '#type' => 'select',
	      '#options' => $field_options,
	      '#default_value' => $this->options['marker_icon_field'],
	      '#description' => "islands#dotIcon",
	    );
        //--
	    $form['marker_color_field'] = array(
	      '#title' => t('Marker color field'),
	      '#type' => 'select',
	      '#options' => $field_options,
	      '#default_value' => $this->options['marker_color_field'],
	      '#description' => "#1faee9",
	    );

	    $form['marker_url_field'] = array(
	      '#title' => t('Marker url field'),
	      '#type' => 'select',
	      '#options' => $field_options,
	      '#default_value' => $this->options['marker_url_field'],
	    );

	    // Popup settings
	    $form['map_title'] = array(
	      '#title' => t('Popup title'),
	      '#description' => t('Data from selected field will be used as popup title.'),
	      '#type' => 'select',
	      '#options' => $field_options,
	     /// '#options' => array(
	     //   '' => t('- hide -')
	     // ) + $fields['all'],
	      '#default_value' => $this->options['map_title'],
	    );

	    $form['map_description'] = array(
	      '#title' => t('Popup content'),
	      '#description' => t('Data from selected fields will be used as popup description.'),
	      '#type' => 'checkboxes',
	      '#options' => $field_options,
	      '#default_value' => $this->options['map_description'],
	    );


	  }

	  /**
	   * Render the display in this style.
	   */
	  function render() {
	    if (isset($this->view->live_preview) && $this->view->live_preview) {
	      return t('Yandex Views are not compatible with live preview.');
	    }

	    $yandex_field = '';
	    foreach ($this->view->field as $field_name => $field_handler) {
	      if (isset($field_handler->field_info) && $field_handler->field_info['type'] == 'yandex_map_latlng') {
	        $yandex_field = 'field_' . $field_name;
	        break;
	      }
	    }
	    if (!$yandex_field) {
	      return t('Add Yandex field to fields list.');
	    }

	    $markers = array();
	    foreach ($this->view->result as $index => $row) {
	      if (!$row->{$yandex_field}) {
	        continue;
	      }

	      $marker_icon = '';
	      if ($this->options['marker_icon_field']) {
	        $marker_icon = $this->get_field($index, $this->options['marker_icon_field']);
	      }
          //--
	      $marker_color = '';
	      if ($this->options['marker_color_field']) {
	        $marker_color = $this->get_field($index, $this->options['marker_color_field']);
	      }

	      $marker_url = '';
	      if ($this->options['marker_url_field']) {
	        $marker_url = $this->get_field($index, $this->options['marker_url_field']);
	      }

	      $marker_title = '';
	      if ($this->options['map_title']) {
	        $marker_title = $this->get_field($index, $this->options['map_title']);
	      }


          $description = array();
          ///echo "<pre>"; print_r($this->options['map_description']); echo "</pre>";
           foreach ($this->options['map_description'] as $field => $enabled) {
	        if ($enabled) {
	          $description[] = $this->get_field($index, $field);
	        }
	      }

          // TODO create custom separator
	      $description = !empty($description)
	        ? implode('<br />', $description)
	        : FALSE;


	      foreach ($row->{$yandex_field} as $field_value) {
	        $markers[] = array(
	          'lat' => (float)$field_value['raw']['lat'],
	          'lng' => (float)$field_value['raw']['lng'],
	          'icon' => $marker_icon,
	          'icolor' => $marker_color,
	          'url' => $marker_url,
	          'title' => $marker_title,
	          'description' => $description,
	        );
	      }

	    }

	    $map_center = explode(',', $this->options['map_center']);

	    //drupal_add_js('http://maps.google.com/maps/api/js?sensor=false', array('type' => 'external'));
	    //drupal_add_js(drupal_get_path('module', 'yandex_views') . '/yandex_views.js');
	    //http://api-maps.yandex.ru/2.0/?load=package.full&lang=ru-RU
	    drupal_add_js('http://api-maps.yandex.ru/2.1-dev/?lang=ru-RU&load=package.full', array('type' => 'external'));
	    drupal_add_js(drupal_get_path('module', 'yandex_views') . '/yandex.js');

		    drupal_add_js(array(
		      'yandexViews' => array(
			        'markers' => $markers,
			        'mapCenter' => array(
			          (float)$map_center[0],
			          (float)$map_center[1],
			       ),
		       'mapZoom' => (int)$this->options['map_zoom'],
		       'mapClusterer' => $this->options['map_clusterer'],
		      ),
		    ), 'setting');

	    return theme($this->theme_functions(), array(
	      'view' => $this->view,
	      'options' => $this->options,
	    ));

	  }
	}
