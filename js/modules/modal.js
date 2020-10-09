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