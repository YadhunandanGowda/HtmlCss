
function life() {
    var tl = new TimelineMax({ paused:false, repeat: -1, yoyo:true, delay: 0 });
    tl.add("life")
      .to('#upperbody-norm', 1.27, {y:"2.5", x:".55", ease:Power1.easeInOut}, "samsies" )
      .to('#upperbody-norm', 1.27, {rotation: 1.69, transformOrigin: "50% 55px", ease:Power1.easeOut}, "samsies")
      .to('#rightarm-norm', .69, {rotation: -2}, "samsies")
    return tl;
   }
  
  function wrong(){
    var tl = new TimelineMax();
    tl.add("wrong")
  
    .to("#monster", 0.001, {opacity:0})
    .to("#wronganswer", 0.001, {opacity:1})
    .to("#wronganswer", 6, {opacity:1, y:-3300, ease:SteppedEase.config(11)}, correct)
    .to("#finger-wag", 0.2, {morphSVG:{shape:"#finger-wag-1"}, repeat:1, yoyo:true})
    return tl;
  }
  var triggerWrong = new TimelineMax({
    paused:true, yoyo:true, repeat: 1
  });
  triggerWrong.add(wrong());
  
  //this toggle kicks off the yawn timeline
  $(".wrong").on("click", function(e) {
    e.preventDefault();
    triggerWrong.restart();
  });
  
  function blink() {
    var tl = new TimelineMax({ paused:false, repeat: -1 });
    tl.add("blink")
      .from("#lefteye-norm", 0.2, {morphSVG:{shape:"#lefteye-blink"}, repeat:1, repeatDelay:4, ease:Power1.easeOut, yoyo:true}, "life")
      .from("#righteye-norm", 0.2, {morphSVG:{shape:"#righteye-blink"}, repeat:1, repeatDelay:4, ease:Power1.easeOut, yoyo:true}, "life")
    return tl;
   }
  function toetap() {
   var tl = new TimelineMax({ paused:false, repeat: 17, yoyo:true, delay: 7.7 });
    tl.add("toetap")
      .to("#legs-norm", 0.22, {morphSVG:{shape:"#legs-tap"}}, "life")
    return tl;
   }
  function itch() {
    var tlitch = new TimelineMax({yoyo:true, repeat: -1});
    tlitch.add("itch")
      .set('#leftarm-itchy', {y:0})
      .to("#leftarm-itchy", 0.7, {y:-3600, ease:SteppedEase.config(12), delay:2, repeatDelay:5} )
      .to("#leftarm-itch-1", 0.22, {morphSVG:{shape:"#leftarm-itch-2"}, repeat:3, yoyo:true})
    return tlitch;
   }

   
  function walk() {
    var manwalk = new TimelineMax({yoyo:true, repeat: -1});
    manwalk.add("walk")
      .set('#leftarm-itchy', {y:0})
      .to("#leftarm-itchy", .7, {y:-3600, ease:SteppedEase.config(12), delay:2, repeatDelay:5} )
      .to("#leftarm-itch-1", 0.22, {morphSVG:{shape:"#leftarm-itch-2"}, repeat:3, yoyo:true})
    return tlitch;
   }
  /*var triggerItch = new TimelineMax({
    paused:true, yoyo:true, repeat: 1
  });
  triggerItch.add(itch());
  
  //this toggle kicks off the yawn timeline
  $(".itch").on("click", function(e) {
    e.preventDefault();
    triggerItch.restart();
  });
  
  */
  function yawn() {
   var tl = new TimelineMax({ repeat: -1, yoyo:true, delay:4 });
    tl.add("yawn")
      .to("#mouth-norm", 1.5, {morphSVG:{shape:"#mouth-yawn"},ease: Back.easeOut.config(3), delay:7, repeatDelay:7}, "yawn")
      .to("#lefteye-norm", 0.2, {morphSVG:{shape:"#lefteye-blink"}, ease:Power1.easeOut, delay:7, repeatDelay:7}, "yawn")
      .to("#righteye-norm", 0.5, {morphSVG:{shape:"#righteye-blink"}, ease:Power1.easeOut, delay:7, repeatDelay:7}, "yawn" )
    return tl;
   }
  //create a timeline but initially pause it so that we can control it via click
  /*var triggerYawn = new TimelineMax({
    paused: true, repeat: 1, yoyo:true, delay: 0 
  });
  triggerYawn.add(yawn());
  
  //this toggle kicks off the yawn timeline
  $(".yawnbutton").on("click", function(e) {
    e.preventDefault();
    triggerYawn.restart();
  });
  */
  function slosh1() {
   var tl = new TimelineMax({ paused:false, repeat: -1, yoyo:true, delay: 0 });
    tl.add("slosh1")
      .to("#zero", 1, {morphSVG:{shape:"#zeroa"}}, "life")
      .to("#zero", 1.5, {morphSVG:{shape:"#zerob"}})
    return tl;
   }
  
  function growOne() {
    var tl = new TimelineMax();
    tl.add("grow")  
      .set('#leftarm-itchy', {y:0})
      .set("#monster", {opacity:0})
      .set("#growing", {opacity:1})
      .to("#growing", .55, {opacity:1, y:-2400, ease:SteppedEase.config(8), delay:.2})
      .add("growing")
      .to('#themonsters', .88, {scale:"1.27", transformOrigin: "50% 2540px", ease:Elastic.easeOut.config(1, 0.5), delay:0})
      .to("#flex", .69, {morphSVG:{shape:"#flexed"}, delay:-.2, ease:Elastic.easeOut.config(1.5, 0.75), repeat:1, yoyo:true})
      .to("#growing", .5, {opacity:1, y:0, ease:SteppedEase.config(8)})
      .set("#growing", {opacity:0})
      .set("#monster", {opacity:1})
     
  
    return tl;
  }
  function gaugeOne(){
    var foo = {bar:0};//set countup start var
    var currentBar = foo.bar;//set countup vars
    
    var tl = new TimelineMax({delay:.55});
    tl.add("gauge")
    tl.to("#zero", 1, {morphSVG:{shape:"#thirtya"}}, "gauge")
      .to(foo, 1, { bar: 33, roundProps: "bar", onUpdate: function() {
          if(currentBar != this.target.bar) {
            $('#nerd').text(this.target.bar + "%");
            currentBar = this.target.bar
          }
      }}, "gauge")
      .add("gauged")
      .set("#zero", {opacity:0})
      .set("#thirty", {opacity:1})
      var tln = new TimelineMax({repeat: -1, yoyo:true });
        tln.to("#thirty", 1.69, {morphSVG:{shape:"#thirtya"}}, "gauged")
        .to("#thirty", 1.69, {morphSVG:{shape:"#thirtyb"}} )
      return tln;
    return tl;
   
  }
  function growTwo() {
    var tl = new TimelineMax();
    tl.add("grow")  
      .set('#leftarm-itchy', {y:0})
      .set("#monster", {opacity:0})
      .set("#correct", {opacity:1})
      .to("#correct", .6, {opacity:1, y:-3600, ease:SteppedEase.config(12)}, correct)
      .add("growing")
      .to('#themonsters', .55, {scale:"1.4", transformOrigin: "50% 3738px", ease:Elastic.easeOut.config(1.5, 0.75), delay:0})
     // .to("#flex", .69, {morphSVG:{shape:"#flexed"}, delay:-.2, ease:Elastic.easeOut.config(1.5, 0.75), repeat:1, yoyo:true})
      .to("#correct", .5, {opacity:1, y:0, ease:SteppedEase.config(12)})
      .set("#correct", {opacity:0})
      .set("#monster", {opacity:1})
     
  
    return tl;
  }
  function gaugeTwo(){
    var foo = {bar:33};//set countup start var
    var currentBar = foo.bar;//set countup vars
    
    var tl = new TimelineMax({delay:.55});
    tl.add("gauge")
    tl.to("#thirty", 1, {morphSVG:{shape:"#sixtya"}}, "gauge")
      .to(foo, 1, { bar: 67, roundProps: "bar", onUpdate: function() {
          if(currentBar != this.target.bar) {
            $('#nerd').text(this.target.bar + "%");
            currentBar = this.target.bar
          }
      }}, "gauge")
      .add("gauged")
      .set("#thirty", {opacity:0})
      .set("#sixty", {opacity:1})
      var tln = new TimelineMax({repeat: -1, yoyo:true });
        tln.to("#sixty", 1.69, {morphSVG:{shape:"#sixtya"}}, "gauged")
        .to("#sixty", 1.69, {morphSVG:{shape:"#sixtyb"}} )
      return tln;
    return tl;
   
  }
  
  function growThree() {
    var tl = new TimelineMax();
    tl.add("grow")  
      .set('#leftarm-itchy', {y:0})
      .set("#monster", {opacity:0})
      .set("#growing", {opacity:1})
      .to("#growing", .55, {opacity:1, y:-2400, ease:SteppedEase.config(8), delay:.2})
      .add("growing")
      .to('#themonsters', .88, {scale:"1.7", transformOrigin: "50% 2540px", ease:Elastic.easeOut.config(1, 0.5), delay:0})
      .to("#flex", .69, {morphSVG:{shape:"#flexed"}, delay:-.2, ease:Elastic.easeOut.config(1.5, 0.75), repeat:1, yoyo:true})
      .to("#growing", .5, {opacity:1, y:0, ease:SteppedEase.config(8)})
      .set("#growing", {opacity:0})
      .set("#monster", {opacity:1})
     
    return tl;
  }
  function gaugeThree(){
    var foo = {bar:67.0};//set countup start var
    var currentBar = foo.bar;//set countup vars
    
    var tl = new TimelineMax({delay:.55});
    tl.add("gauge")
    tl.to("#sixty", 1, {morphSVG:{shape:"#hundred"}}, "gauge")
      .to(foo, 1, { bar: 100, roundProps: "bar", onUpdate: function() {
          if(currentBar != this.target.bar) {
            $('#nerd').text(this.target.bar + "%");
            currentBar = this.target.bar
          }
      }}, "gauge")
      .to("#nerd", 1, {x:-7},"gauge")
      .add("gauged")
      .set("#sixty", {opacity:0})
      .set("#hundred", {opacity:1})
        
    return tl;
   
  }
  
  //this toggle kicks off the grow timeline
  $(".growbutton").on("click", function(e) {
    e.preventDefault();
    growOne();
    gaugeOne();
  });
  $(".growbiggerbutton").on("click", function(e) {
    e.preventDefault();
    growTwo();
    gaugeTwo();
  });
  $(".grownbutton").on("click", function(e) {
    e.preventDefault();
    growThree();
    gaugeThree();
  });
  var master = new TimelineMax();
  master/*.add(fly)*/.add(slosh1).add(life).add(toetap).add(yawn).add(itch).add(blink);
  
  
  
  