<?php

function kino_admin_settings($form, &$form_state) {
    //
    $city = [
        '1'=>'Москва',
        '2'=>'Санкт-Петербург',
        '5061'=>'Абакан',
        '6967'=>'Абдулино',
        '490'=>'Калининград',
    ];
    //
    $form['afisha_city'] = array(
        '#type' => 'select',
        '#title' => t('Default page parsing'),
        '#options' => $city,
        '#default_value' => variable_get('afisha_city', "1"),
        '#description' => t('Parsing for example https://www.kinopoisk.ru/afisha/city/1/'),
    );

    return system_settings_form($form);
}