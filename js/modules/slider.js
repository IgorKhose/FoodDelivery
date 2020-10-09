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