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