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
		speed: 3,
		velX: 0,
		velY: 0,
		jumping: false,
		grounded: false
	},
	keys = [],
	friction = 0.8,
	gravity = 0.3;
ctx.clearRect(0, 0, width, height);
var boxes = [],goal,winner=0;

// dimensions
goal = {
	x:700,
	y:400,
	width:50,
	height:50
};
//console.log(goal);

//draw the text



//draw some boxes on the screen to jump on
boxes.push({
	x: 0,
	y: 0,
	width: 10,
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
	height: 5
});
boxes.push({
	x: 200,
	y: height-25,
	width: 50,
	height: 50
});
boxes.push({
	x: 300,
	y: height-75,
	width: 50,
	height: 75
});
boxes.push({
	x: 400,
	y: height-125,
	width: 50,
	height: 125
});
boxes.push({
	x: 500,
	y: height-175,
	width: 50,
	height: 175
});

canvas.width = width;
canvas.height = height;


function end() {
	//ctx.clearRect(0, 0, width, height);
	
	ctx.font="20px Georgia";
	ctx.fillText("You're awesome!",600,300);
	timer.setSpeed(0);
}

function update() {
	// check keys
	if (keys[38] || keys[32] || keys[87]) {
		// up arrow or space
		if (!player.jumping && player.grounded) {
			player.jumping = true;
			player.grounded = false;
			player.velY = -player.speed * 2;
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
	ctx.fillStyle = "white";
	ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
	
	//checks if you have reached the goal
	var win = colCheck(player,goal);
	if(win!=null){
		//console.log("hello");
		winner = 1;
	}
	
	//sets up boxes
	ctx.fillStyle = "blue";
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
	
	ctx.font="20px Georgia";
	ctx.fillText("Use the arrow keys or WASD to move and jump",80,200);
	ctx.fillText("Reach the goal to win!",100,250);

	if(winner==0){
		requestAnimationFrame(update);
	} else {
		requestAnimationFrame(end);
	}
}

