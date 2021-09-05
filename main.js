song1 = "";
song2 = "";

function preload() {
	song1 = loadSound("Broken_feat_Amy_Lee.mp3");
	song2 = loadSound("Immigrant_Song.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

status_song_1 = "";
status_song_2 = "";

function setup() {
	canvas = createCanvas(400, 400);
	canvas.position(670, 300);

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
	console.log('PoseNet Is Initialized');
}

function gotPoses(results) {
	if (results.length > 0) {
		console.log(results);
		scoreRightWrist = results[0].pose.keypoints[10].score;
		scoreLeftWrist = results[0].pose.keypoints[9].score;
		console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);

		rightWristX = results[0].pose.rightWrist.x;
		rightWristY = results[0].pose.rightWrist.y;
		console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

		leftWristX = results[0].pose.leftWrist.x;
		leftWristY = results[0].pose.leftWrist.y;
		console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

	}
}

function draw() {
	image(video, 0, 0, 600, 500);

	status_song_1 = song1.isPlaying();
	status_song_2 = song2.isPlaying();

	fill("#FF0000");
	stroke("#FF0000");

	if (scoreRightWrist > 0.2) {
		circle(rightWristX, rightWristY, 20);



		song2.stop();
		if (status_song_2 == false) {
			song1.play();
			document.getElementById("song").innerHTML = "PLAYING - Broken Feat by Amy Lee";
		}


	}

	if (scoreLeftWrist > 0.2) {
		circle(leftWristX, leftWristY, 20);

		song1.stop();
		if (status_song_1  == false) {
			song2.play();
			document.getElementById("song").innerHTML = "PLAYING - Immigrant Song by Led Zeppelin";
		}

	}

}

function play() {
	song.play();
	song.setVolume(1);
	song.rate(1);
}
