<?php

function strip_zeros_from_date( $marked_string="" ) {
  // first remove the marked zeros
  $no_zeros = str_replace('*0', '', $marked_string);
  // then remove any remaining marks
  $cleaned_string = str_replace('*', '', $no_zeros);
  return $cleaned_string;
}

function redirect_to( $location = NULL ) {
  if ($location != NULL) {
    header("Location: {$location}");
    exit;
  }
}

function output_message($message="") {
  if (!empty($message)) { 
    return "<p class=\"message\">{$message}</p>";
  } else {
    return "";
  }
}

// finds the class file and includes it you forget to include it
function __autoload($class_name) {
	$class_name = strtolower($class_name); // turns the class name into lowercase
	$path = LIB_PATH.DS."{$class_name}.php"; // define a path by calling the file that includes the class 
	if(file_exists($path)) {
		require_once($path);
	} else {
		die("The file {$path} was not found");
	}
}

function datetime_to_text($datetime="") {
	$unixtimestamp = strtotime($datetime);
	return strftime("%I:%M %p", $unixtimestamp);
}

function datetime_to_year($datetime="") {
	$unixtimestamp = strtotime($datetime);
	return strftime("%Y", $unixtimestamp);
}

function datetime_to_month($datetime="") {
	$unixtimestamp = strtotime($datetime);
	return strftime("%B", $unixtimestamp);
}

function datetime_to_day($datetime="") {
	$unixtimestamp = strtotime($datetime);
	return strftime("%d", $unixtimestamp);
}
function convert( $date = " " ) {
	$old_date = strtotime($date);
	$new_date = strftime("%m/%d/%Y", $old_date);
	return $new_date;
}

function dateDiff($dformat, $endDate, $beginDate) {
	$endDate = convert($endDate);
	$beginDate = convert($beginDate);
    $date_parts1 = explode($dformat, $beginDate);
    $date_parts2 = explode($dformat, $endDate);
    $start_date = gregoriantojd($date_parts1[0], $date_parts1[1], $date_parts1[2]);
    $end_date = gregoriantojd($date_parts2[0], $date_parts2[1], $date_parts2[2]);
    return $end_date - $start_date;
}

?>