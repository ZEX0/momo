<?php
class database{

	private static $dbh;//static = value fe past
	
	private function __construct(){}
	
	public static function getinistatnce(){ //leh static 3lshan mesh ha2adr a3mel obj gded 3lshan construct private f bna3mloh static 3shan nestad3ea 3latol
		if(self::$dbh === null){
		 self::$dbh = new PDO('mysql://localhost=' . DB_HOST . ';dbname=' .DB_NAME, DB_USER , DB_PASS );
			}
			return self::$dbh;
		}
	}
?>