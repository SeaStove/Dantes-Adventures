<!doctype html>
<html>
<head>
	<title>Robert Stovall Final</title>
	<link rel="stylesheet" type="text/css" href="/~rcsc77/cs2830/final/include/styles.css">
	<script src="/~rcsc77/cs2830/final/include/jquery.js"></script>
	<script src="/~rcsc77/cs2830/final/include/jquery-ui.js"></script>
	<script src="/~rcsc77/cs2830/final/include/ajax.js"></script>
	<!--<link href="/~rcsc77/cs2830/final/include/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
	<link href="/~rcsc77/cs2830/final/include/bootstrap/dist/css/bootstrap-theme.min.css" rel="stylesheet">-->
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
	<script>
	function loadXMLDoc(){
		var xmlhttp;
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		  {
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)
		    {
		    document.getElementById("vidDiv").innerHTML=xmlhttp.responseText;
		    }
	}
	xmlhttp.open("GET","insp.txt",true);
	xmlhttp.send();
	}
	</script>
</head>
<body>
	<?php include 'nav.php';?>
	<!-- easier to style a canvas when its in a div -->
	<br>
	<br>	
	<div class="media">
	  <div class="media-body">
		<pre>Hi my name is Robert
This is my final project for CS2830 at Mizzou
If you would like to know more hit me up on MySpace</pre>
	  </div>
	  <a class="media-right	" href="https://github.com/robertastic">
		<img class="Pix" src="../include/robert.jpg" alt="...">
	  </a>
	</div>
	<br>
	<br>
	<button type="button" onclick="loadXMLDoc()">My Inspiration</button>
	<div id="vidDiv"></div>
	
 <!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="/~rcsc77/cs2830/final/include/bootstrap/dist/js/bootstrap.min.js"></script>-->
	

</body>
</html>
