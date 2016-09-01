(function ($) {

    'use strict';

    // Слайдер главной страницы

    var $mainSlider = $('.main-slider');

    $mainSlider.owlCarousel({
        items: 1,
        nav: true,
        navText: ['', ''],
        loop: true,
        autoplay: true
    });

    // Слайдер сертификатов

    var $sertificatesBlock = $('.sertificates-block');

    $sertificatesBlock.owlCarousel({
        items: 1,
        nav: true,
        navText: ['', ''],
        loop: true,
        mouseDrag: false
    });

    // Fancybox

    $('.fancybox').fancybox();

    // Всплывающее окно при клике - добавить товар в корзину (купить)

    var $shopPageButton = $('.shop-page-button'),
        $shopPagePopupWrap = $('.shop-page-popup-wrap'),
        $shopPagePopup = $('.shop-page-popup'),
        $shopPageFade = $('.shop-page-fade'),
        $shopPageGoon = $('.button-goon'),
        shopPageTimeout = 700;

    $shopPageButton.on('click', function () {
        $shopPagePopupWrap.addClass('is-flex');
        $shopPagePopup.add($shopPageFade).addClass('is-visible form-fade-in');
    });

    $shopPageGoon.add($shopPageFade).on('click', function () {
        $shopPagePopup.add($shopPageFade).removeClass('form-fade-in').addClass('form-fade-out');
        setTimeout(function () {
            $shopPagePopupWrap.removeClass('is-flex');
        }, shopPageTimeout);
    });


    // Адативная всплывающая форма

    var $activateButton = $('.subscribe-button'),
        $formPopup = $('.form-popup'),
        $formFade = $('.form-fade'),
        $formClose = $('.form-popup-close'),
        $formWrap = $('.form-popup-wrap'),
        thisPlaceholder,
        fadeTimeout = 300;

    var activatePopupForm = function (activateButton, formPopup, formFade, formWrap) {
        activateButton.on('click', function () {
            formPopup.add(formFade).addClass('is-visible form-fade-in');
            formWrap.addClass('is-flex');
            setTimeout(function () {
                formPopup.add(formFade).removeClass('form-fade-in');
            }, fadeTimeout);
        });

        formFade.add($formClose).on('click', function () {
            formPopup.add(formFade).addClass('form-fade-out');

            setTimeout(function () {
                formPopup.add(formFade).removeClass('is-visible form-fade-out');
                formWrap.removeClass('is-flex');
            }, fadeTimeout);
        });
    };

    activatePopupForm($activateButton, $formPopup, $formFade, $formWrap);

    // Сменяющиеся плейсхолдеры для формы

    $formPopup.find('input').add($formPopup.add('textarea'))
        .focus(function () {
            thisPlaceholder = $(this).attr('placeholder');
            $(this).data('placeholder', thisPlaceholder);
            $(this).attr('placeholder', '');
        })
        .blur(function () {
            thisPlaceholder = $(this).data('placeholder');
            $(this).attr('placeholder', thisPlaceholder);
        });

    // Скрываем всплывающее описание для товара если оно пустое

    $('.product-description-popup').each(function () {
        if ($(this).find('> *').size() === 0) {
            $(this).addClass('is-hidden');
        }
    });

    // Скрываем крошки если в них один элемент

    var $breadCrumbs = $('ul.breadcrumb');

    if ($breadCrumbs.find('li').size() <= 1) {
        $breadCrumbs.addClass('is-hidden');
    }

    // Скрытие появления блока активные и прошедшие

    var $titleActive = $('.title-active'),
        $titleLost = $('.title-lost'),
        $activeItems = $('.active-wrap'),
        $lostItems = $('.lost-wrap');

    $titleActive.on('click', function () {
        $titleLost.removeClass('active');
        $(this).addClass('active');
        $lostItems.addClass('is-hidden');
        $activeItems.removeClass('is-hidden');
    });

    $titleLost.on('click', function () {
        $titleActive.removeClass('active');
        $(this).addClass('active');
        $activeItems.addClass('is-hidden');
        $lostItems.removeClass('is-hidden');
    });

    // Выводим сообщение если активная вкладка пустая

    if ($activeItems.find('.active-items > *').size() === 0) {
        $activeItems.find('.active-items').text('В данный момент нет активных мероприятий. Ожидайте в ближайшее время.');
    }

    // Поднимаем красную надпись выше специального вывода

    var $importantText = $('big');

    $importantText.insertBefore('.text-content-block');

    // Скрываем сертификаты если они пустые

    var sertificateSize = $sertificatesBlock.find('> div').size();

    if (sertificateSize < 2) {
        $('.courses-headblock .right').addClass('is-hidden');
    }

})(jQuery);