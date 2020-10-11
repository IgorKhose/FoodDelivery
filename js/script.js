require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';
    
    import    tabs from './modules/tabs';
    import    modal from './modules/modal';
    import    calc from './modules/calc';
    import    cards from './modules/cards';
    import    forms from './modules/forms';
    import    timer from './modules/timer';
    import    slider from './modules/slider';
    import    {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded',()=>{   
    const modalTimerId = setTimeout(()=>openModal('.modal', modalTimerId), 60000);

    tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    modal('[data-modal]','.modal');
    calc();
    cards();
    forms('form',modalTimerId);
    timer('.timer','2020-10-28');
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper:'.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    



      
    
});


