// for(let i=0; i < document.body.childNodes.length; i++){
//     console.log(document.body.childNodes[i])
// }


function block1(){
    let elem = document.getElementById('block1');
    elem.style.color = `rgb(${rnd(255)},${rnd(255)}, ${rnd(255)})`;
}

function block2(){
    let elem = document.getElementById('block2');
    elem.style.borderRadius = '25%';
}

function block3(){
    let elem = document.getElementById('block3');
    elem.style.background = `rgb(${rnd(255)},${rnd(255)}, ${rnd(255)})`;
}

function block4(){
    let elem = document.getElementById('block4');
    elem.style.fontFamily = 'serif';
}

function bodyBack(){
    let elem = document.body;
    elem.style.background = 'linear-gradient(260deg, #2376ae 0%, #c16ecf 100%)';
}
function rnd(arg){
    return Math.floor(Math.random()*arg);
}