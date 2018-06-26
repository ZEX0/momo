<div id="pageBody">
<?php 
/*$rr = new sett();
$f=$rr->read("SELECT * FROM sett",PDO::FETCH_CLASS,'sett');*/

	/*$a = new sett;
	$a->theme = 'assnm';
	$a->title = 'assnm';
	$a->status = 'assnm';
	$a->add();*/	
$i=1;
$mmb = sett::read("SELECT * FROM sett",PDO::FETCH_CLASS,'sett');
//print_r($mmb);
//echo $i++.'first'.$mmb->title;
foreach($mmb as $dd){echo $i++.'first'.$dd->title;}

?>
</div>