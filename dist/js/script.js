
window.addEventListener('DOMContentLoaded',()=>{
    //Tabs
     const tabs=document.querySelectorAll('.tabheader__item'),
     tabsContent=document.querySelectorAll('.tabcontent'),
     tabsParent=document.querySelector('.tabheader__items');

// Функция, которая  скрывает все табы с контентом и удаляем класс активного
// элемента у всех табов-названий
function hideTabContent(){
    tabsContent.forEach(item=>{
        item.classList.add('hide');
        item.classList.remove('show','fade');
    });
    
    tabs.forEach(item=>{
        item.classList.remove('tabheader__item_active');
    });

}
// Функция, которая показывает таб с контентом и добавляет класс активного
// таба с названием. по умолчанию работает на первом, переключается в 
// зависимости от аргумента
// В аргумент указываем параметр по умолчанию.
function showTabContent(i=0){
    tabsContent[i].classList.add('show','fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
}

hideTabContent();
showTabContent();

    tabsParent.addEventListener('click',(e)=>{
    const target=e.target;

    if(target && target.classList.contains('tabheader__item')){
        tabs.forEach((item, i)=>{
            if(target == item){
                hideTabContent();
                showTabContent(i);
            }
          });
        }
    });
    //Timer
    // Задаем крайнюю дату в переменной, затем вычисляем разницу 
    // между текущей датой и дедлайном  в милисекундах. 
    // далее от результата можно посчитать сколько осталось в днях, часах и тд.
    const deadline='2020-10-08';
    function getTimeRemaining(endtime){
        const t = Date.parse(endtime)-Date.parse(new Date()),
              days= Math.floor(t/ (1000*60*60*24)),
              hours= Math.floor((t / (1000*60*60)%24)),
              minutes= Math.floor((t / 1000/60)%60),
              seconds=Math.floor((t/1000)%60);
              return{
                 'total':t,
                 'days':days,
                 'hours':hours,
                 'minutes':minutes,
                 'seconds':seconds
              };
    }
    // функция добавляет0в начало, если число однозначное 
    function getZero(num){
        if(num>=0&& num<10){
            return `0${num}`;
        }else{
            return num;
        }
    }
// в функцию будем передавать класс родительского элемента тэгов,
// показывающих время  и  дедлайн
// получаем коллекцию всех элементов, указывающих время
// присваиваем переменную к каждому соответствующему айди
// указываем интервал обновления в 1 сек
// updateClock получает готовый объект со свойствами времени и записывает
// их в html динамически
    function setCloack(selector, endtime){
       const timer= document.querySelector(selector),
              days=timer.querySelector('#days'),
              hours=timer.querySelector('#hours'),
              minutes=timer.querySelector('#minutes'),
              seconds=timer.querySelector('#seconds'),
              timeInterval=setInterval(updateClock, 1000);
               
              updateClock();
              function updateClock(){
                  const t =getTimeRemaining(endtime);

                  days.innerHTML= getZero(t.days);
                  hours.innerHTML= getZero(t.hours);
                  minutes.innerHTML= getZero(t.minutes);
                  seconds.innerHTML= getZero(t.seconds);

                  if(t.total<=0){
                      clearInterval(timeInterval);
                  }
              }
    }
    setCloack('.timer', deadline);
    
    // Modal

    // по клику на кнопку "связаться с нами" вызываем модальное окно с 
    // формой. Получаем объекты, связанные с кнопками и модальным окном
    // добавляет обработку события- клика. Метод toggle проверяет наличия 
    // класса show. если его нет - добавляет, если есть - уберает
    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal=document.querySelector('.modal'),
          modalCloseBtn=document.querySelector('[data-close]');

    modalTrigger.forEach(btn=>{
        btn.addEventListener('click',()=>{
            // modal.classList.add('show');
            // modal.classList.remove('hide');
            modal.classList.toggle('show');
            // к body подключаем стиль, который не позволяет прокручивть 
            // страницу
            document.body.style.overflow='hidden';
        });
    });
    function closeModal(){
        modal.classList.toggle('show');
        document.body.style.overflow='';
    }      
    
    // закрываем модальное окно по клику на крестик
    modalCloseBtn.addEventListener('click',closeModal);
    // закрываем страницу по нажатия на любое обасть 
    // страницы за пределами modal__dialog
    modal.addEventListener('click',(e)=>{
        if(e.target==modal){
        closeModal();
        }
    });
// добавляем обработку на нажатие клавиш. Свойство code возвращает
// строку с названием клавиши
document.addEventListener('keydown',(e)=>{
    if(e.code=='Escape' && modal.classList.contains('show')){
        closeModal();
    }
});


});

