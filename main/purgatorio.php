<!doctype html>
<html>
<head>
	<title>Robert Stovall Final</title>
	<link rel="stylesheet" type="text/css" href="/~rcsc77/cs2830/final/include/styles.css">
	<script src="/~rcsc77/cs2830/final/include/jquery.js"></script>
	<script src="/~rcsc77/cs2830/final/include/jquery-ui.js"></script>
	<script src="/~rcsc77/cs2830/final/include/ajax.js"></script>
	<style>
	.nav li a {
		background: gray;
		color: yellow;
		display: block;
		padding: 7px 8px;
		text-decoration: none;
		border-top: 1px solid #069;
	}
	.nav ul a {
		display: block;
		height: 15px;
		padding: 7px 8px;
		color: yellow;
		text-decoration: none;
		border-bottom: 1px solid #222;
	}
	</style>
</head>
<body>
	<?php include 'nav.php';?>
	<!-- easier to style a canvas when its in a div -->
	<h1 style="text-align:center;color:yellow;">
		<p>Purgatorio</p>
	</h1>
	<div id="timer"></div>
	<div id="canvHolder">
		<canvas id="canvas" style="background-color:gray;"></canvas>
		<br>
	</div>
	<br>
	<div class="leftbutton">
		<button onclick="reset()">Restart</button>
	</div>
	<div class="rightbutton">
		<form action="paradiso.php" method="get">
	  		<input type="submit" value="Climb the Stairway">
		</form> 
	</div>
	
	<!--Fills the canvas with the game-->
	<script src="/~rcsc77/cs2830/final/js/purgatorio.js"></script>
	<script src="/~rcsc77/cs2830/final/js/main.js"></script>
</body>
</html>
