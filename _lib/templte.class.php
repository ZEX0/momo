<?php 
class Templte {
    private $css = array('main_css.css','lightbox.css');
    private $js = array('http://download.skype.com/share/skypebuttons/js/skypeCheck.js','lib/core.js','lightbox.js','scriptaculous.js','tooltip.js','backtop.js','banner.js','communities.js','effects.js','languages.js','lightbox.js','prototype.js');
    private $temp = array('header.tpl','mainmenu.tpl','banner.tpl','pagebody.tpl','footer.tpl');
    public function setcss(){
        $arr = array();
        foreach ($this->css as $css){
            if (file_exists(APP_PATH.'_css'. DS .$css)){
            $arr[] = '<link href="'.CSS_DIR.$css.'" rel="stylesheet" type="text/css" media="all" />';
        }
        }
        return implode('', $arr);
    }
    public function setjs(){
        $arr = array();
        foreach ($this->js as $js){
            
            if (file_exists(APP_PATH.'_js'. DS .$js)){
            $arr[]= '<script type="text/javascript" src="'.JS_DIR.$js.'"></script>';
            }
            
        }
        return implode('', $arr);
    }
    public function addmeta($name,$content){
        return  '<meta name="'.$name.'" content="'.$content.'" />';
    }
    public function tit($title){
    return '<title>"'.$title.'"</title>';
    }
    public function char($charname = "utf-8"){
        return '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />';
    }
    public function icon(){
        return '
<link rel="shortcut icon" href="_images/favicon.ico" type="image/x-icon">
<link rel="icon" href="_images/favicon.ico" type="image/x-icon">';
    }
    
	 public function call(){
        foreach ($this->temp as $templte){
            if (file_exists(WEB_TEMP_PATH.$templte)){
                require_once (WEB_TEMP_PATH.$templte);
            }
}
    }
	
	
	public function setuppage(){
        $this->appguard();
		$output = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd>';
        $output .= '<html xmlns="http://www.w3.org/1999/xhtml">';
        $output .='<head>';
        $output .= $this->tit('WELCOME TO MOMO SITE');
        $output .= $this->char();
        $output .= $this->addmeta('keywords','safari');
		$output .= $this->addmeta('describtion','this it');
        $output .= $this->setbase();
		$output .= $this->icon();
        $output .= $this->setcss();
        $output .= $this->setjs();
        $output .='</head>';
        echo $output;
        $this->call();

    }
	/*public function renderview(){
		if(isset($_GET['view'])){
			$view = $_GET['view'];
			if(file_exists(VIEWS_PATH.$view.'.view.php')){require_once VIEWS_PATH.$view.'.view.php';}
			else{require_once VIEWS_PATH.'404.view.php';}
			}
			else if($_GET['view']='index'){
			require_once VIEWS_PATH.$view.'.view.php';}
	
	}*/
	public function setbase(){   //b2lo elmkan el asasi el ht2ra mno howa  hostname
		echo '<base href="'.HOST_NAME.'">';}//mn 3eer elbase elsor el f cpanel mesh htshta3l lan m yagi yread h read mn elfolder w elfolder cpanel mfhosh css aw ay haga
     private function appguard(){
	 $view = (isset($_GET['view'])) ? $_GET['view'] : 'index';	
	 $page=array('reg','login','activate');
	  if(user::loggedin()){
				 if(in_array($view,$page)){
					 header('Location:'.HOST_NAME);
					 }
				 }
	 }
	
	
	
	public function renderview(){
    
    $view = (isset($_GET['view'])) ? $_GET['view'] : 'index';
    if (file_exists(WEB_VIEWS_PATH.$view.'.view.php')){
    require_once WEB_VIEWS_PATH.$view.'.view.php';
    }
    else {require_once WEB_VIEWS_PATH .'404.view.php';}
    }
}
?>