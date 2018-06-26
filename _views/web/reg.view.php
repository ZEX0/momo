<?php 
if(isset($_POST['register'])){
	$new = new user();
	$new->username = $_POST['username'];
	$new->password = $_POST['password'];
	$new->email= $_POST['email'];
	$new->gender= $_POST['gender'];
	$cpass = $_POST['cpassword'];
	$cemail = $_POST['cemail'];
	$data = user::check($new->username);
	if ($data === true){echo "error name";}
	else if($cpass !== $new->password ){echo "error pass";}
	
	else{
		$sault=88;
		$new->status = 2;//not activite 
		$new->activtion= md5($new->username.$sault);//massege activate;
		$new->privilage = 2;
		$new->password =md5($new->password.zex);
		if(!$new->add()){
			$massege = 'copy link' .HOST_NAME . '?view=activate&c='.$new->activtion.'';//host name puts http:// so we cant use all time if we wanna user to press link or go to location(header('')) ...  here file_exists(APP_PATH.'_css'. DS .$css) we cant use HOST_NAME cause <base> b red mn HOST NAME FKA2nak bt2lo read HOST_NAME ely fe HOST_NAME daa
			mail($new->email,'thanx for reg',$massege);
			echo $massege;
			}}
}
?>
<div id="pageBody">
<h1>REGISTERTION</h1>
<form method="post" enctype="multipart/form-data">
<table>
<tr>
<td>
<label style="text-align:center; font-size:36px;" for="username">NAME:</label>
</td>
</tr>
<tr>
<td>
<input  style=" background-color:#CCC;width:100%;" type="text" required="required" id="username" name="username" >
</td>
</tr>


<tr>
<td>
<label style="text-align:center; font-size:36px;" for="password">password:</label>
</td>
</tr>
<tr>
<td>
<input  style="background-color:#CCC; width:100%;" type="password" required="required" id="password" name="password">
</td>
</tr>

<tr>
<td>
<label style="text-align:center; font-size:36px;" for="cpassword">password:</label>
</td>
</tr>
<tr>
<td>
<input  style="background-color:#CCC; width:100%;" type="password" required="required" id="cpassword" name="cpassword">
</td>
</tr>

<tr>
<td>
<label style="text-align:center; font-size:36px;" for="email">email:</label>
</td>
</tr>
<tr>
<td>
<input  style="background-color:#CCC; width:100%;" type="email" required="required" id="email" name="email">
</td>
</tr>

<tr>
<td>
<label style="text-align:center; font-size:36px;" for="cemail">confirm email:</label>
</td>
</tr>
<tr>
<td>
<input  style="background-color:#CCC; width:100%;" type="email" required="required" id="cemail" name="cemail">
</td>
</tr>


<tr>
<td>
<label style="text-align:center; font-size:36px;" >GENDER:</label>
</td>
</tr>
<tr>
<td>
<label style="text-align:left; font-size:36px;" for="MALE"><input value="1"  style="background-color:#CCC; width:100%;" type="radio" id="male" name="gender">MALE</label>
</td>
<td>
<label style="text-align:left; font-size:36px;" for="FEMALE"><input value="2"  style="background-color:#CCC; width:100%;" type="radio" id="female" name="female">FEMALE</label>
</td>
</tr>
<tr><td><input style="width:80px; height:60px;" type="submit" name="register" id="register" value="register"></td></tr>

</table>
</form>
</div>