//creates animation frame
(function () {
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	width = 1000,
	height = 500,
	player = {
		x: 100,
		y: height - 20,
		width: 20,
		height: 20,
		speed: 5,
		velX: 0,
		velY: 0,
		jumping: false,
		grounded: false
	},
	keys = [],
	friction = 0.8,
	gravity = 0.08;

var boxes = [],goal,winner=0,fire=[],safe=[];

//goal
goal = {
	x:800,
	y:150,
	width:20,
	height:20
};
//right tunnel
fire.push({
	x: 100,
	y: 220,
	width: 10,
	height: 180
});
//left tunnel
fire.push({
	x: 40,
	y: 220,
	width: 10,
	height: 180
});
//start top
fire.push({
	x: 100,
	y: 400,
	width: 100,
	height: 10
});
//start right
fire.push({
	x: 200,
	y: 400,
	width: 10,
	height: 100
});
//start left ledge
fire.push({
	x: 0,
	y: 400,
	width: 50,
	height: 10
});
fire.push({
	x: 300,
	y: 400,
	width: 700,
	height: 10
});
fire.push({
	x: 200,
	y: 490,
	width: 800,
	height: 10
});
fire.push({
	x: 775,
	y: 110,
	width: 100,
	height: 10
});
fire.push({
	x: 765,
	y: 125,
	width: 10,
	height: 70
});
fire.push({
	x: 775,
	y: 200,
	width: 150,
	height: 10
});

fire.push({
	x: 970,
	y: 200,
	width: 50,
	height: 10
});
fire.push({
	x: 700,
	y: 0,
	width: 10,
	height: 100
});
fire.push({
	x: 400,
	y: 0,
	width: 10,
	height: 100
});

fire.push({
	x: 845,
	y: 360,
	width: 10,
	height: 50
});
/*
fire.push({
	x: 830,
	y: 300,
	width: 20,
	height: 10
});
too hard*/
//borders
boxes.push({
	x: 0,
	y: 0,
	width: 5,
	height: height
});
boxes.push({
	x: 0,
	y: height - 2,
	width: width,
	height: 50
});
boxes.push({
	x: width - 10,
	y: 0,
	width: 50,
	height: height
});
boxes.push({
	x: 0,
	y: 0,
	width: width,
	height: 10
});
//safe zones
boxes.push({
	x: 0,
	y: 390,
	width: 30,
	height: 10
});

boxes.push({
	x: 240,
	y: 480,
	width: 30,
	height: 10
});
boxes.push({
	x: 600,
	y: 480,
	width: 30,
	height: 10
});
boxes.push({
	x: 50,
	y: 100,
	width: 50,
	height: 10
});

boxes.push({
	x: 250,
	y: 300,
	width: 50,
	height: 10
});
boxes.push({
	x: 775,
	y: 120,
	width: 100,
	height: 10
});
boxes.push({
	x: 790,
	y: 100,
	width: 50,
	height: 10
});
boxes.push({
	x: 775,
	y: 125,
	width: 10,
	height: 70
});
boxes.push({
	x: 775,
	y: 190,
	width: 100,
	height: 10
});
boxes.push({
	x: 500,
	y: 190,
	width: 100,
	height: 10
});
boxes.push({
	x: 700,
	y: 390,
	width: 100,
	height: 10
});
boxes.push({
	x: 400,
	y: 390,
	width: 100,
	height: 10
});
boxes.push({
	x: 900,
	y: 390,
	width: 130,
	height: 10
});
boxes.push({
	x: 790,
	y: 220,
	width: 100,
	height: 10
});
ctx.clearRect(0, 0, width, height);
canvas.width = width;
canvas.height = height;

function end() {
	ctx.clearRect(0, 0, width, height);
	var imageObj = new Image();

	$.post("https://babbage.cs.missouri.edu/~rcsc77/cs2830/final/main/insertPurgatorio.php",{ username: "John", score: timer.getTime()},function() {
		console.log( "insert success" );
	});

      imageObj.onload = function() {
        ctx.drawImage(imageObj, 100, 100);
      };
      ctx.fillStyle = "white";
      ctx.font="72px Georgia";
      ctx.fillText('"You finally',450,200);
      ctx.fillText('found',500,300);
	ctx.fillText('yourself :)"',500,400);		
      imageObj.src = '/~rcsc77/cs2830/final/include/pr2.jpg';
      timer.setSpeed(0);
}

function reload() {
	ctx.clearRect(0, 0, width, height);
	timer.reset();
	timer.start(10,'timer');
	requestAnimationFrame(update);
}

function update() {
	// check keys
	if (keys[38] || keys[32] || keys[87]) {
		// up arrow or space
		if (!player.jumping && player.grounded) {
			player.jumping = true;
			player.grounded = false;
			player.velY = -player.speed;
		}
	}
	if (keys[39] || keys[68]) {
		// right arrow
		if (player.velX < player.speed) {
			player.velX++;
		}
	}
	if (keys[37] || keys[65]) {
		// left arrow
		if (player.velX > -player.speed) {
			player.velX--;
		}
	}

	//physics
	player.velX *= friction;
	player.velY += gravity;
	
	//create goal
	ctx.clearRect(0, 0, width, height);
	ctx.fillStyle = "yellow";
	ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
	
	//checks if you have reached the goal
	var win = colCheck(player,goal);
	if(win!=null){
		//console.log("hello");
		winner = 1;
	}
	
	//create fire
	ctx.fillStyle = "gray";
	ctx.beginPath();
	
	for (var i = 0; i < fire.length; i++) {
		ctx.rect(fire[i].x, fire[i].y, fire[i].width, fire[i].height);
		
		//checks if coliding
		var dir = colCheck(player, fire[i]);
		
		if(dir!=null){
			reload();
		}

	}

	if(player.grounded){
		 player.velY = 0;
	}
	
	player.x += player.velX;
	player.y += player.velY;

	
	ctx.fill();
	/*
	//create safezones
	ctx.fillStyle = "blue";
	ctx.beginPath();
	
	for (var i = 0; i < safe.length; i++) {
		ctx.rect(safe[i].x, safe[i].y, safe[i].width, safe[i].height);
		
		//checks if coliding
		var dir = colCheck(player, safe[i]);
		
		if (dir === "l" || dir === "r") {
			player.velX = 0;
			player.jumping = false;
		} else if (dir === "b") {
			player.grounded = true;
			player.jumping = false;
		} else if (dir === "t") {
			player.velY *= -1;
		}

	}

	if(player.grounded){
		 player.velY = 0;
	}
	
	//player.x += player.velX;
	player.y += player.velY;

	
	ctx.fill();
*/
	//sets up boxes
	ctx.fillStyle = "white";
	ctx.beginPath();

	player.grounded = false;
	
	//creates boxes
	for (var i = 0; i < boxes.length; i++) {
		ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
		
		//checks if coliding
		var dir = colCheck(player, boxes[i]);

		if (dir === "l" || dir === "r") {
			player.velX = 0;
			player.jumping = false;
		} else if (dir === "b") {
			player.grounded = true;
			player.jumping = false;
		} else if (dir === "t") {
			player.velY *= -1;
		}

	}
	
	if(player.grounded){
		 player.velY = 0;
	}
	
	//player.x += player.velX;
	player.y += player.velY;

	ctx.fill();
	//creates the character
	ctx.fillStyle = "yellow";
	ctx.fillRect(player.x, player.y, player.width, player.height);
	
	if(winner==0){
		requestAnimationFrame(update);
	} else {
		requestAnimationFrame(end);
	}
}
