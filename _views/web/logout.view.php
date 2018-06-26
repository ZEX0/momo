<div id="pageBody">
<?php 
if(user::loggedin){
$n = $_SESSION['user'];
$n->logout();

	}else{echo 'a7a';};
?>
</div>