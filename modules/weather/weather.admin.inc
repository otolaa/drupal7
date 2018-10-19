<?php

function weather_admin_settings($form, &$form_state) {
    //
    $descriptionArr = [
        'moscow'=>'https://yandex.ru/pogoda/moscow/details',
        'petersburg'=>'https://yandex.ru/pogoda/saint-petersburg/details',
        'yekaterinburg'=>'https://yandex.ru/pogoda/yekaterinburg/details',
        'novosibirsk'=>'https://yandex.ru/pogoda/novosibirsk/details',
        'kaliningrad'=>'https://yandex.ru/pogoda/kaliningrad/details',
        'krasnoyarsk'=>'https://yandex.ru/pogoda/krasnoyarsk/details',
        'kazan'=>'https://yandex.ru/pogoda/kazan/details',
        'ufa'=>'https://yandex.ru/pogoda/ufa/details',
        'chelyabinsk'=>'https://yandex.ru/pogoda/chelyabinsk/details',
    ];
    $form['weather_city'] = [
            '#type' => 'textfield',
            '#title' => t('Default weather parsing'),
            '#size' => 100,
            '#maxlength' => 500,
            '#default_value' => variable_get('weather_city', "https://yandex.ru/pogoda/moscow/details"),
            '#description' => implode("<br>",$descriptionArr),
        ];
    return system_settings_form($form);
}