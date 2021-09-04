//console.log("s")

var container=document.getElementById("container");
var bars=[];
var  count=0;
 //console.log(bars);
var timer;

for(let i=0;i<10;i++){
    bars[i]=document.createElement("div");
    bars[i].style.height=`${1+Math.floor(99*Math.random())}px`;;
    bars[i].setAttribute("id",`${i}-id`);
    bars[i].addEventListener("click",(e)=>{
        console.log(e.target.id);
        var end=+e.target.id.split("-")[0];
        if(count>end){
            for(let i=end+1;i<=count;i++){  //end->end+1 
                bars[i].style.backgroundColor="inherit"
            }
        }
        else{
            for(let i=0;i<=end;i++){
                bars[i].style.backgroundColor="black"
            }

        }
        count=end;
    })
    container.appendChild(bars[i])
}

function Start() {
    if(start.textContent=="play"){

        start.textContent="pause"
         timer=setInterval(()=>{
             if(count<=9){

                 bars[count].style.backgroundColor="black"
             }
            console.log(count,"count");
            
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
start.textContent="play";
var playDiv=document.getElementById("play")
playDiv.children[0].appendChild(start)
start.addEventListener("click",()=>{
    Start()
})