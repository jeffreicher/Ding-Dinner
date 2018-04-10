<?php
require_once 'mysql_connect.php';
//Test variables for diet update
$_POST['user_id'] = 9;
$_POST['diet'] = "ketogenic";

//Test variables for allergy update'
$_POST['allergies'][] = 'dairy';
$_POST['allergies'][] = 'egg';
$_POST['allergies'][] = 'seafood';

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
$allergyCount = count($_POST['allergies']);

if ($allergyCount > 0){
    for($count = 0; $count < $allergyCount; $count++){
        switch ($_POST['allergies']["$count"]){
            case 'dairy':
                $userAllergies[] = 'dairy';
                break;
            case 'egg':
                $userAllergies[] = 'egg';
                break;
            case 'gluten':
                $userAllergies[] = 'gluten';
                break;
            case 'peanut':
                $userAllergies[] = 'peanut';
                break;
            case 'seafood':
                $userAllergies[] = 'seafood';
                break;
            case 'sesame':
                $userAllergies[] = 'sesame';
                break;
            case 'shellfish':
                $userAllergies[] = 'shellfish';
                break;
            case 'soy':
                $userAllergies[] = 'soy';
                break;
            case 'tree nut':
                $userAllergies[] = 'tree nut';
                break;
            case 'wheat':
                $userAllergies[] = 'wheat';
        }
    }
    $acceptedAllergyCount = count($userAllergies);

    for($countAccepted = 0; $countAccepted < $acceptedAllergyCount; $countAccepted++){
        $stmt = $myconn->prepare("INSERT INTO `allergy`(`allergy`,`user_id`) VALUES (?, ?)");
        $stmt->bind_param('si', $userAllergies[$countAccepted], $user_id);
        $stmt->execute();
        if($stmt->affected_rows === 0) exit('No rows updated');
        $stmt->close();
    }
}

?>