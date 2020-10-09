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