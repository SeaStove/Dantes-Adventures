<?php
include('../secure/database.php');
$conn = pg_connect(HOST." ".DBNAME." ".USERNAME." ".PASSWORD) or die('Could not connect:' . pg_last_error());


//TABLES FOR SCOREBOARD
function createTableGlobalInferno(){
	global $conn;
	$logs = "SELECT username,score FROM DA.inferno  ORDER BY score ASC limit 20";
	pg_prepare($conn, "logs", $logs)  or die('Could not connect:' . pg_last_error());
	$logs = pg_execute($conn, "logs", array())  or die('Could not connect:' . pg_last_error());
		while ($table = pg_fetch_array($logs, null, PGSQL_ASSOC)) {
			echo "<tr>";
			echo "<td>".$table['username']."</td>";
			echo "<td>".$table['score']."</td>";
			echo "</tr>";
		}
}



function createTableGlobalPurgatorio(){
	global $conn;
	$dogs = "SELECT username,score FROM DA.purgatorio  ORDER BY score ASC limit 20";
	pg_prepare($conn, "dogs", $dogs)  or die('1Could not connect:' . pg_last_error());
	$dogs = pg_execute($conn, "dogs", array())  or die('2Could not connect:' . pg_last_error());
		while ($table = pg_fetch_array($dogs, null, PGSQL_ASSOC)) {
			echo "<tr>";
			echo "<td>".$table['username']."</td>";
			echo "<td>".$table['score']."</td>";
			echo "</tr>";
		}
}


function createTableGlobalParadiso(){
	global $conn;
	$hogs = "SELECT username,score FROM DA.paradiso ORDER BY score ASC limit 20";
	pg_prepare($conn, "hogs", $hogs)  or die('Could not connect:' . pg_last_error());
	$hogs = pg_execute($conn, "hogs", array())  or die('Could not connect:' . pg_last_error());
		while ($table = pg_fetch_array($hogs, null, PGSQL_ASSOC)) {
			echo "<tr>";
			echo "<td>".$table['username']."</td>";
			echo "<td>".$table['score']."</td>";	
			echo "</tr>";
		}
}



//TABLES FOR PROFILE
function createTableInferno($username){
	global $conn;
	$username = htmlspecialchars($username);
	$logs = "SELECT username,score FROM DA.inferno WHERE username = $1 ORDER BY score ASC limit 20";
	pg_prepare($conn, "logs", $logs)  or die('Could not connect:' . pg_last_error());
	$logs = pg_execute($conn, "logs", array($username))  or die('Could not connect:' . pg_last_error());
		while ($table = pg_fetch_array($logs, null, PGSQL_ASSOC)) {
			echo "<tr>";
			echo "<td>".$table['score']."</td>";
			echo "</tr>";
		}
}



function createTablePurgatorio($username){
	global $conn;
	$username = htmlspecialchars($username);
	$dogs = "SELECT username,score FROM DA.purgatorio WHERE username = $1 ORDER BY score ASC limit 20";
	pg_prepare($conn, "dogs", $dogs)  or die('1Could not connect:' . pg_last_error());
	$dogs = pg_execute($conn, "dogs", array($username))  or die('2Could not connect:' . pg_last_error());
		while ($table = pg_fetch_array($dogs, null, PGSQL_ASSOC)) {
			echo "<tr>";
			echo "<td>".$table['score']."</td>";
			echo "</tr>";
		}
}


function createTableParadiso($username){
	global $conn;
	$username = htmlspecialchars($username);
	$hogs = "SELECT username,score FROM DA.paradiso WHERE username = $1 ORDER BY score ASC limit 20";
	pg_prepare($conn, "hogs", $hogs)  or die('Could not connect:' . pg_last_error());
	$hogs = pg_execute($conn, "hogs", array($username))  or die('Could not connect:' . pg_last_error());
		while ($table = pg_fetch_array($hogs, null, PGSQL_ASSOC)) {
			echo "<tr>";
			echo "<td>".$table['score']."</td>";	
			echo "</tr>";
		}
}


function HTTPSCheck(){
	if($_SERVER['SERVER_PORT'] !== 443 &&(empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === 'off')) {	
		//redirects the user if they arent using HTTPS
		header('Location: https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
		exit;
	}
}

function findUsername($username){
		$query = 'SELECT * FROM DA.authentication WHERE username = $1';
		pg_prepare($conn, "check", $query);
		$result = pg_execute($conn, "check", array($username));
		$result = pg_fetch_array($result, null, PGSQL_ASSOC);
		return $result;
}

?>
