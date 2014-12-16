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
var boxes = [],goal,winner=0,fire;
//var username = <?php echo json_encode($_SESSION['username']);?>;

// dimensions
goal = {
	x:25,
	y:150,
	width:50,
	height:50
};
//console.log(goal);
fire = {
	x:310,
	y: height-20,
	width:700,
	height:20
}
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
	x: 500,
	y: 310,
	width: 80,
	height: 80
});
boxes.push({
	x: 400,
	y: 350,
	width: 80,
	height: 80
});
boxes.push({
	x: 300,
	y: 400,
	width: 80,
	height: 80
});
boxes.push({
	x: 270,
	y: 450,
	width: 40,
	height: 60
});
boxes.push({
	x: 620,
	y: 270,
	width: 100,
	height: 20
});
boxes.push({
	x: 370,
	y: 230,
	width: 200,
	height: 20
});
boxes.push({
	x: 320,
	y: 210,
	width: 15,
	height: 10
});
boxes.push({
	x: 250,
	y: 200,
	width: 15,
	height: 10
});

boxes.push({
	x: 180,
	y: 190,
	width: 15,
	height: 10
});

boxes.push({
	x: 160,
	y: 150,
	width: 15,
	height: 10
});
boxes.push({
	x: 100,
	y: 0,
	width: 800,
	height: 10
});
boxes.push({
	x: 10,
	y: 200,
	width: 90,
	height: 10
});
boxes.push({
	x: 90,
	y: 0,
	width: 10,
	height: 200
});

boxes.push({
	x: 900,
	y: 66,
	width: 20,
	height: 10
});

boxes.push({
	x: 900,
	y: 150,
	width: 20,
	height: 10
});
boxes.push({
	x: 940,
	y: 110,
	width: 20,
	height: 10
});
boxes.push({
	x: 940,
	y: 25,
	width: 20,
	height: 10
});
//pipe 1
boxes.push({
	x: 240,
	y: 120,
	width: 20,
	height: 10
});
boxes.push({
	x: 240,
	y: 10,
	width: 20,
	height: 20
});
//pipe 2
boxes.push({
	x: 340,
	y: 80,
	width: 20,
	height: 70
});
/**
boxes.push({
	x: 340,
	y: 10,
	width: 20,
	height: 30
});
**/
//inbetween p2-p3
boxes.push({
	x: 425,
	y: 100,
	width: 10,
	height: 20
});
//pipe 3
boxes.push({
	x: 500,
	y: 120,
	width: 20,
	height: 30
});
boxes.push({
	x: 500,
	y: 10,
	width: 20,
	height: 30
});
//inbetween p3-p4
boxes.push({
	x: 600,
	y: 80,
	width: 20,
	height: 10
});
//pipe 4
boxes.push({
	x: 700,
	y: 140,
	width: 20,
	height: 10
});
/*
boxes.push({
	x: 700,
	y: 10,
	width: 20,
	height: 87
});
too hard
*/
//after pipe 4
boxes.push({
	x: 860,
	y: 200,
	width: 1,
	height: 1
});




canvas.width = width;
canvas.height = height;


function end() {
	ctx.clearRect(0, 0, width, height);
	var imageObj = new Image();

      imageObj.onload = function() {
        ctx.drawImage(imageObj, 100, 100);
      };
      imageObj.src = '/~rcsc77/cs2830/final/include/pr.jpg';
      ctx.fillStyle = "white";
      ctx.font="72px Georgia";
      ctx.fillText('"Nice Job',500,200);
      ctx.fillText('   Escaping"',500,300);	
      timer.setSpeed(0);
      //ajax call      
      $.post("https://babbage.cs.missouri.edu/~rcsc77/cs2830/final/main/insertInferno.php",{ username: "John", score: timer.getTime()},function() {
	console.log( "insert success" );
	});
      console.log(timer.getTime());
	
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
	
	//create goal
	ctx.fillStyle = "orange";
	ctx.fillRect(fire.x, fire.y, fire.width, fire.height);
	
	//checks if you have reached the goal
	var win = colCheck(player,goal);
	if(win!=null){
		//console.log("hello");
		winner = 1;
	}
	
	//check if you fall in the fire
	var dead = colCheck(player,fire);
	if(dead!=null){
		reload();
	}
	
	//sets up boxes
	ctx.fillStyle = "red";
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




