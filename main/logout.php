<?php	
	include('../secure/database.php');
	$conn = pg_connect(HOST." ".DBNAME." ".USERNAME." ".PASSWORD) or die('Could not connect:' . pg_last_error());

	session_start();
	session_destroy();
	header("Location: login.php");
?>
