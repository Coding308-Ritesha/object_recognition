bottle_img="";
Status="";
objects=[];

function preload(){
    bottle_image = loadImage("pexels-photo-1188649.jpg")
}

function setup(){
    canvas = createCanvas(640,350);
    canvas.position(315,200);
    object_Detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    object_Detector.detect(bottle_image,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects=results;
}



function draw(){
image(bottle_image,0,0,640,420);

if(Status!= "")
{
    for(i=0;i<objects.length;i++)
    {
        document.getElementById("updated_status").innerHTML="Status: Object Detected";

        fill("#FF0000");
        percent= floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
}
}

