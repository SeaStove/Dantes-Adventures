<?php
	include('functions.php');
	include('../secure/database.php');
	$conn = pg_connect(HOST." ".DBNAME." ".USERNAME." ".PASSWORD) or die('Could not connect:' . pg_last_error());
	
	HTTPSCheck();	

	session_start();
	
	//Once the submit button is pushed..
	if (isset($_POST['submit'])) {
		//clears out special chars
		$username = htmlspecialchars($_POST['username']);
		//creates a query for the specific username
		$query = 'SELECT * FROM DA.authentication WHERE username = $1';
		//checks if the username is in the database
		pg_prepare($conn, "check", $query);
		$result = pg_execute($conn, "check", array($username));
		$result = pg_fetch_array($result, null, PGSQL_ASSOC);

		$pw = sha1($result['salt'] . htmlspecialchars($_POST['password']));


		//if the password hash matches..
		if ($pw == $result['password_hash']){
			//create a session
			$_SESSION['username'] = $username;
		}
		//if the password does not match the username, spit out an error message
		//change to ajax
		else{
			echo '<script language="javascript">';
			echo 'alert("Password incorrect - If you are a new user, please register.")';
			echo '</script>';
		}

		if(isset($_SESSION['username'])){
			header('Location: ./profile.php');
		}
	}
	
	//if the user is already logged into a session, redirect them

?>

<!doctype html>
<html>
<head>
	<title>Robert Stovall Final</title>
	<script src="/~rcsc77/cs2830/final/include/jquery.js"></script>
	<script src="/~rcsc77/cs2830/final/include/jquery-ui.js"></script>
	<script src="/~rcsc77/cs2830/final/include/ajax.js"></script>
	<link rel="stylesheet" type="text/css" href="/~rcsc77/cs2830/final/include/styles.css">

</head>
<body>	
	<?php include "nav.php"; ?>
	<h1>Login</h1>
	<div class="center">
		<form action="<?= $_SERVER['PHP_SELF'] ?>" method='post'>
			<label for='username' >Username:</label>
			<input type='text' name='username' id='username' required/> 
			<br>
			<label for='password' >Password:</label>
			<input type='password' name='password' id='password' required/>
			<br>
			<br>
			<input type='submit' name='submit' value='Login' />
			<br>
		</form>
		<br>
		<form action="register.php"style="width: 196px">
			<input type="submit" value="Register">
		</form>
		<br>
	</div>
	<br>
</body>
</html>
