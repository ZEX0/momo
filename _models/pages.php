<?php
class page{
    
    public $id;
    public $title;
    public $created;
    public $userid;
	public $lastmodified;
	public $slug;
	public $content;
	public $publish;

    

	 public function add(){
		 global $dbh;//3lshan n3arf dbh f function dee use global
		 $sql = 'INSERT INTO pages SET userid = "'.$this->userid.'" ,title= "'.$this->title.'" ,content= "'.$this->content.'" ,created="'.$this->created.'" ,lastmodified="'.$this->lastmodified.'" ,slug="'.$this->slug.'" ,publish="'.$this->publish.'"';
		$dbh->exec($sql); //$affrows = $dbh=exec($sql) === false ? 'yes' :'no' ;
		 }
	
}