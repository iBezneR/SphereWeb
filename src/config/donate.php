<?php

/**
 *
 * Это курс валюты
 * Соотношение 1 Донат Бонус к разной валюте.
 *
 * Если человек закинул 300 рублей, он получит 3,95
 *
 * Если не понимаете тонкости настроек, лучше оставить всё как есть.
 *
 */

return [

    /**
     * Минимальное количество донат бонусов, которое пользователь может купить.
     */
    'min_donate_bonus_coin' => 100,

    //Максимальное количество дб, которое пользователь может купить за раз
    'max_donate_bonus_coin' => 5000,

    //Количество донат бонусов, которые получит пользователь за сумму равную 1 доллару
    //К примеру если quantity = 10, тогда за донат в 1 доллар пользователь получит 10 Донат Бонус
    //Если quanity поставить 100, тогда пользователь получит 100 донат бонусов за донат в сумме который равен 1$
    'quantity' => 100,

    //Если не понимаете эти коэффициенты валют, то лучше не менять, оставить как есть.
    'coefficient' => [
        //Если пользователь закинет 1$ = получит 1 Донат Бонусов (если quantity = 1)
        'USD' => 1,
        //Если пользователь закидыват 42 евро = получит 26,25 ДБ
        'EUR' => 1.05,
        //Если пользователь закидыват 377 грн = получит 10,21 ДБ
        'UAH' => 38.5,
        //Если человек закинул 300 руб, он получит 3,95
        'RUB' => 85.5,
    ],


    /**
     * Система скидок / накопительная система
     *
     * Работает таким образом
     * Мы считает скидку не исходя из того, кол-во Донат Бонусов пользователь имеет,
     * а сколько всего задонатил за всё время.
     * И даем ему скидку на покупку исходя из общей суммы Донат Бонусов.
     * К примеру человек донатил и донатил и в результате у него набралось 23419 Донат Бонуса,
     * это дает ему возможность покупать из магазина по 25% скидке.
     */
    'discount' => [
        'enable' => true,
        'table' => [
            //от 500 ДБ дает 3% скидки
            500 => 3,
            1000 => 5,
            1500 => 8,
            2000 => 10,
            3000 => 13,
            5000 => 15,
            9000 => 18,
            13000 => 20,
            //от 15.000 ДБ дает 15% скидки
            15000 => 22,
            20000 => 25,
            25000 => 27,
            //Любая сумма выше 30.000 дает 30% скидки
            30000 => 30,
        ],
    ],

];

