<!doctype html>
<html>
<head>
	<title>Robert Stovall Final</title>
	<script src="/~rcsc77/cs2830/final/include/jquery.js"></script>
	<script src="/~rcsc77/cs2830/final/include/jquery-ui.js"></script>
	<script src="/~rcsc77/cs2830/final/include/ajax.js"></script>
	<link rel="stylesheet" type="text/css" href="/~rcsc77/cs2830/final/include/styles.css">
	<style>
	.nav li a {
		background: cornflowerblue;
		color: white;
		display: block;
		padding: 7px 8px;
		text-decoration: none;
		border-top: 1px solid #069;
	}
	.nav ul a {
		display: block;
		height: 15px;
		padding: 7px 8px;
		color: white;
		text-decoration: none;
		border-bottom: 1px solid #222;
	}
	</style>
</head>
<body>
	<?php include 'nav.php';?>
	<!-- easier to style a canvas when its in a div -->
	<h1 style="text-align:center;color:cornflowerblue;">
		<p>Tutorial</p>
	</h1>
	<div id="timer"></div>
	<div id="canvHolder">
		<canvas id="canvas" style="background-color:cornflowerblue;"></canvas> 
	</div>
	<br>
	<div class="leftbutton">
		<button onclick="reset()">Restart</button>
	</div>
	<div class="rightbutton">
		<form action="inferno.php" method="get">
	  		<input type="submit" value="Bring Your Fiddle">
		</form> 
	</div>
	
	<!--Fills the canvas with the game-->
	<script src="/~rcsc77/cs2830/final/js/descent.js"></script>
	<script src="/~rcsc77/cs2830/final/js/main.js"></script>
</body>
</html>
