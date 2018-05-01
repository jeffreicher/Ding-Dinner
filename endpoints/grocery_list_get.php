<?php
//Make PHP understand the Axios call
$entityBody = file_get_contents('php://input');
$request_data = json_decode($entityBody, true);

//Start the sessions
session_id($request_data['session_ID']);
session_start();

require_once 'mysqli_connect.php';
require_once 'helper_functions.php';

//Header files for local development
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");

//Test variables for diet update
// $_SESSION['user_id'] = 31;
// $request_data['diet'] = "ketogenic";
// $request_data['allergies'] = ['peanut', 'tree nut', 'ninjas', 'shellfish'];

//Check if user ID is a valid integer. This might be a $_SESSION['user_id'] later
if(!is_int($_SESSION['user_id'])){
    die('User ID is invalid');
}