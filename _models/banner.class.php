<?php
class banner{
    
    public $id;
    public $filename;
    public $title;
    public $desc;


	 public function add(){
		 global $dbh;//3lshan n3arf dbh f function dee use global
		 $sql = 'INSERT INTO banner SET filename = "'.$this->filename.'" ,title= "'.$this->title.'" ,desc= "'.$this->desc.'"';
		$dbh->exec($sql); //$affrows = $dbh=exec($sql) === false ? 'yes' :'no' ;
		 }
	
}