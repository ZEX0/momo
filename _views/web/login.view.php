<?php 
if(isset($_POST['login'])){
	
	$name = $_POST['username'];
	$passs = $_POST['password'];
	$data = user::login($name,$passs);
	if(!$data){echo 'error';}
}

?>
<div id="pageBody">
<h1>LOGIN</h1>
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

<tr><td><input style="width:80px; height:60px;" type="submit" name="login" id="login" value="login"></td></tr>

</table>
</form>
</div>