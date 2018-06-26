<?php
$action= isset($_GET['action']) ? $_GET['action'] : null;
//if($action !== null && ($action==='edit' || $action==='delete')){echo category::control();}
if($action !== null && ($action==='add')){
	if(isset($_POST['save'])){
	$new = new category();
	$new->title = $_POST['title'];
	$new->content = $_POST['content'];
	$new->name = $_POST['name'];
	if($new->add()){header('location:'.HOST_NAME.'_cpanel/?view='.$_GET['view']);}
	else {header('location:'.HOST_NAME.'_cpanel/?view='.$_GET['view']);}}}//location bya5od url mn ba3d local host

else if($action !== null && ($action==='edit')){
	$item = isset($_GET['item']) ? intval($_GET['item']) : null ;
	$cat= category::read("SELECT * FROM categories WHERE id= $item",PDO::FETCH_CLASS,'category');
	if($cat !== null){// hna f obj rag3 mn read() ana awel mh3mel edit hihot el post fe elsfaat de mkan eld2ema
	if(isset($_POST['save'])){
	$cat->title = $_POST['title'];
	$cat->content = $_POST['content'];
	$cat->name = $_POST['name'];
	if($cat->update()){header('location:/momo/_cpanel/?view='.$_GET['view']);}
	else {header('location:/momo/_cpanel/?view='
	.$_GET['view']);}}}}
else if($action !== null && ($action==='delete')){
	$item = isset($_GET['item']) ? intval($_GET['item']) : null ;
	$cat= category::read("SELECT * FROM categories WHERE id= $item",PDO::FETCH_CLASS,'category');
	if($cat !== null){// hna f obj rag3 mn read() ana awel mh3mel edit hihot el post fe elsfaat de mkan eld2ema
	if($cat->delete())
	{header('location:/momo/_cpanel/?view='.$_GET['view']);}
	else {header('location:/momo/_cpanel/?view='
	.$_GET['view']);}}}

?>
<div id="pageBody">
<h1 style="background-color:#CCC; text-align:center; color:#000">control categories</h1>
<?php if($action !== null && ($action==='add' || $action==='edit')){?>
<form method="post" enctype="application/x-www-form-urlencoded">
<table>
<tr>
<td>
<label style="text-align:center; font-size:36px;" for="name">NAME:</label>
</td>
</tr>
<tr>
<td>
<input  style=" background-color:#CCC;width:500%;" type="text" required="required" id="name" name="name" value="<?php if(isset($cat)){echo $cat->name;} ?>">
</td>
</tr>


<tr>
<td>
<label style="text-align:center; font-size:36px;" for="title">TITLE:</label>
</td>
</tr>
<tr>
<td>
<input  style="background-color:#CCC; width:500%;" type="text" required="required" id="title" name="title" value="<?php if(isset($cat)){echo $cat->title;} ?>">
</td>
</tr>



<tr>
<td>
<label style="text-align:center; font-size:36px;" for="content">CONTENT:</label>
</td>
</tr>
<tr>
<td>
<textarea style="background-color:#CCC; width:500%; height:200px" name="content" id="content"><?php if(isset($cat)){echo $cat->content;} ?></textarea>
</td>
</tr>
<tr>
<td>
<input style="width:80px; height:60px;" type="submit" name="save" id="save" value="save">
</td>
</tr>
</table>
</form>


</div> 
<?php }else {echo category::control();}?>