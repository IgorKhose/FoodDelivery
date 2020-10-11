
function openModal(modalSelector,modalTimerId){
    const  modal=document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow='hidden';
    console.log(modalTimerId);
    if(modalTimerId){
        clearInterval(modalTimerId);
    }
    
}

function closeModal(modalSelector){
    const  modal=document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    //modal.classList.toggle('show');
    document.body.style.overflow='';
}  
function modal(triggerSelector, modalSelector, modalTimerId){
// ModalJS

    // по клику на кнопку "связаться с нами" вызываем модальное окно с 
    // формой. Получаем объекты, связанные с кнопками и модальным окном
    // добавляет обработку события- клика. Метод toggle проверяет наличия 
    // класса show. если его нет - добавляет, если есть - уберает
    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal=document.querySelector(modalSelector);

          modalTrigger.forEach(btn=>{
            btn.addEventListener('click', ()=>openModal(modalSelector, modalTimerId)); 
        });

    // закрываем страницу по нажатию на любую область 
    // страницы за пределами modal__dialog
    modal.addEventListener('click',(e)=>{
        if(e.target===modal|| e.target.getAttribute('data-close')==''){
        closeModal(modalSelector);
        }
    });
// добавляем обработку на нажатие клавиш. Свойство code возвращает
// строку с названием клавиши
document.addEventListener('keydown',(e)=>{
    if(e.code=='Escape' && modal.classList.contains('show')){
        closeModal(modalSelector);
    }
});

// добавляем запуск модуля, когда пользователь долистает до конца страницы
function showModalByScroll(){
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
        openModal(modalSelector, modalTimerId);
        window.removeEventListener('scroll',showModalByScroll);
    }
}

window.addEventListener('scroll',showModalByScroll );
}
export default modal;
export {closeModal};
export {openModal};
