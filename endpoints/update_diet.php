<?php
require_once 'mysql_connect.php';
require_once 'helper_functions.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, 
    X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");

//Test variables for diet update
$_POST['user_id'] = 9;
$_POST['diet'] = "vegan";

//Test variables for allergy update'
$_POST['allergies'][] = 'dairy';
$_POST['allergies'][] = 'egg';
$_POST['allergies'][] = 'seafood';

//Store allergies and diets in their own file so that you can use it later.

//Retrieve diet and user_id. This might be a $_SESSION['user_id'] later
$user_id = $_POST['user_id'];

if (!dietCheck($_POST['diet'])){
    die('We do not support that diet');
} else {
    $diet = $_POST['diet'];
    $stmt = $myconn->prepare("UPDATE `users` SET `diet` = ? WHERE `id` = ?");
    $stmt->bind_param('si', $diet, $user_id);
    $stmt->execute();
    if($stmt->affected_rows === -1) exit('Error');
    $affectedRows = $stmt->affected_rows;
    $stmt->close();
}

//Delete old allergy list
$stmt = $myconn->prepare("DELETE FROM `allergy` WHERE `user_id` = ?");
$stmt->bind_param('i', $user_id);
$stmt->execute();
$stmt->close();


//Retrieve allergies and build new array out of matching types.
if(isset($_POST['allergies'])){
    $userAllergies = allergyCheck($_POST['allergies']);
    $acceptedAllergyCount = count($userAllergies);

    for($countAccepted = 0; $countAccepted < $acceptedAllergyCount; $countAccepted++){
        $stmt = $myconn->prepare("INSERT INTO `allergy`(`allergy`,`user_id`) VALUES (?, ?)");
        $stmt->bind_param('si', $userAllergies[$countAccepted], $user_id);
        $stmt->execute();
        if($stmt->affected_rows === 0) exit('No rows updated');
        $stmt->close();
    }
    echo 'Success!';
}

?>