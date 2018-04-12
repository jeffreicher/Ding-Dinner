<?php
require_once 'mysql_connect.php';

/*header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, 
    X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");*/

$_POST['email'] = "mkane3@something.com";
$_POST['password'] = "password";


//Validate Email
if (!($email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL))){
    die('Your email is invalid');
}

//Validate Password
if (!preg_match('/^[a-zA-Z0-9]{8,32}$/', $_POST['password'])){
    die('Password is not corect');
}

$password = $_POST['password']; 

//Prepared statement to SELECT user with matching email and password
if(!($stmt = $myconn->prepare("SELECT `id`, `email`, `status` FROM `users` WHERE `email` = ? AND `password` = ? LIMIT 1"))){
    die("Prepare failed: (" . $myconn->errno . ") " . $myconn->error);
}

//Binding parameters for the SELECT statement
if(!$stmt->bind_param('ss', $email, $password)){
    die("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error);
}

//Execute the prepared SELECT query
if(!$stmt->execute()){
    die("Execute failed: (" . $stmt->errno . ") " . $stmt->error);
}
$stmt->store_result();

//Bind results to variables
$stmt->bind_result($user_id, $username, $status);
if($stmt->num_rows > 0) {
    if($stmt->fetch()){
        if($status === 'banned'){
            echo "You have been banned";
        } else {
            $_SESSION['logged'] = 1;
            $_SESSION['user_id'] = $user_id;
            $_SESSION['username'] = $username;
            echo 'Success';
            exit();
        }
    }
} else {
    echo "Invalid username/password combination";
}
$stmt->close();
$myconn->close();