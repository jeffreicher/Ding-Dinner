<?php
require_once 'mysql_connect.php';
$_POST['email'] = "mkane@something.com";

echo $_POST['email'];

$email = $_POST['email'];
$password = $_POST['password'];
$diet = $_POST['diet'];

$stmt

$query = "INSERT INTO `students` (`name`, `grade`, `course`) 
            VALUES ('$name', '$grade', '$course')";

$result = mysqli_query($conn, $query);

?>