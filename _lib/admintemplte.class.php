<?php 
class adminTemplte extends Templte {
   private $css = array('main_css.css','lightbox.css');
    private $js = array('http://download.skype.com/share/skypebuttons/js/skypeCheck.js','lib/core.js','lightbox.js','scriptaculous.js','tooltip.js','backtop.js','banner.js','communities.js','effects.js','languages.js','lightbox.js','prototype.js');
    private $temp = array('header.tpl','mainmenu.tpl','pagebody.tpl');
    
    public function tit($title){
    return '<title>"'.$title.'"</title>';
    }
   
    
	 public function call(){
        foreach ($this->temp as $templte){
            if (file_exists(ADMIN_TEMP_PATH.$templte)){
                require_once (ADMIN_TEMP_PATH.$templte);
            }
}
    }
	
	
	public function setuppage(){
        $output = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd>';
        $output .= '<html xmlns="http://www.w3.org/1999/xhtml">';
        $output .='<head>';
        $output .= $this->tit('WELCOME BACK ADMIN');
        $output .= $this->char();
        $output .= $this->setbase();
		$output .= $this->icon();
        $output .= $this->setcss();
        $output .= $this->setjs();
        $output .='</head>';
        echo $output;
        $this->call();

    }


    public function renderview(){
    
    $view = (isset($_GET['view'])) ? $_GET['view'] : 'index';
    if (file_exists(ADMIN_VIEWS_PATH.$view.'.view.php')){
    require_once ADMIN_VIEWS_PATH.$view.'.view.php';
    }
    else {require_once ADMIN_VIEWS_PATH .'404.view.php';}
    }
	
}
?>