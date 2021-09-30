leftWristX=0;
leftWristY=0;
RightWristX=0;
RightWristY=0;
ScoreLeftWrist=0;
ScoreRightWrist=0;
song="";
function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
posenet=ml5.poseNet(video,modelloaded);
posenet.on("pose",gotPoses);

}
function preload(){
song = loadSound("song.mp3");
}
function draw() {
image(video,0,0,600,500);
fill("#040E94");
stroke("#B31E8D");
if(ScoreRightWrist>0.2){

circle(rightWristX,rightWristY,20);
if(rightWristY>0 && rightWristY<=100){
    document.getElementsById("speed").innerHTML="speed= 0.5X";
    song.rate(0.5);
}
else if(rightWristY>100 && rightWristY<=200){
    document.getElementsById("speed").innerHTML="speed= 1X";
    song.rate(1);
}
else if(rightWristY>200 && rightWristY<=300){
    document.getElementsById("speed").innerHTML="speed= 1.5X";
    song.rate(1.5);
}
else if(rightWristY>300 && rightWristY<=400){
    document.getElementsById("speed").innerHTML="speed= 2X";
    song.rate(2);
}
else if(rightWristY>400 && rightWristY<=500){
    document.getElementsById("speed").innerHTML="speed= 2.5X";
    song.rate(2.5);
}
}
if(ScoreLeftWrist>0.2){
circle(leftWristX,leftWristY,20);
NumberValue=Number(leftWristY);
removedecimal=floor(NumberValue);
volume=removedecimal/500;
document.getElementById("volume").innerHTML="volume= " + volume;
song.setVolume(volume);
}
}
function Play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function Stop(){
    song.stop();
}
function  modelloaded(){
    console.log("posenet is loaded")
}
function gotPoses(results){
    if(results.length >0){
        console.log(results);
        ScoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("ScoreRightWrist= " + ScoreRightWrist);
        ScoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("ScoreLeftWrist= " + ScoreLeftWrist);
        leftWristX =results[0].pose.leftWrist.x;
        leftWristY =results[0].pose.leftWrist.y;
        console.log("leftWristX" + leftWristX,"leftWristY" + leftWristY);
        rightWristX =results[0].pose.rightWrist.x;
        rightWristY =results[0].pose.rightWrist.y;
        console.log("rightWristX" + rightWristX,"rightWristY" + rightWristY);
    }
}