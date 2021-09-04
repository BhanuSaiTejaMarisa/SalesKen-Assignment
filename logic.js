//console.log("s")

var container=document.getElementById("container");
var bars=[]
for(let i=0;i<10;i++){
    bars[i]=document.createElement("div");
    bars[i].style.height=`${1+Math.floor(99*Math.random())}px`;
    container.appendChild(bars[i])
}

var  count=0;
 //console.log(bars);
var timer;

function Start() {
    if(start.textContent=="play"){

        start.textContent="pause"
         timer=setInterval(()=>{
             if(count<=9){

                 bars[count].style.backgroundColor="black"
             }
            //console.log(count);
            
            if(count==10){
                for(let i=0;i<bars.length;i++){

                    bars[i].style.backgroundColor="inherit"
                }
                count=-1;
            }
            count++
         },1000)
    }
    else{
        start.textContent="play";
        clearInterval(timer)
    }

}
var start=document.createElement("button");
start.textContent="play"
document.getElementById("play").appendChild(start)
start.addEventListener("click",()=>{
    Start()
})