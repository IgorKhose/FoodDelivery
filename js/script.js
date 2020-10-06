
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
          modal=document.querySelector('.modal');

          modalTrigger.forEach(btn=>{
            btn.addEventListener('click',openModal); 
        });

          function openModal(){
            //modal.classList.toggle('hide');
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow='hidden';
            clearInterval(modalTimerId);
        }
    
        function closeModal(){
            modal.classList.add('hide');
            modal.classList.remove('show');
            //modal.classList.toggle('show');
            document.body.style.overflow='';
        }  
    // закрываем страницу по нажатию на любую область 
    // страницы за пределами modal__dialog
    modal.addEventListener('click',(e)=>{
        if(e.target==modal|| e.target.getAttribute('data-close')==''){
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
    constructor(src, alt, title, descr, price, parentSelector,...classes){
        this.src=src;
        this.alt=alt;
        this.title=title;
        this.descr=descr;
        this.price=price;
        this.classes=classes;
        this.parent=document.querySelector(parentSelector);
        this.transfer=80;
        this.changeToRU();
    }
    changeToRU(){
        this.price*=this.transfer;
    }
    render(){
        const element=document.createElement('div');
        if(this.classes.length===0){
            this.element='menu__item';
            element.classList.add(this.element);
        } else{
            this.classes.forEach(className=>element.classList.add(className));
        }
       element.innerHTML=`
       
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
                
       `;
       this.parent.append(element);
    }
}
const getResource = async (url)=>{
    const res = await fetch(url);
    if(!res.ok){
       throw new Error(`Could not fetch${url}, status: ${res.status}`);
    }

    return await res.json();
};
// Добавляем работу с библиотекой axios
axios.get('http://localhost:3000/menu')
.then(data=>{
    data.data.forEach(({img,altimg,title,descr,price})=>{
        new MenuCard(img,altimg,title,descr,price, '.menu .container').render();
    });
});

const forms=document.querySelectorAll('form');
const message={
    loading:'img/form/spinner.svg',
    success:'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так ...'

};
forms.forEach(item =>{
    bindPostData(item);
});
const postData = async (url,data)=>{
    const res = await fetch(url,{
        method:'POST',
        headers:{
         'Content-type':'application/json'
        },
        body:data
    });
    return await res.json();
};

      function bindPostData(form){
        form.addEventListener('submit',(e)=>{
          e.preventDefault();
          const statusMessage=document.createElement('img');
          statusMessage.src=message.loading;
          statusMessage.style.cssText=`
          display: block;
          margin: 0 auto;
          `;
          
          form.insertAdjacentElement('afterend',statusMessage);

            const formData = new FormData(form);

            const json=JSON.stringify(Object.fromEntries(formData.entries())); 

                postData('http://localhost:3000/requests',json)
                .then(data=>{
                    console.log(data);
                    showThanksModal(message.success);  
                    statusMessage.remove();
                    
            
                }).catch(()=>{
                    showThanksModal(message.failure);
                }).finally(()=>{
                    form.reset();
                });

        });
    }

      function showThanksModal(message){
          const privModalDial=document.querySelector('.modal__dialog');

          privModalDial.classList.add('hide');
          openModal();

          const thanksModal=document.createElement('div');
          thanksModal.classList.add('modal__dialog');
          thanksModal.innerHTML=`
            <div class="modal__content">
              <div class="modal__close" data-close>×</div>
              <div class="modal__title">${message}</div>
            </div>
          `;

          document.querySelector('.modal').append(thanksModal);
          setTimeout(()=>{
              thanksModal.remove();
              privModalDial.classList.add('show');
              privModalDial.classList.remove('hide');
              closeModal();
          },4000);
      }

    //Slide
    const sliderNext=document.querySelector('.offer__slider-next');
    const sliderPrev=document.querySelector('.offer__slider-prev');

    const changeSlide=document.querySelectorAll('.offer__slide');
    const slideArr=Object.entries(changeSlide);
    let counter =0;

    // for(let i=0;i<slideArr.length;i++){
    //         if(counter==slideArr[i]){
    //             slideArr[i].classList.add('show');
    //         } else{
    //             slideArr[i].classList.add('hide');
    //         }
    //     }
    console.log(slideArr);
    
});


