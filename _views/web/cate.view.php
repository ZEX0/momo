<div id="pageBody">
<?php 
/*$rr = new sett();
$f=$rr->read("SELECT * FROM sett",PDO::FETCH_CLASS,'sett');*/

	/*$a = new sett;
	$a->theme = 'assnm';
	$a->title = 'assnm';
	$a->status = 'assnm';
	$a->add();*/	
$dd = isset($_GET['id']) ? intval($_GET['id']) : null ;
if($dd !== null){
$data = category::read("SELECT * FROM categories WHERE id=$dd",PDO::FETCH_CLASS,'category');
echo 'name is'.$data->name.'<br>title is'.$data->title.'<br>content is'.$data->content.'';
}
?>
</div>