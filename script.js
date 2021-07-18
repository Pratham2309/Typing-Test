const api = 'https://api.quotable.io/random';
const display = document.getElementById('display');
const text = document.getElementById('text');
const timer = document.getElementById('timer');
const start = document.getElementById('start');
const end = document.getElementById('end');
const ac = document.getElementById('accuracy');
const www = document.getElementById('wpm');

var ttt;
async function getData() {
    const response = await fetch(api);
    return await response.json();
}


async function getNew() {
    const datais = await getData();
    const quote = datais.content;
    display.innerHTML = "";
    quote.split(' ').forEach(function (character) {
        const charSpan = document.createElement('span');
        charSpan.innerText = character + " ";
        display.appendChild(charSpan);
    });
    text.value = null;
    starttimer();
}

let starttime;
function starttimer() {
    timer.innerText = 0;
    starttime = new Date();
    ttt = setInterval(() => {
        timer.innerText = Math.floor((new Date() - starttime) / 1000);
    }, 1000);
}


start.addEventListener("click", function () {
    text.disabled = false;
    ac.innerHTML="";
    www.innerHTML = "";
    start.type = "hidden";
    end.type = "button";
    getNew();
});

end.addEventListener("click" , function() {
    clearInterval(ttt);
    // text.keyup(function(e){
    //     e.preventDefault();
    // });
    text.disabled = true;
    var av = text.value.split(' ');
    var aq = display.querySelectorAll('span');
    let corr=0,incorr=0;
    let n = Math.min(av.length,aq.length);
    let k = 0;
    // console.log(av);
    for(let i=0; i<n; i++){
       
        if(av[i]==""){
            console.log('hi');
            continue;
        }
        let strr = aq[k].innerText;
        if(i<aq.length-1)
            strr = strr.substring(0 , strr.length-1);
        // console.log('typed' , av[i]);
        // console.log('actual' ,strr);
        if(av[i]==strr){
            aq[k].classList.add('correct');
            aq[k].classList.remove('incorrect');
            corr++;
        }
        else{
            aq[k].classList.add('incorrect');
            aq[k].classList.remove('correct');
            incorr++;
        }
        k++;
    }
    var accuracy = corr/aq.length;
    accuracy = accuracy*100;
    var tt = aq.length-corr-incorr;
    var wpm = Math.round((corr)/(timer.innerText/60));
    ac.innerHTML= "Correct words : <b>" + corr + "</b> &nbsp &nbsp Incorrect words : <b>" + incorr + "</b> &nbsp &nbsp Non-Typed words : <b>" + tt + "</b>";
    www.innerHTML = "Accuracy is <b>" + Math.round(accuracy) + "%</b>  &nbsp &nbsp WPM : <b>" + wpm + "</b>"; 
    start.type = "button";
    end.type = "hidden";
});
