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

var canvas=document.querySelector("canvas");
canvas.width=800;
canvas.height=300;
var context=canvas.getContext('2d')
console.log(context);
var x=10,y=100;
var width=10,height=50
var rect=[];
var offset=5;
function Rectangle(x,y,width,height){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
    this.create=()=>{
        context.strokeStyle="green";
        context.strokeRect(this.x,this.y,this.width,this.height);
        
        context.fillStyle=`yellow`
        context.fillRect(this.x,this.y,this.width,this.height);
      
    }
    this.style=()=>{
        context.fillStyle="red"
        context.fillRect(this.x,this.y,this.width,this.height);
    }
    this.reset=()=>{
        context.fillStyle="yellow"
        context.fillRect(this.x,this.y,this.width,this.height);
    }
}

for(let i=1;i<=50;i++){
    //rect[i-1]=
    //context.fillStyle=`rgb(${Math.floor(255*Math.random())},${Math.floor(255*Math.random())},${Math.floor(255*Math.random())})`
    rect[i-1]=new Rectangle(x+offset,y-Math.floor(50*Math.random()),width,height+Math.floor(50*Math.random()))
    rect[i-1].create()
    offset+=15
}
var move=0;
var canvasTimer
function animate(){
    //requestAnimationFrame(animate);
    //console.log("f");
    if(canvasButton.textContent=="play"){
        canvasButton.textContent="pause"
        canvasTimer= setInterval(()=>{
        rect[move].style()
        move++;
        if(move==50){
            move=0;
            canvasButton.textContent="play";
            clearInterval(canvasTimer);
            reset()
        }
        console.log(move);
    },500)
    
    }
    else{
        canvasButton.textContent="play";
        clearInterval(canvasTimer)
    }   
   //context.fillRect(x+offset,y-Math.floor(50*Math.random()),width,height+Math.floor(50*Math.random()))
   
}

//animate()
//console.log(rect);
var canvasButton=document.createElement("button");
canvasButton.textContent="play"
document.querySelector("body").appendChild(canvasButton)
canvasButton.addEventListener("click",()=>{
    animate()
})

function reset(){
    for(let i=0;i<50;i++){
        rect[i].reset()
    }
}
canvas.addEventListener("click",(e)=>{
    console.log("click",e.target,e.clientX,e.clientY);
})
//doesn't work
// rect[0].addEventListener("click",()=>{
//     console.log(0);
// })


// console.log(context);
// console.log(canvas);

//dummy=context.fillRect(0,0,100,200);

// context.beginPath()
// context.stroke()

// context.fill()