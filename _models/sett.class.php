<?php
class sett{
    
    public $id;
    public $theme;
    public $title;
    public $status;

	 public function add(){
		 global $dbh;//3lshan n3arf dbh f function dee use global
		 $sql = 'INSERT INTO sett SET theme = "'.$this->theme.'" ,title= "'.$this->title.'" ,status= "'.$this->status.'"';
		 $dbh->exec($sql); //$affrows = $dbhexec($sql) === false ? 'yes' :'no' ;
		 }
	public function update(){
		 global $dbh;//3lshan n3arf dbh f function dee use global
		 $sql = 'UPDATE sett SET theme  = "'.$this->theme.'" ,title= "'.$this->title.'" ,status= "'.$this->status.'"WHERE id= '.$this->id.'';
		$affrows = $dbh->exec($sql) === false ? 'yes' :'no' ;
		return $affrows; }
public function delete(){
		 global $dbh;//3lshan n3arf dbh f function dee use global
		 $sql = 'DELETE FROM sett WHERE id= '.$this->id.'';
		$affrows = $dbh->exec($sql) === false ? 'yes' :'no' ;
		return $affrows; }
			public static function read($sql,$type=PDO::FETCH_ASSOC,$class= null){//why static l2n a7na mesh m7tagen n create obj a7na m7tagen elnateg  $sql  lo 3mlna static sql mesh henfa3 yndaha 5eer static zaeiah //class eli hna hwa nfswa public sett 
			global $dbh;
			$res =$dbh->query($sql);//7ott elraga3 f res//could not be converted to string
			if($res){
				if($type == PDO::FETCH_CLASS && $class !== null){$data=$res->fetchAll($type,$class);}
				else{$data=$res->fetchAll($type);}
				if(count($data)==1){$data=array_shift($data);}//bsta5lss el array
				return $data;
				}
				
			
			//print_r($res->fetchAll(PDO::FETCH_CLASS,'news'));//fetch all return res in 2 array f hstad3y function pdo::fetchassc arry assciativ			
		
		}
	
		

}

