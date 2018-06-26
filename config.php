<?php
//open buffer
ob_start();
//open session
session_start();

//TURN ON errors
ini_set('display_errors',1);
//turn off register golbals
ini_set('register_global',0);
error_reporting(E_ALL & ~E_NOTICE & ~E_STRICT);
//define constants
define('DS',DIRECTORY_SEPARATOR);
define('APP_PATH',dirname(__FILE__).DIRECTORY_SEPARATOR); //define file paths easliy
//define domain
define('HOST_NAME', 'http://' . $_SERVER['HTTP_HOST'].'/momo/'); //when we uploaded site we should define css sources through host name
define('CSS_DIR', HOST_NAME . '/_css/');//msar motlk for internet using lazem asm elmshro3
define('JS_DIR', HOST_NAME . '/_js/');
//define database calasses 
define ('LIB_PATH', APP_PATH . '_lib' . DIRECTORY_SEPARATOR);
define ('MODELS_PATH', APP_PATH . '_models' . DIRECTORY_SEPARATOR);
define ('WEB_TEMP_PATH', APP_PATH . '_template' . DIRECTORY_SEPARATOR . 'web' .DS);
define ('ADMIN_TEMP_PATH', APP_PATH . '_template' . DIRECTORY_SEPARATOR .'cpanel'.DS);
define ('CSS_WAY', APP_PATH.'_css'. DIRECTORY_SEPARATOR );
define ('JS_WAY', APP_PATH.'_js'. DIRECTORY_SEPARATOR );
define ('WEB_VIEWS_PATH', APP_PATH.'_views'. DIRECTORY_SEPARATOR .'web'.DS);
define ('ADMIN_VIEWS_PATH', APP_PATH.'_views'. DIRECTORY_SEPARATOR.'cpanel'.DS );
//define('CSS_DIR', HOST_NAME . '_css/');
//define('JS_DIR', HOST_NAME . '_js/');
//database 
define('DB_HOST', 'localhost');
define('DB_NAME', 'momo');
define('DB_USER', 'root');
define('DB_PASS', '');
//paths php لوحده بيقرا منها الفيلات 
//open connection
//require_once('_lib\database.class.php');بدل من الشغل ده
//$dbh = Database::getinistatnce();
//$dbh1 = Database::getinistatnce();
//var_dump($dbh,$dbh1);
//setting where php can find paths
$path = get_include_path() . PATH_SEPARATOR . LIB_PATH  . PATH_SEPARATOR . MODELS_PATH ; //path separator 3shan ; , fe read path linux and windows 
set_include_path($path);//read from msar dah bdal require
function __autoload($class){
	require_once strtolower($class) . '.class.php';
	}
//open connection
$dbh = Database::getinistatnce();//bnfta7 el connectionaia w ba3den nsta5dm elkonktionaia exec tanfiez el query
//load_template
/*$zex = new User();
$zex->username = 'zeyad';
$zex->password = md5('zex');;
$zex->email = 'email';
$zex->gender = 1;
$zex->status = 2;
$zex->activtion = md5($zex->email);
$zex->privilage = 2;
$zex->lastlogin = date('H:I:s');
$zex->add();*/
//setting template 
if(preg_match("/cpanel/i",$_SERVER['REQUEST_URI']))
{$temmp = new adminTemplte();
$temmp->setuppage();}
else{$temmp = new Templte();
$temmp->setuppage();}
/*require_once(APP_PATH . '_template\header.tpl');
require_once(APP_PATH . '_template\mainmenu.tpl');
require_once(APP_PATH . '_template\banner.tpl');
require_once(APP_PATH . '_template\pagebody.tpl');
require_once(APP_PATH . '_template\footer.tpl');*/

//close buffer
ob_flush();
?>