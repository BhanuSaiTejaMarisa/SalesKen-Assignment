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








//CANVAS

var canvas=document.querySelector("canvas");

canvas.width=780;
canvas.height=200;

var context=canvas.getContext('2d')
//console.log(context);

var x=10,y=100;
var width=10,height=50;
var offset=5;
var pointer=0;

var rect=[];                                                            //contains all bars

var stack=[]                                                            //contains pointer lines


//Constructor
function Rectangle(x,y,width,height){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;

    //Creates all bars
    this.create=()=>{
        context.strokeStyle="green";
        context.strokeRect(this.x,this.y,this.width,this.height);
        
        context.fillStyle=`yellow`
        context.fillRect(this.x,this.y,this.width,this.height);
      
    }

    //Fills bars with red
    this.style=()=>{
        context.fillStyle="red"
        context.fillRect(this.x,this.y,this.width,this.height);
    }

    //Resets bars to yellow
    this.reset=()=>{
        context.fillStyle="yellow"
        context.fillRect(this.x,this.y,this.width,this.height);   
    }

    this.boundary=(X,Y,i)=>{
        this.reset()
        if(this.x+7.5<=X){
            // console.log(true,this.x,X,this.y,Y);
            // console.log(i);
            //stack.push(i)
            context.fillStyle="red"
            context.fillRect(this.x,this.y,this.width,this.height);
            //console.log(i);
            pointer=i;
        }  
    }
}

//Creation phase 
for(let i=1;i<=50;i++){
  
    rect[i-1]=new Rectangle(x+offset,y-Math.floor(50*Math.random()),width,height+Math.floor(50*Math.random()))
    rect[i-1].create()
    offset+=15
}


//Animation
var canvasTimer
function animate(){
    //requestAnimationFrame(animate);
    //console.log("f");
    if(canvasButton.textContent=="play"){
        canvasButton.textContent="pause"
        canvasTimer= setInterval(()=>{
            if(pointer<=49){
                rect[pointer].style()
            }
        if(pointer==50){
            pointer=0;
            canvasButton.textContent="play";
            clearInterval(canvasTimer);
            reset()
        }
        pointer++;
        //console.log(pointer);
    },250)
    
    }
    else{
        canvasButton.textContent="play";
        clearInterval(canvasTimer)
    }   
   
}
// Play/Pause button
var canvasButton=document.createElement("button");
canvasButton.textContent="play";
document.querySelector("body").appendChild(canvasButton);


// Button onclick streams bars to red
canvasButton.addEventListener("click",()=>{
    animate()
})


//Reset after playing full animation
function reset(){
    for(let i=0;i<50;i++){
        rect[i].reset()
    }
}


canvas.addEventListener("click",(e)=>{
    
        //console.log("click fn");
        barClick(e.clientX,e.clientY)
        //flagDoubleClick=0;
        canvas.removeEventListener("mousemove",streamPointer)
})

function barClick(X,Y){
    for(let i=0;i<50;i++){
        rect[i].boundary(X,Y,i);
    }
    //console.log(pointer);
}

var lineStack=[]

//Mouse pointer on top left corner of canvas 
context.strokeStyle="purple";
context.strokeRect(0,0,20,20)
context.moveTo(5,4)
context.lineTo(5,14)
context.lineTo(14,4);
context.lineTo(5,4);
context.stroke();
context.moveTo(9,11)
context.lineTo(14,15);
context.lineTo(16,12);
context.lineTo(11,8);
context.stroke();

var flagDoubleClick=0;

//Adds streaming option on double clicking the pointer
canvas.addEventListener("dblclick",(e)=>{
    
    if(e.x<28&&e.y<260&&flagDoubleClick==0){

        canvas.addEventListener("mousemove",streamPointer)
        flagDoubleClick=1

    }
    else{
        flagDoubleClick=0;
        canvas.removeEventListener("mousemove",streamPointer)
    }
    //console.log("dblcick",flagDoubleClick);
})


// Pointer function for streaming
var streamPointer=(e)=>{

    if(lineStack.length!=0){
        for(let j=0;j<lineStack.length-1;j++){
            var prevlineX=lineStack[j]
            lineStack.shift()
           
            context.clearRect(prevlineX,0,2,200);
        } 
    }

    for(let i=0;i<50;i++){
        rect[i].create()
    }
    
    if(e.x>30){
        context.fillStyle="green";
        context.fillRect(e.x-8,0,2, 200);
        lineStack.push(e.x-8);
        barClick(e.clientX,e.clientY)
    }

    tags()
}

function tags(){
    context.strokeStyle="orange";
    context.beginPath()
    context.moveTo(20,rect[0].y);
    context.lineTo(20,35);
    context.stroke();
    context.strokeRect(20,20,90,20)
    // console.log(rect[0]);
    context.fillStyle="orange"
    context.font="15px Georgia"
    context.fillText("Introduction",20, 35);
   // context.fill()

    context.strokeStyle="blue";
    context.moveTo(362,rect[23].y);
    context.lineTo(362,35);
    context.strokeRect(362,20,70,20)
    // console.log(rect[0]);
    context.fillStyle="blue"
    context.font="15px Georgia"
    context.fillText(" why x=y?",362, 35);
    context.stroke()

    context.strokeStyle="teal";
    context.moveTo(750,rect[49].y);
    context.lineTo(750,35);
    context.strokeRect(660,20,90,20)
    // console.log(rect[0]);
    context.fillStyle="teal"
    context.font="15px Georgia"
    context.fillText(" Conclusion",660, 35);
    context.stroke()
}
tags()
