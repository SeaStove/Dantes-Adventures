//checks for collision of objects
function colCheck(shapeA, shapeB) {
	// get the vectors of both shapes
	var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
		vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
		// add the half widths and half heights of the objects
		hWidths = (shapeA.width / 2) + (shapeB.width / 2),
		hHeights = (shapeA.height / 2) + (shapeB.height / 2),
		colDir = null;

	//if they vectors are less than half, it must be a collision
	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
		//checks which side of each is colliding
		
		var oX = hWidths - Math.abs(vX),
			oY = hHeights - Math.abs(vY);
		if (oX >= oY) {
			if (vY > 0) {
				colDir = "t";
				shapeA.y += oY;
			} else {
				colDir = "b";
				shapeA.y -= oY;
			}
		} else {
			if (vX > 0) {
				colDir = "l";
				shapeA.x += oX;
			} else {
				colDir = "r";
				shapeA.x -= oX;
			}
		}
	}
	return colDir;
}
//resets your character then reloads the page
//just resettings the character didnt work very well
function reload() {
	//end();
	ctx.clearRect(0, 0, width, height);
	console.log(player);
	player.x=100;
	player.y=height-20;
	winner =0;
	timer.reset();
	timer.start(10,'timer');
}

function reset() {
	location.reload();
}
//true when key pressed
document.body.addEventListener("keydown", function (e) {
	keys[e.keyCode] = true;
});

//false when key released
document.body.addEventListener("keyup", function (e) {
	keys[e.keyCode] = false;
});

//calls the update function when the page loads
window.addEventListener("load", function () {
	update();
	timer.start(10, 'timer');
});

//TIMER!!!
var timer = (function() {
    var basePeriod = 100;
    var currentSpeed = 1;
    var timerElement;
    var timeoutRef;
    var count = 0;

    return {
	  reset : function() {
		basePeriod = 100;
		currentSpeed = 1;
		timerElement;
		timeoutRef;
		count = 0;
	  },
      start : function(speed, id) {
        if (speed == 0) {
          currentSpeed = 10;
        }
        if (id) {
          timerElement = document.getElementById(id);
        }
        timer.run();
      },

      run: function() {
        if (timeoutRef) clearInterval(timeoutRef);
        if (timerElement) {
          timerElement.innerHTML = "<h3>Your score: " +count+"</h3>";
        }
        if (currentSpeed) {
          timeoutRef = setTimeout(timer.run, basePeriod/currentSpeed);
        }
        ++count;
      },

      setSpeed: function(speed) {
        currentSpeed = speed;
        timer.run();
      },
	  
	  getTime: function(){
		return count;
	  }
    }

}());

//start timer on load
//window.onload = function(){timer.start(10, 'timer');};
