/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calc(){
// Calc

const result=document.querySelector('.calculating__result span'); 
let sex,height, weight, age, ratio;

if(localStorage.getItem('sex')){
    sex =localStorage.getItem('sex'); 
}else{
    sex='female';
    localStorage.setItem('sex','female');
}

if(localStorage.getItem('ratio')){
    ratio =localStorage.getItem('ratio') ;
}else{
    ratio=1.375;
    localStorage.setItem('ratio', 1.375);
}

function initLocalSettings(selector, activeClass){
    const elements=document.querySelectorAll(selector);

    elements.forEach(elem=>{
        elem.classList.remove(activeClass);
        if(elem.getAttribute('id')===localStorage.getItem('sex')){
            elem.classList.add(activeClass);
        }
        if(elem.getAttribute('data-ratio')===localStorage.getItem('ratio')){
            elem.classList.add(activeClass);
        }
    });
}
initLocalSettings('#gender div','calculating__choose-item_active');
initLocalSettings('.calculating__choose_big div','calculating__choose-item_active');

function calcTotal(){
    if(!sex||!height||!age||!weight||!ratio){
        result.textContent='???';
        return;
    }
    if(sex==='female'){
        result.textContent=Math.round((447.6 + (9.2 * weight) + (3.1 *height) - (4.3 *age))*ratio);
    }else{
        result.textContent=Math.round((88.36 + (13.4 *weight) + (4.8 *height) - (5.7 *age))*ratio);
    }
}
calcTotal();

function getStaticInformation(selector, activeClass){
    const elements=document.querySelectorAll(selector);

    elements.forEach(elem=>{
        elem.addEventListener('click',(e)=>{
            if(e.target.getAttribute('data-ratio')){
                ratio=e.target.getAttribute('data-ratio');
                localStorage.setItem('ratio',+e.target.getAttribute('data-ratio'));
            }else{
                sex=e.target.getAttribute('id');
                localStorage.setItem('sex',e.target.getAttribute('id'));
            }
            elements.forEach(elem=>{
                elem.classList.remove(activeClass);
            });
            e.target.classList.add(activeClass);
            calcTotal();
        });
    });

}
getStaticInformation('#gender div','calculating__choose-item_active');
getStaticInformation('.calculating__choose_big div','calculating__choose-item_active');

function getDynamicnformation(selector){
    const input =document.querySelector(selector);

    input.addEventListener('input',()=>{
        if(input.value.match(/\D/g)){
            input.style.border='1px solid red';
        }else{
            input.style.border='none';
        }


        switch(input.getAttribute('id')){
            case 'height':
                height=+input.value;
                break;
            case 'weight':
                weight=+input.value;
                break;
            case 'age':
                age=+input.value;
                break;
        }
        calcTotal();
    });
    
}
getDynamicnformation('#height');
getDynamicnformation('#weight');
getDynamicnformation('#age');
}
module.exports=calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function cards(){
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
}
module.exports=cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function forms(){
// Forms
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
}
module.exports=forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modal(){
// ModalJS

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
}
module.exports=modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider(){
//Slider 
const slides=document.querySelectorAll('.offer__slide'),
slider=document.querySelector('.offer__slider'),
prev=document.querySelector('.offer__slider-prev'),
next=document.querySelector('.offer__slider-next'),
total=document.querySelector('#total'),
current=document.querySelector('#current'),
slidesWrapper=document.querySelector('.offer__slider-wrapper'),
slidesField=document.querySelector('.offer__slider-inner'),
width=window.getComputedStyle(slidesWrapper).width;

let slideIndex=1,
    offset=0;

if(slides.length<10){
    total.textContent=`0${slides.length}`;
    current.textContent=`0${slideIndex}`;
}else{
    total.textContent=slides.length;
    current.textContent=slideIndex;
}
slidesField.style.width=100*slides.length+'%';
slidesField.style.display='flex';
slidesField.style.transition='0.5s all';

slidesWrapper.style.overflow='hidden';
slides.forEach(slide=>{
    slide.style.width=width;
});
slider.style.position='relative';
const indicators= document.createElement('ol'),
    dots=[];

indicators.classList.add('carousel-indicators');
slider.append(indicators);

for(let i=0;i<slides.length;i++){
    const dot=document.createElement('li');
    dot.setAttribute('data-slide-to',i+1);
    dot.classList.add('dot');
    if(i==0){
        dot.style.opacity=1;
    }
    indicators.append(dot);
    dots.push(dot);
}
function dotsOpacity(x){
    x.forEach(dot => dot.style.opacity='.5');        
    x[slideIndex-1].style.opacity=1;
}
function sliderValue(x){
    if(slides.length<10){
        current.textContent=`0${x}`;
    }else{
        current.textContent=x;
    }
}
function widthAsANumber(x){
    let y=+(x.replace(/\D/g, ''));
    return y;
}

next.addEventListener('click',()=>{
    if(offset==widthAsANumber(width)*(slides.length-1)){
        offset=0; 
    }else{
        offset+= widthAsANumber(width);
    }
    slidesField.style.transform=`translateX(-${offset}px)`;

    if(slideIndex==slides.length){
        slideIndex=1;
    } else{
        slideIndex++;
    }
    sliderValue(slideIndex);
    dotsOpacity(dots);
});
prev.addEventListener('click',()=>{
    if(offset==0){
        offset= widthAsANumber(width)*(slides.length-1);
    }else{
        offset-= widthAsANumber(width);
    }
    slidesField.style.transform=`translateX(-${offset}px)`;

    if(slideIndex==1){
        slideIndex=slides.length;
    } else{
        slideIndex--;
    }
    sliderValue(slideIndex);
    dotsOpacity(dots);
});

dots.forEach(dot=>{
    dot.addEventListener('click',(e)=>{
       const slideTo=e.target.getAttribute('data-slide-to');
        slideIndex=slideTo;
        offset=widthAsANumber(width)*(slideTo-1);
        slidesField.style.transform=`translateX(-${offset}px)`;
        sliderValue(slideIndex);
        dotsOpacity(dots);
    });
});
}
module.exports=slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs(){
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
}
module.exports=tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer(){
//Timer
    // Задаем крайнюю дату в переменной, затем вычисляем разницу 
    // между текущей датой и дедлайном  в милисекундах. 
    // далее от результата можно посчитать сколько осталось в днях, часах и тд.
    const deadline='2020-10-28';
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
}
module.exports=timer;

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


window.addEventListener('DOMContentLoaded',()=>{
    // объединяем все файлы в главный, импортим модули
  const tabs=__webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
        modal=__webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
        calc=__webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
        cards=__webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
        forms=__webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
        timer=__webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
        slider=__webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
    
    tabs();
    modal();
    calc();
    cards();
    forms();
    timer();
    slider();
    



      
    
});




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map