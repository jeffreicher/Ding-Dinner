<?php
require_once 'mysql_connect.php';
require_once 'helper_functions.php';

$_POST['email'] = "machop@something.com";
$_POST['password'] = "something";
$_POST['diet'] = "vegan";

$_POST['allergies'][] = 'peanut';
$_POST['allergies'][] = 'tree nut';
$_POST['allergies'][] = 'dairy';
$_POST['allergies'][] = 'egg';
$_POST['allergies'][] = 'soy';
$_POST['allergies'][] = 'sesame';
$_POST['allergies'][] = 'gluten';
$_POST['allergies'][] = 'wheat';
$_POST['allergies'][] = 'shellfish';
$_POST['allergies'][] = 'seafood';



if (!($email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL))){
    die('Your email is invalid');
} else {
    if (!preg_match('/^[a-zA-Z0-9]{8,32}$/', $_POST['password'])){
        die('Password is not corect');
    } else {
        $password = $_POST['password'];      
        //Use the dietCheck function to see if it is an acceptable diet
        if (!dietCheck($_POST['diet'])){
            die('We do not support that diet');
        } else {
            $diet = $_POST['diet'];
            if(!($stmt = $myconn->prepare("INSERT INTO `users`(`email`, `password`, `diet`) VALUES (?, ?, ?)"))){
                die("Prepare failed: (" . $myconn->errno . ") " . $myconn->error);
            } else {
                if(!$stmt->bind_param('sss', $email, $password, $diet)){
                    die("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error);
                } else {
                    if(!$stmt->execute()){
                        die("Execute failed: (" . $stmt->errno . ") " . $stmt->error);
                    } else {
                        if($stmt->affected_rows === 0) die('No rows updated');
                        $user_id = $stmt->insert_id;
                        $stmt->close();
                    }
                }
            }
        }
    }
}

//Checks to see if has allergies and if they do uses allergyCheck function to build a new array out of verified allergies.
if(isset($_POST['allergies'])){
    $userAllergies = allergyCheck($_POST['allergies']);
    $acceptedAllergyCount = count($userAllergies);

        
    //Still need to move the prepare and bind outside. Figure out what the issue is.
    for($countAccepted = 0; $countAccepted < $acceptedAllergyCount; $countAccepted++){
        $stmt = $myconn->prepare("INSERT INTO `allergy`(`allergy`,`user_id`) VALUES (?, ?)");
        $stmt->bind_param('si', $currentAllergy, $user_id);
        $currentAllergy =  $userAllergies[$countAccepted];
        $stmt->execute();
        if($stmt->affected_rows === 0) exit('No rows updated');
        $stmt->close();
    }
    echo 'added';
}

?>