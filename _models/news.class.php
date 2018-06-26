<?php
class news{
    
    public $userid;
    public $title;
    public $content;
    public $created;

    
    /*public $dbfields = array('username','password','email','gender','status','activtion','privilege','lastlogin');
   
    
    public function attributes()
    {
        $string = array();     
        foreach ($this->dbfields as $field){//kol att 7tnaha f var bta3 alfileds
            if (is_int($this->$field) || is_double($this->$field)){//ay kema ya5odha $this->fildes
            $string[] = $field . " = " . $this->$field ."";
            }else {
            $string[] = $field . " = '" . $this->$field ."'";
            }
        
            }
            return implode(", ", $string);
    }

        
   
    public function add()
    {
        global $dbh;
        $sql = "INSERT INTO " . $this->tablename . " SET " . $this->attributes();
        
        $dbh->exec($sql);
    }*/
	 public function add(){
		 global $dbh;//3lshan n3arf dbh f function dee use global
		 $sql = 'INSERT INTO news SET userid = "'.$this->userid.'" ,title= "'.$this->title.'" ,content= "'.$this->content.'" ,created="'.$this->created.'"';
		$dbh->exec($sql); //$affrows = $dbh=exec($sql) === false ? 'yes' :'no' ;
		 }
	
}