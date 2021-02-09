setTimeout(function(){
    gsap.to('.circleLoader',0.2,{opacity:0})
   gsap.to('#LoaderBack',1,{strokeWidth: '0', delay:0.2})
}, 1000)