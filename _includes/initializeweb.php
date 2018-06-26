<?php

// Directory separator is a pre-defined constant that uses the "\" for UNIX and "/" for WINDOWS
defined('DS') 		    	? null : define('DS', DIRECTORY_SEPARATOR);

// This constant defines the site root 
defined('SITE_ROOT')	    ? null : define('SITE_ROOT', DS.'homepages'.DS.'22'.DS.'d279870029'.DS.'htdocs'.DS.'dahabtech'.DS.'test'.DS.'momo');

// This constant defines the liberary path
defined('LIB_PATH') 	    ? null : define('LIB_PATH', SITE_ROOT.DS.'_includes');

// First load config file
require_once(LIB_PATH.DS.'config.php');

// First load functions so that everything after can use them
require_once(LIB_PATH.DS.'functions.php');

// First core objects
require_once(LIB_PATH.DS.'session.php');
require_once(LIB_PATH.DS.'database.php');
require_once(LIB_PATH.DS.'pagination.php');

// First load database-related classes
require_once(LIB_PATH.DS.'comment.php');

// Load Security CAPTCHA library
require_once(LIB_PATH.DS.'recaptchalib.php');
?>