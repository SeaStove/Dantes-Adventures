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
		speed: 1,
		velX: 0,
		velY: 0,
		jumping: false,
		grounded: false
	},
	keys = [],
	friction = 0.8,
	gravity = 0.3;
ctx.clearRect(0, 0, width, height);
var boxes = [],goal,winner=0,fire=[];

//goal
goal = {
	x:910,
	y:50,
	width:50,
	height:50
};
//level1top
fire.push({
	x: 5,
	y: 350,
	width: 790,
	height: 10
});
//level2top
fire.push({
	x: 200,
	y: 200,
	width: 800,
	height: 10
});
fire.push({
	x: 0,
	y: 10,
	width: 1000,
	height: 10
});
fire.push({
	x: 200,
	y: 300,
	width: 10,
	height: 10
});

fire.push({
	x: 400,
	y: 100,
	width: 10,
	height: 10
});

fire.push({
	x: 700,
	y: 320,
	width: 10,
	height: 10
});

fire.push({
	x: 600,
	y: 480,
	width: 150,
	height: 10
});

fire.push({
	x: 100,
	y: 200,
	width: 10,
	height: 10
});

fire.push({
	x: 800,
	y: 410,
	width: 100,
	height: 10
});

fire.push({
	x: 900,
	y: 290,
	width: 10,
	height: 130
});

fire.push({
	x: 700,
	y: 90,
	width: 10,
	height: 120
});

fire.push({
	x: 400,
	y: 450,
	width: 100,
	height: 10
});

fire.push({
	x: 170,
	y: 100,
	width: 10,
	height: 10
});//
fire.push({
	x: 500,
	y: 280,
	width: 10,
	height: 70
});

fire.push({
	x: 400,
	y: 200,
	width: 10,
	height: 70
});
/*too hard
fire.push({
	x: 100,
	y: 150,
	width: 100,
	height: 10
});
*/
fire.push({
	x: 300,
	y: 430,
	width: 10,
	height: 90
});

fire.push({
	x: 870,
	y: 0,
	width: 10,
	height: 120
});
//draw some boxes on the screen to jump on
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
boxes.push({
	x: 0,
	y: 200,
	width: 30,
	height: 10
});

canvas.width = width;
canvas.height = height;

function end() {
	ctx.clearRect(0, 0, width, height);
	var imageObj = new Image();

	$.post("https://babbage.cs.missouri.edu/~rcsc77/cs2830/final/main/insertParadiso.php",{ username: "John", score: timer.getTime()},function() {
		console.log( "insert success" );
	});
	
      imageObj.onload = function() {
        ctx.drawImage(imageObj, 100, 100);
      };
      ctx.fillStyle = "white";
      ctx.font="60px Georgia";
      ctx.fillText('"I knew',420,200);
      ctx.fillText(' you could do it"',420,300);	
      imageObj.src = '/~rcsc77/cs2830/final/include/pr3.jpg';
	timer.setSpeed(0);
}

function update() {
	// check keys
	if (keys[38] || keys[32] || keys[87]) {
		// up arrow or space
		//if (!player.jumping && player.grounded) {
			player.jumping = true;
			player.grounded = false;
			player.velY = -player.speed * 2;
		//}
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
	ctx.fillStyle = "white";
	ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
	
	//checks if you have reached the goal
	var win = colCheck(player,goal);
	if(win!=null){
		//console.log("hello");
		winner = 1;
	}
	//create fire
	ctx.fillStyle = "black";
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
	//sets up boxes
	ctx.fillStyle = "orange";
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
	
	player.x += player.velX;
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

