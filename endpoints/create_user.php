<?php
require_once 'mysql_connect.php';
require_once 'helper_functions.php';

/*Iheader("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, 
    X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");*/

$_POST['email'] = "mkane36@something.com";
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


//Validate Email
if (!($email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL))){
    die('Your email is invalid');
}

//Validate Password
if (!preg_match('/^[a-zA-Z0-9]{8,32}$/', $_POST['password'])){
    die('Password is not corect');
}

$password = $_POST['password'];      
//use dietCheck function from helper_functions.php to ensure the diet is correct.
if (!dietCheck($_POST['diet'])){
    die('We do not support that diet');
}

//Prepared statement to create user
$diet = $_POST['diet'];
if(!($stmt = $myconn->prepare("INSERT INTO `users`(`email`, `password`, `diet`) VALUES (?, ?, ?)"))){
    die("Prepare failed: (" . $myconn->errno . ") " . $myconn->error);
} 

//Binding parameters to create user
if(!$stmt->bind_param('sss', $email, $password, $diet)){
    die("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error);
}

//Execute the statement
if(!$stmt->execute()){
    die("Execute failed: (" . $stmt->errno . ") " . $stmt->error);
}

//Test to see if we succesfully added the user
if($stmt->affected_rows === 0) die('No rows updated');
//Grab users id
$user_id = $stmt->insert_id;
$stmt->close();

//Checks to see if has allergies and if they do uses allergyCheck function to build a new array out of verified allergies.
if(isset($_POST['allergies'])){
    $userAllergies = allergyCheck($_POST['allergies']);
    $acceptedAllergyCount = count($userAllergies);

        
    
    //Prepare statement to insert allergy rows into user-allergy table
    if(!($stmt = $myconn->prepare("INSERT INTO `allergy`(`allergy`,`user_id`) VALUES (?, ?)"))){
        die("Prepared failed: (" . $myconn->errno . ") " . $myconn->error);
    }
    //Bind parameters for allergy and user id to be added to user-allergy table
    if(!$stmt->bind_param('si', $currentAllergy, $user_id)){
        die("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error);
    }
    //Loop through the array of possible allergies to create a row for each allergy the user has
    for($countAccepted = 0; $countAccepted < $acceptedAllergyCount; $countAccepted++){  
        $currentAllergy =  $userAllergies[$countAccepted];
        //Execute the statement
        if(!$stmt->execute()){
            die("Execute failed: (" . $stmt->errno . ") " . $stmt->error);
        }
        //Test to see if we succesfully added allergy table. Exit otherwise.
        if($stmt->affected_rows === 0) die('No rows updated');
    }
    $stmt->close();
    echo 'added';
}

?>