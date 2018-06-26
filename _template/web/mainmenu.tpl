<div id="mainMenu">
    <ul id="mainNav">
      <li id="homeNavItem"><a href="index.php" title="Momo Travel Home Page" class="active tooltipreadmore">home</a></li>
      <?php 
      $mm ='/momo/?view=cate&id=';
      $n=1;
      $data = category::read("SELECT * FROM categories",PDO::FETCH_CLASS,'category');
      if ($data !== null){
      foreach($data as $data){
	  $n++;
      echo '<li><a href="'.$mm.$data->id.'" class="tooltipreadmore" title="'.$data->title.'">'.$data->name.'</a></li>';
      }}
      ?>
      
    </ul>
  </div>