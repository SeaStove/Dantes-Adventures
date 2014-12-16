<?php
	
	//connect to da database
	include('functions.php');
	include('../secure/database.php');
	$conn = pg_connect(HOST." ".DBNAME." ".USERNAME." ".PASSWORD) or die('Could not connect:' . pg_last_error());
	
	HTTPSCheck();
	
	session_start();
	
	//Once the button is pressed...
	
	
	
	if(isset($_POST['submit'])){
	
	
		//clears out special chars
		
		$username = htmlspecialchars($_POST['username']);
		
		
		//runs the usernameAvailable function, if it returns 0 then create the user 
		
		
		if(usernameAvailable($username) == 0){
		
			//salt and hash the password
			mt_rand();
			
			$salt = sha1(mt_rand());
			
			$salt2 = sha1(mt_rand());
			
			$pw = sha1($salt . htmlspecialchars($_POST['password']));

			//create a query for both the username and password
			$user = "INSERT INTO DA.user_info(username) VALUES ($1) ";
			$auth = "INSERT INTO DA.authentication(username, password_hash, salt) VALUES($1, $2, $3)";

			//prepare
			pg_prepare($conn, "user", $user);
			pg_prepare($conn, "auth", $auth);

			//execute
			pg_execute($conn, "user", array($username));
			pg_execute($conn, "auth", array($username, $pw, $salt));

			//creates a session
			$_SESSION['username'] = $username;
		} else {
			echo '<script language="javascript">';
			echo 'alert("Username taken, try again")';
			echo '</script>';
		}
		
			
			
	}

	if(isset($_SESSION['username'])){
			header('Location: ./profile.php');
		}
	
	//function for checking username availability
	function usernameAvailable($username)
	{
		global $conn;
		$username = pg_escape_string(htmlspecialchars($username));
		$password = pg_escape_string(htmlspecialchars($password));
		$query = "SELECT * FROM DA.user_info where username LIKE $1";
		pg_prepare($conn, "check",$query);
		$result = pg_execute($conn,"check",array($username));
		if(pg_num_rows($result)==0)
			return 0;
		else
			return 1;
	}

?>

<!DOCTYPE html>
<head>
	<title>Robert Stovall Final</title>
	<link rel="stylesheet" type="text/css" href="/~rcsc77/cs2830/final/include/styles.css">
	<script src="/~rcsc77/cs2830/final/include/jquery.js"></script>
	<script src="/~rcsc77/cs2830/final/include/jquery-ui.js"></script>
	<script src="/~rcsc77/cs2830/final/include/ajax.js"></script>
</head>
<body>
	<?php include "nav.php"; ?>
	<h1>User Registration</h1>
	<div class="center">
		<form id='registration' action="<?= $_SERVER['PHP_SELF'] ?>" method='post'>
			<label for='username' >Username:</label>
			<input type='text' name='username' id='username' maxlength="50" required/> 
			<br>
			<label for='password' >Password:</label>
			<input type='password' name='password' id='password' maxlength="50" required/>
			<br>
			<br>
			<input type='submit' name='submit' value='Register' />
			<br>
		</form>
		<br>
		<form action="index.php"style="width: 200px">
		<input type="submit" value="Cancel">
		</form>
		<br>
	</div>


</body>
