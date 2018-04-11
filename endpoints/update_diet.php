<?php
require_once 'mysql_connect.php';
//Test variables for diet update
$_POST['user_id'] = 9;
$_POST['diet'] = "ketogenic";

//Test variables for allergy update'
$_POST['allergies'][] = 'dairy';
$_POST['allergies'][] = 'egg';
$_POST['allergies'][] = 'seafood';

//Store allergies and diets in their own file so that you can use it later.

//Retrieve diet and user_id. This might be a $_SESSION['user_id'] later
$diet = $_POST['diet'];
$user_id = $_POST['user_id'];

if ($diet !== 'vegan' && $diet !== 'vegetarian' && $diet !== 'normal' && $diet !== 'ketogenic'){
    echo 'We do not support that diet';
} else {
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