<?php
	include("functions.php");
	include('../secure/database.php');
	$conn = pg_connect(HOST." ".DBNAME." ".USERNAME." ".PASSWORD) or die('Could not connect:' . pg_last_error());
	session_start();
	HTTPScheck();
?>


<!doctype html>
<html>	
<head>
	<title>Robert Stovall Final</title>
	<link rel="stylesheet" type="text/css" href="/~rcsc77/cs2830/final/include/styles.css">
	<script src="/~rcsc77/cs2830/final/include/jquery.js"></script>
	<script src="/~rcsc77/cs2830/final/include/jquery-ui.js"></script>
	<script src="/~rcsc77/cs2830/final/include/ajax.js"></script>
	<style>
	</style>
</head>
<body>
	<?php include 'nav.php';?>
	<br>
	<h3>Welcome back <?=$_SESSION['username']?> :)</h3>
	<form action="logout.php">
    		<input type="submit" value=" Wait I'm not <?=$_SESSION['username']?>">
	</form>
	<h3><u>Your Current Top Scores</u></h3>	
	<div id="inf" class="sb">	
		<h4>Inferno</h4>
		<table border="1">	
				<tr>
				<th>Score</th>
				</tr>
				<?php	
					createTableInferno($_SESSION['username']);
				?>
				
		</table>
	</div>
	<div id="pur" class="sb">	
		<h4>Purgatorio</h4>
		<table border="1">	
				<tr>
				<th>Score</th>
				</tr>
				<?php
					createTablePurgatorio($_SESSION['username']);
				?>
		</table>
	</div>
	<div id="inf" class="sb">	
		<h4>Paradiso</h4>
		<table border="1">	
				<tr>
				<th>Score</th>
				</tr>
				<?php
					createTableParadiso($_SESSION['username']);
				?>
		</table>
	</div>
	
	

</body>
</html>
