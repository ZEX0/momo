<?php 
if(isset($_GET['c'])){
$x = $_GET['c'];
$found = user::read("SELECT * FROM users WHERE activation='".$x."'",PDO::FETCH_CLASS,'user');
if($found){
	$found->activation='0';
	$found->status='1';
	if(!$found->add()){echo 'activated';}
	}
}
?>