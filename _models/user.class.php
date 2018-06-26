<?php
class user{
    
    public $id;
    public $username;
    public $password;
    public $email;
    public $gender;
    public $status;
    public $activtion;
    public $privilage;
    public $lastlogin ;
    
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
		 $sql = 'INSERT INTO users SET username = "'.$this->username.'" ,password= "'.$this->password.'" ,email= "'.$this->email.'" ,gender="'.$this->gender.'" ,status= "'.$this->status.'" ,activation= "'.$this->activtion.'" ,privilage= "'.$this->privilage.'" ,lastlogin= "'.$this->lastlogin.'"';
		  $dbh->exec($sql);
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
		 public static function check($userr){
			 $chek = self::read("SELECT * FROM users WHERE username='".$userr."'",PDO::FETCH_CLASS,'user');
			 return $chek ? true : false;}
			 
			  public static function login($user,$pass){
			 $enc = md5($pass.zex);
			 $data = self::read("SELECT * FROM users WHERE username='".$user."' AND password='".$enc."' AND status = 2",PDO::FETCH_CLASS,'user');
			 if($data){$_SESSION['loggedin'] = true;$_SESSION['loggedin'] = true;header('Location:'.HOST_NAME);}else{return false;}}
			 
			public static function loggedin(){
		return ($_SESSION['loggedin'] === true)? true : false; 
		}
		
		public static function logout(){
			unset($_SESSION['loggedin']);
			unset($_SESSION['user']);
			header('Location:'.HOST_NAME);
			}
				public function rebackobj(){
					return($_SESSION['user']);}//btrga3 session fe hay2t obj user::rebackobj()->name
	
}

			/* $dataa->lastlogin = date('Y-m-d');
			 if(!$dataa->add()){echo 'done';}}}*/
				