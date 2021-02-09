


var
Doc = document,
TwL = TweenLite,
E0 = Sine.easeInOut,
E1 = Sine.easeIn,
E2 = Sine.easeOut
Body = Doc.getElementById('Body'),
//     UpperBody = Doc.getElementById('UpperBody'),
RightLeg = Doc.getElementById('Exclusion_1');
LeftLeg = Doc.getElementById('Path_99');    
//     RightHand = Doc.getElementById('RightHand');

TwL.set('svg', { opacity: 1 });
TwL.set(Body, { y: 10 });
//     TwL.set(UpperBody, { fill: '#151515', transformOrigin: '50% 100%', rotation: 10 });
//     TwL.set(RightHand, { transformOrigin: '-10px 0px', rotation: -20, fill: '#454545', y: 15 , x: 15});
TwL.set(RightLeg, { transformOrigin: '0px 0px', rotation: -10});
TwL.set(LeftLeg, { transformOrigin: '0px 50px', rotation:2});
//     TwL.set('#Head', { transformOrigin: '5px 50px', fill: '#454545', scale: 0.967, rotation: -5 });
//     TwL.set('.H1', { rotation: -80, transformOrigin: '4px 4px', y: 0 });
//     TwL.set('.H2', { transformOrigin: '10% 0%', rotation: -20, y: -1.5, scaleY: 1.03 });
//     TwL.set('.F1', { transformOrigin: '21px 2px' });
//     TwL.set('.F2', { transformOrigin: '25px 0px' });
//     TwL.set('.F3', { transformOrigin: '4.2px 4.2px' });

//     var LeftLeg = RightLeg.cloneNode(true), 
//     LeftHand = RightHand.cloneNode(true);

//     LeftLeg.id = 'LeftLeg'; 
//     LeftHand.id = 'LeftHand';
//     Body.insertBefore(LeftLeg, UpperBody); 
//     Body.insertBefore(LeftHand, LeftLeg);

//     TwL.set('.Back', { fill: '#DC0026' });
//     TwL.set('#LeftLeg', { fill: '#A50018' });
//     TwL.set('#LeftHand', { y: 26, fill: '#333', transformOrigin: '-7px -7px' });

function M1(p1) {

var tl = new TimelineMax({ repeat: -1 })
    .add("l1", 0).add("l2", 0.25).add("l3", .5).add("l4", .75).add("l5", 1)
    // .to(p1, 0.2, { rotation: -10, ease: E0 }, 'l1')
    // .to(p1, 0., { rotation: 0, ease: E1 }, 'l2')
    .to(p1, 0.5, { rotation: 10, ease: E1 }, 'l1')
    // .to(p1, 0.2, { rotation: 0, ease: E1 }, 'l4')
    .to(p1, 0.5, { rotation: -10, ease: E1 }, 'l5')
    // .to(p1 + ' .F1', .25, { rotation: 120, ease: E0, y:5, x:-5 }, 'l2')
    // .to(p1 + ' .F1', .25, { rotation: 80, ease: E1 }, 'l3')
    // .to(p1 + ' .F1', .25, { rotation: 0, ease: E2 }, 'l4')
    // .to(p1 + ' .F2', .25, { rotation: 45, repeat: 1, yoyo: true }, 'l3')
    // .to(p1 + ' .F3', .25, { rotation: -35, repeat: 1, yoyo: true, scaleX: .925 }, 'l2')
    // .to(p2, .5, { rotation: 50, ease: E0, yoyo: true, repeat: 1, y: 0 , x: 35 }, 'l1')
    // .to(p2 + ' .H1', .5, { rotation: 0, ease: E0, yoyo: true, repeat: 1 }, 'l1')
    // .to(p2 + ' .H2', .5, { rotation: 0, ease: E0, yoyo: true, repeat: 1 }, 'l1');
return tl;
};

function M2(p1) {

var tl = new TimelineMax({ repeat: -1 })
    .add("l1", 0).add("l2", 0.25).add("l3", .5).add("l4", .75).add("l5", 1)
    // .to(p1, 0.5, { rotation: 2, ease: E0 }, 'l1')
    // .to(p1, 0.2, { rotation: 12, ease: E0 }, 'l2')
    .to(p1, 0.5, { rotation: 22, ease: E0 }, 'l1')
    // .to(p1, 0.2, { rotation: 12, ease: E0 }, 'l4')
    .to(p1, 0.5, { rotation: 2, ease: E1 }, 'l5')
    // .to(p1 + ' .F1', .25, { rotation: 120, ease: E0, y:5, x:-5 }, 'l2')
    // .to(p1 + ' .F1', .25, { rotation: 80, ease: E1 }, 'l3')
    // .to(p1 + ' .F1', .25, { rotation: 0, ease: E2 }, 'l4')
    // .to(p1 + ' .F2', .25, { rotation: 45, repeat: 1, yoyo: true }, 'l3')
    // .to(p1 + ' .F3', .25, { rotation: -35, repeat: 1, yoyo: true, scaleX: .925 }, 'l2')
    // .to(p2, .5, { rotation: 50, ease: E0, yoyo: true, repeat: 1, y: 0 , x: 35 }, 'l1')
    // .to(p2 + ' .H1', .5, { rotation: 0, ease: E0, yoyo: true, repeat: 1 }, 'l1')
    // .to(p2 + ' .H2', .5, { rotation: 0, ease: E0, yoyo: true, repeat: 1 }, 'l1');
return tl;
};
var MTl = new TimelineLite()
.add(M1('#Exclusion_1')).add(M2('#Path_99'),1)
// .to(Body, 0.25, { y: -30, repeat: -1, yoyo: true, ease: E0 }, 0)
//     .to('#Head', .20, { rotation: 1, repeat: -1, yoyo: true, ease: E0 }, 0)
//     .to('#mSH', .20, { scaleX: .6, repeat: -1, yoyo: true, ease: E1, transformOrigin: 'center' }, 0)
// .time(1);