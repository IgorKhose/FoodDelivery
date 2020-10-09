
window.addEventListener('DOMContentLoaded',()=>{
    // объединяем все файлы в главный, импортим модули
  const tabs=require('./modules/tabs'),
        modal=require('./modules/modal'),
        calc=require('./modules/calc'),
        cards=require('./modules/cards'),
        forms=require('./modules/forms'),
        timer=require('./modules/timer'),
        slider=require('./modules/slider');
    
    tabs();
    modal();
    calc();
    cards();
    forms();
    timer();
    slider();
    



      
    
});


