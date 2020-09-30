
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

          function openModal(){
            modal.classList.toggle('show');
            document.body.style.overflow='hidden';
            clearInterval(modalTimerId);
        }
    
        function closeModal(){
            modal.classList.toggle('show');
            document.body.style.overflow='';
        }  

    modalTrigger.forEach(btn=>{
        btn.addEventListener('click',openModal); 
    });
            // modal.classList.add('show');
            // modal.classList.remove('hide');
    
    // закрываем модальное окно по клику на крестик
    modalCloseBtn.addEventListener('click',closeModal);

    // закрываем страницу по нажатию на любую область 
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
const modalTimerId = setTimeout(openModal, 60000);
// добавляем запуск модуля, когда пользователь долистает до конца страницы
function showModalByScroll(){
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
        openModal();
        window.removeEventListener('scroll',showModalByScroll);
    }
}

window.addEventListener('scroll',showModalByScroll );

// Используем классы для карточек
class MenuCard{
    constructor(src, alt, title, descr, price, parentSelector){
        this.src=src;
        this.alt=alt;
        this.title=title;
        this.descr=descr;
        this.price=price;
        this.parent=document.querySelector(parentSelector);
        this.transfer=80;
        this.changeToRU();
    }
    changeToRU(){
        this.price*=this.transfer;
    }
    render(){
       const element=document.createElement('div');
       element.innerHTML=`
       <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
                </div>
       `;
       this.parent.append(element);
    }
}
new MenuCard(
"img/tabs/vegy.jpg","vegy",
"Меню 'Фитнес'",
'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.'+
' Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
7,'.menu .container'
).render();
new MenuCard(
"img/tabs/elite.jpg","elite",
'Меню “Премиум”',
'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение'+
' блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
12,'.menu .container'
).render();
new MenuCard(
"img/tabs/post.jpg","post",
'Меню "Постное"',
'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного'+
' происхождения, молоко из миндаля, овса, кокоса или гречки,'+
' правильное количество белков за счет тофу и импортных вегетарианских стейков.',
8,'.menu .container'
).render();


// new MenuCard(
// "img/tabs/newmenu.jpg","theMenu",
// "Меню 'Полезное'",
// 'Новое, полезное меню разработано лучшими поварами, с учетом необходимой '+
//  'нормы витаминов на весь день, а вкуснейшей рыбкой вам точно не захочется делиться по честному',
//  10,'.menu .container'
// ).render();



// Альтернативный вариант
// class Menu { 
//   constructor(img, subtitle, descr, price,){
//        this.img=img;
//        this.subtitle=subtitle;
//        this.descr=descr;
//        this.price=price;
//   }
//     addMetoTheWebPage(){
//         const newMenuDiv=document.createElement('div');
//         newMenuDiv.classList.add('menu__item');
//         newMenuDiv.innerHTML=`<img src="${this.img}" alt="vegy">
//         <h3 class="menu__item-subtitle">${this.subtitle}</h3>
//         <div class="menu__item-descr">${this.descr}</div>
//         <div class="menu__item-divider"></div>
//         <div class="menu__item-price">
//             <div class="menu__item-cost">Цена:</div>
//             <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
//         </div>`;
//         document.querySelector('.menu__field').querySelector('.container').append(newMenuDiv);
//     }
// }
// const theNewMenu=new Menu('img/tabs/newmenu.jpg', 'Меню Полезное',
// 'Новое, полезное меню разработано лучшими поварами, с учетом необходимой нормы витаминов'+
//' на весь день, а вкуснейшей рыбкой вам точно не захочется делиться по честному','700');
// theNewMenu.addMetoTheWebPage();





});

