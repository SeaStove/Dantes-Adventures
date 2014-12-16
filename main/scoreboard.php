<?php
	include("functions.php");
	include('../secure/database.php');
	$conn = pg_connect(HOST." ".DBNAME." ".USERNAME." ".PASSWORD) or die('Could not connect:' . pg_last_error());

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
	<h3><u>Global Top Scores</u></h3>	
	<div id="inf" class="sb">	
		<h4>Inferno</h4>
		<table border="1">	
				<tr>
				<th>Name</th>
				<th>Score</th>
				</tr>
				<?php	
					createTableGlobalInferno($_SESSION['username']);
				?>
				
		</table>
	</div>
	<div id="pur" class="sb">	
		<h4>Purgatorio</h4>
		<table border="1">	
				<tr>
				<th>Name</th>
				<th>Score</th>
				</tr>
				<?php
					createTableGlobalPurgatorio($_SESSION['username']);
				?>
		</table>
	</div>
	<div id="inf" class="sb">	
		<h4>Paradiso</h4>
		<table border="1">	
				<tr>
				<th>Name</th>
				<th>Score</th>
				</tr>
				<?php
					createTableGlobalParadiso($_SESSION['username']);
				?>
		</table>
	</div>
	
	

</body>
</html>
