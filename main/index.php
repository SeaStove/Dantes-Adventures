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
		background: black;
		color: #fff;
		display: block;
		padding: 7px 8px;
		text-decoration: none;
		border-top: 1px solid #069;
	}
	</style>

</head>
<body>
	<?php include 'nav.php';?>
	<!-- easier to style a canvas when its in a div -->
	<br>
	<br>
	<form action="login.php" method="get">
  		<input type="submit" value="Log in to save your scores!">
	</form> 
	<br>
	<br>
	<form action="descent.php" method="get">
  		<input type="submit" value="Begin the Descent... (tutorial)">
	</form> 

	
	
	

</body>
</html>
