<?php
require_once 'mysql_connect.php';
$_POST['user_id'] = 5;
$_POST['recipe_ids'] = [4562, 5872];

$user_id = $_POST['user_id'];

if(!is_numeric($user_id)){
    echo 'Invalid user id';
} else {
    $stmt = $myconn->prepare("SELECT `status`FROM `users` WHERE `id` = ?");
    $stmt->bind_param('i', $user_id);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($status);
    if($stmt->num_rows > 0) {
        if($stmt->fetch()){
            if($status === 'banned'){
                echo "You have been banned";
            } else {
                echo "You are success";
            }
        }
    } else {
        echo "Invalid user id";
    }
    $stmt->close();
}

?>