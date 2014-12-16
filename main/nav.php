<head>
    <!-- Load jQuery from Google's CDN -->
    <script src="/~rcsc77/cs2830/final/include/jquery.js"></script>
    <script src="/~rcsc77/cs2830/final/include/jquery-ui.js"></script>
  <!-- Source our javascript file with the jQUERY code -->
    <script>
	$(document).ready(
	  /* This is the function that will get executed after the DOM is fully loaded */
	  function () {
		/* Next part of code handles hovering effect and submenu appearing */
		$('.nav li').hover(
		  function () { //appearing on hover
			$('ul', this).fadeIn();
		  },
		  function () { //disappearing on hover
			$('ul', this).fadeOut();
		  }
		);
	  }
	);
	
		
	</script>
	<style>
	h1 {
	  font-family: Helvetica;
	  font-weight: 100;
	}
	body {
	  color:#333;
	  text-align:center;
	  font-family: arial;
	}

	.nav {
		margin: 0px;
		padding: 0px;
		list-style: none;
	}

	.nav li {
		float: left;
		width: 160px;
		position: relative;
	}
	li a {
		background: black;
		color: white;
		display: block;
		padding: 7px 8px;
		text-decoration: none;
		border-top: 1px solid #069;
	}
	
	.nav li a:hover {
		color: #069;
	}

	/*=== submenu ===*/

	.nav ul {
		display: none;
		position: absolute;
		margin-left: 0px;
		list-style: none;
		padding: 0px;
	}

	.nav ul li {
		width: 160px;
		float: left;
	}
	ul a {
		display: block;
		height: 15px;
		padding: 7px 8px;
		color: white;
		text-decoration: none;
		border-bottom: 1px solid #222;
	}
	.navigation {
		text-align: center;
		margin: 0 auto;
		width: 800px;
	}
	.nav ul li a:hover {
		color: #069;
	}
	</style>
    <link rel="stylesheet" href="/~rcsc77/cs2830/final/include/styles.css" />
	<h1 style="font-style: italic;">Dante's Adventures</h1>
		<center>
  	<div class="navigation">
  		<ul class="nav">
  			<li>
  				<a href="/~rcsc77/cs2830/final/main/index.php">Home</a>
  			</li>
  			<li>
  				<a href="#">Levels</a>
  				<ul>
					<li><a href="/~rcsc77/cs2830/final/main/descent.php">Tutorial</a></li>
  					<li><a href="/~rcsc77/cs2830/final/main/inferno.php">Inferno</a></li>
  					<li><a href="/~rcsc77/cs2830/final/main/purgatorio.php">Purgatorio</a></li>
  					<li><a href="/~rcsc77/cs2830/final/main/paradiso.php">Paradiso</a></li>
  				</ul>
  			</li>
  			<li>
  				<a href="scoreboard.php">Scoreboard</a>
  			</li>
			<li>
				<?php
					session_start();
					if(isset($_SESSION['username'])){
						echo "<a href='/~rcsc77/cs2830/final/main/profile.php'>Profile</a>";
					}else{
						echo "<a href='/~rcsc77/cs2830/final/main/login.php'>Login</a>";
					}
				?>
			</li>
			<li>
				<a href="about.php">About</a>
			</li>
  		</ul>
  	</div>
	<br>
