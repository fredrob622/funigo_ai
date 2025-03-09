// const cercle = document.querySelector('.cercle');
const imgs = document.querySelectorAll('img');
const titreH1 = document.querySelector('h1');

const TL = gsap.timeline({paused: true});

TL.to(imgs, {scale: 1, duration: 0.1,  stagger: 0.1});
// TweenMax.to(titreH1, {scale: 1, duration: 0.4, rotation: 360});

// TweenMax.from(titreH1, 1, {scale: 0, width:"400", x:"400",  opacity:1, ease: "elastic.out(1, 0.7)" });
// TweenMax.from(titreH1, 1, {scale: 4, width:"200", x:"400", opacity:0, delay:1});
TweenMax.to(titreH1, 1, {scale: 1, width:"300",  opacity:0, delay:1});
TweenMax.to(titreH1, 1, {scale: 1, x:"100",  opacity:1, delay:2});
TweenMax.to(titreH1, {scale:1, transformOrigin:"0% 100%", duration: 4});

TL.play(); 

cercle.addEventListener('mouseenter', () => {
    TL.play();   
})

cercle.addEventListener('mouseout', () => {
    TL.reverse();
    
})

