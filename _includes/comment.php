<?php
require_once(LIB_PATH.DS."database.php");
class Comment {
	
	public $id;
	public $created;
	public $title;
	public $author;
	public $body;
	public $rateup;
	public $ratedown;
	protected static $table_name = "comments";
	protected static $db_fields = array('id', 'created', 'title', 'author', 'body', 'rateup', 'ratedown');
	protected static $class_name = "Comment";
	
	public static function make( $author = "Anonymous", $title = "Review", $body = "" ) {
		if(!empty($author) && !empty($body)) {
			$comment = new self();
			$comment->author = $author;
			$comment->title = $title;
			$comment->created = strftime("%Y/%m/%d %H:%M:%S", time());
			$comment->body = $body;
			$keywords = array("tramadol", "insert", "update", "delete", "http:");
			$errors = array();
			foreach($keywords as $keyword) {
				if (preg_match("/{$keyword}/i", "{$body}")) {
					$errors[] = $keyword;
				} elseif (preg_match("/{$keyword}/i", "{$author}")) {
					$errors[] = $keyword;
				}
			}
			if(empty($errors)) {
				return $comment;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	
	public static function count_all() {
		global $database;
		$sql = "SELECT COUNT(*) FROM " . self::$table_name;
		$result_set = $database->query($sql);
		$row = $database->fetch_array($result_set);
		return array_shift($row);
	}
	
	public static function voteup($id, $rate) {
		global $database;
		$sql = "UPDATE " . self::$table_name . " SET rateup = '{$rate}' WHERE id = '{$id}'";
		if($database->query($sql)) {
			return true;
		}
	}
	
	public static function votedown($id, $rate) {
		global $database;
		$sql = "UPDATE " . self::$table_name . " SET ratedown = '{$rate}' WHERE id = '{$id}'";
		if($database->query($sql)) {
			return true;
		}
	}
	
	public function mailto($email) {
		$to = "info@massage-professionals.com";
		$header = "From: {$this->author} <{$email}>";
		$subject = "You have a new comment";
		$time = strftime("%I:%M %p", $this->created);
		$message = "You have the follwoing new Comment from {$this->author} on {$time} titled {$this->title} \n";
		$message .= $this->body;
		if(mail($to, $subject, $message, $header)) {
			return true;
		}
	}
	
	public static function find_all() {
		return self::find_by_sql("SELECT * FROM " . self::$table_name);
	}
	
	public static function find_by_id( $id = 0 ) {
		global $database;
		$result_array = self::find_by_sql("SELECT * FROM " . self::$table_name . " WHERE id = " . $database->escape_value($id) . " LIMIT 1");
		return !empty($result_array) ? array_shift($result_array) : false;
	}
	
	public static function find_by_sql( $sql = "" ) {
		global $database;
		$result_set = $database->query($sql);  
		$object_array = array();
		while($row = $database->fetch_array($result_set)) {
			$object_array[] = self::instantiate($row);
		}
		return $object_array;
	}

	private static function instantiate($record) {
		// check that $record exists and is an array;
		// simple, long-form approach;
		$object = new self();
		//$object->id 				= $record['id'];
		//$object->username 		= $record['username'];
		//$object->password 		= $record['password'];
		//$object->first_name       = $record['first_name'];
		//$object->last_name 		= $record['last_name'];
		
		// more dynamic short-form approatch
		foreach($record as $attribute => $value) {
			if($object->has_attribute($attribute)) {
				$object->$attribute = $value;
			}
		}
		return $object;
	}
	
	private function has_attribute($attribute) {
		$object_vars = $this->attributes();
		return array_key_exists($attribute, $object_vars);
	}
	
	protected function attributes() {
		$attributes = array();
		foreach(self::$db_fields as $field) {
			if(property_exists($this, $field)) {
				$attributes[$field] = $this->$field;
			}
		}
		return $attributes;
	}
	
	protected function sanitized_attributes() {
		global $database;
		$clean_attributes = array();
		foreach($this->attributes() as $key => $value) {
			$clean_attributes[$key] = $database->escape_value($value);
		}
		return $clean_attributes;
	}
	
	public function save() {
		return isset($this->id) ? $this->update() : $this->create();
	}
	
	public function create() {
		global $database;
		// Don't forget your sql syntax and good habits:
		// - INSERT INTO table (key, key) VALUES ('value', 'value')
		// - single-quotes arround all the values 
		// - escape all values to prevent sql injection 
		$attributes = $this->sanitized_attributes();
		$sql  = "INSERT INTO " . self::$table_name . " (";
		$sql .= join(", ", array_keys($attributes));
		$sql .= ") VALUES ('";
		$sql .= join("', '", array_values($attributes));
		$sql .= "')";
		if($database->query($sql)) {
			$this->id = $database->insert_id();
			return true;
		} else {
			return false;
		}
	}
	
	public function update() {
		global $database;
		// Don't forget your sql syntax and good habits:
		// - UPDATE table SET key='value', key='value' WHERE CONDITION
		// - single-quotes arround all the values 
		// - escape all values to prevent sql injection 
		$attributes = $this->sanitized_attributes();
		$attribute_pairs = array();
		foreach($attributes as $attribute => $value) {
			$attribute_pairs[] = "{$attribute} = '{$value}'";
		}
		$sql  = "UPDATE " . self::$table_name . " SET ";
		$sql .= join(", ", $attribute_pairs);
		$sql .= " WHERE id = " . $database->escape_value($this->id);
		$database->query($sql);
		return ($database->affected_rows() == 1) ? true : false;
	}
	
	public function delete() {
		global $database;
		// Don't forget your sql syntax and good habits:
		// - DELETE FROM table WHERE CONDITION LIMIT 1 
		// - escape all values to prevent sql injection 
		// - Use LIMIT 1
		$sql  = "DELETE FROM " . self::$table_name;
		$sql .= " WHERE id = " . $database->escape_value($this->id);
		$sql .= " LIMIT 1";
		$database->query($sql);
		return ($database->affected_rows() == 1) ? true : false;
	}
}
?>