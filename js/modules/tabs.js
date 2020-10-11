function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass){
      //Tabs
      const tabs=document.querySelectorAll(tabsSelector),
      tabsContent=document.querySelectorAll(tabsContentSelector),
      tabsParent=document.querySelector(tabsParentSelector);
 
 // Функция, которая  скрывает все табы с контентом и удаляем класс активного
 // элемента у всех табов-названий
 function hideTabContent(){
     tabsContent.forEach(item=>{
         item.classList.add('hide');
         item.classList.remove('show','fade');
     });
     
     tabs.forEach(item=>{
         item.classList.remove(activeClass);
     });
 
 }
 // Функция, которая показывает таб с контентом и добавляет класс активного
 // таба с названием. по умолчанию работает на первом, переключается в 
 // зависимости от аргумента
 // В аргумент указываем параметр по умолчанию.
 function showTabContent(i=0){
     tabsContent[i].classList.add('show','fade');
     tabsContent[i].classList.remove('hide');
     tabs[i].classList.add(activeClass);
 }
 
 hideTabContent();
 showTabContent();
 
     tabsParent.addEventListener('click',(e)=>{
     const target=e.target;
 
     if(target && target.classList.contains(tabsSelector.slice(1))){
         tabs.forEach((item, i)=>{
             if(target == item){
                 hideTabContent();
                 showTabContent(i);
             }
           });
         }
     });
}
export default tabs;