<?php
/*
 *	geo search, take in search type and query, return matching geo-tweets to map.
 */
include("../secure/database.php");
$conn = pg_connect(HOST." ".DBNAME." ".USERNAME." ".PASSWORD) or die('Could not connect: ' . pg_last_error());
 $username = htmlspecialchars( $_POST['username'] );
 $level = htmlspecialchars( $_POST['query'] );
 $score = $_POST['score'];
	$query = "INSERT INTO DA.inferno(username,score) VALUES($1,$2)";
	pg_prepare($conn, "logs", $query)  or die('Could not connect:' . pg_last_error());
	pg_execute($conn, "logs", array($username,$score))  or die('Could not connect:' . pg_last_error());

?>
