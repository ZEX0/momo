<?php
class category{
    
    public $id;
    public $title;
    public $created;
    public $userid;
	public $cateid;
	public $name;
	public $content;
	public $publish;

    
	public function update(){
		 global $dbh;//3lshan n3arf dbh f function dee use global
		  $sql = 'UPDATE categories SET title= "'.$this->title.'" ,content= "'.$this->content.'", name="'.$this->name.'" WHERE id= '.$this->id.'';
		$dbh->exec($sql) ;
		 }
		
	 public function add(){
		 global $dbh;//3lshan n3arf dbh f function dee use global
		 $sql = 'INSERT INTO categories SET title= "'.$this->title.'" ,content= "'.$this->content.'", name="'.$this->name.'"';
		$dbh->exec($sql); //$affrows = $dbh=exec($sql) === false ? 'yes' :'no' ;
		 }
		public static function read($sql,$type=PDO::FETCH_ASSOC,$class= null){//why static l2n a7na mesh m7tagen n create obj a7na m7tagen elnateg  $sql  lo 3mlna static sql mesh henfa3 yndaha 5eer static zaeiah //class eli hna hwa nfswa public sett 
			global $dbh;
			$res =$dbh->query($sql);//7ott elraga3 f res//could not be converted to string
			if($res){
				if($type == PDO::FETCH_CLASS && $class !== null){$data=$res->fetchAll($type,$class);}
				else{$data=$res->fetchAll($type);}
				if(count($data)==1){$data=array_shift($data);}//bsta5lss el array mn array , array -> obj mdama mdelo asm elclass
				return $data;
				}}
					public static function control(){
			$a=1;
			$view = $_GET['view'];
			$edit ='/momo/_cpanel/?view='.$view.'&action=edit&item=';
			$delete ='/momo/_cpanel/?view='.$view.'&action=delete&item=';			
			$n= self::read("SELECT * FROM categories",PDO::FETCH_CLASS,'category'); 
			$table .='<a href="http://localhost/momo/_cpanel/?view=cate&action=add">ADD NEW CATEGORY</a>';
			$table .='<table style="border-color:black;">';
			$table .='<tr><th>#</th><th>catename</th><th colspan="2">control</th></tr>';
			if($n !== null)
			{if(is_object($n)){$table .= '<tr>
			<td>'.$a.'</td>
			<td>'.$n->name.'</td>
			<td><a href="'.$edit.$na->id.'">EDIT</a></td>
			<td><a href="'.$delete.$na->id.'">DELETE</a></td></tr>';}
			else {
			foreach($n as $na){
			$table .= '<tr><td>'.$a++.'</td>
			<td>'.$na->name.'</td>
			<td><a href="'.$edit.$na->id.'">EDIT</a></td>
			<td><a href="'.$delete.$na->id.'">DELETE</a></td></tr>';}}}
			else{$table .= '<tr><td colspan="4"> BIG DAM ERROR</td></tr>';}
			$table .='</table>';
			return $table; 
			}
			public function delete(){
		 global $dbh;//3lshan n3arf dbh f function dee use global
		 $sql = 'DELETE FROM categories  WHERE id= '.$this->id.'';
		 $dbh->exec($sql);
		 }
			
			
}