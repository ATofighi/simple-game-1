<?php
session_start();
include("dbconnect.php");
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="css/main.css?ver=3" rel="stylesheet" type="text/css">
    <title>leaderboard</title>
  </head>
  <body>
    <?php

    if ($_POST['moves']) {
      if ($_SESSION['name']) {
        $name = $_SESSION['name'];
        $moves = $_POST['moves'];
        $query = "INSERT INTO records (name,moves) VALUES ('$name','$moves')";
        $result = mysqli_query($conn,$query);
        echo "<h4>".$moves." moves submited as ".$name."</h4>";
        echo "<a href='/'>Set a new record !</a>";
      }else{
        $_SESSION['moves'] = $_POST['moves'];
        echo "<form action='/leaderboard' method='post'>
          <input type='text' name='name' placeholder='name'>
          <button type='submit' name='submit'>
            Submit
          </button>
        </form>";
      }
    }elseif ($_POST['name']) {
      $_SESSION['name'] = $_POST['name'];
      $name = $_POST['name'];
      $moves = $_SESSION['moves'];
      $query = "INSERT INTO records (name,moves) VALUES ('$name','$moves')";
      $result = mysqli_query($conn,$query);
      echo "<h4>".$moves." moves submited as ".$name."</h4>";
      echo "<a href='/'>Set a new record !</a>";
    }else {
      echo "<a href='/'>Set a new record !</a>";
    }
    ?>

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Moves</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <?php
          $query="SELECT * FROM records ORDER BY moves ASC LIMIT 10";
          $result=mysqli_query($conn , $query);
          $loop = 0 ;
          if(mysqli_num_rows($result) > 0)
            while($rowData=mysqli_fetch_assoc($result)) {
              $loop++;
              echo "<tr><td>".$loop."</td><td>".$rowData['moves']."</td><td>".$rowData['name']."</td>";
            }
          for ($i=$loop+1; $i < 11; $i++) {
            echo "<tr><td>".$i."</td><td>...</td><td>...</td>";
          }
        ?>
      </tbody>
    </table>

  </body>
</html>
