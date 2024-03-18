



/* #NOTE Variablen Konstanten */
//#region const
const scramble              = document.querySelectorAll(".scramble");
const scrambleTimeLine      = gsap.timeline();

const bigType               = document.querySelectorAll(".big-type")
const smallType             = document.querySelectorAll(".small-type")
const introTimeLine         = gsap.timeline();
//#endregion

/* #NOTE gsap Scramble Effekt*/

scrambleTimeLine.to(scramble , {
    
    duration:          3.0 ,
    stagger :          0.2 ,
    scrambleText: { 
        speed:         0.5 , 
        text: "{original}" ,
        chars: "#~*+$%&§NICETYPE"
    }
})


/* #NOTE in Animation */

introTimeLine.from( bigType , {
    stagger:            0.3 ,
    opacity:            0.0 ,
    y:                  80  ,
    ease: "power2.inOut"    ,
    duration:          1.25 ,
    filter: "blur(20px)"    ,

})

introTimeLine.from( Type , {
    stagger:            0.3 ,
    opacity:            0.0 ,
    y:                  80  ,
    ease: "power2.inOut"    ,
    duration:          1.05 ,
    filter: "blur(20px)"    ,

})
