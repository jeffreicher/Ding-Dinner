<?php
require_once 'mysql_connect.php';

/*header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, 
    X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");*/

$_POST['user_id'] = 33;
$_POST['recipe_ids'] = [547899, 525527];

$recipe_count = count($_POST['recipe_ids']);

//Test to see if the $user_id is an integer
if(!is_int($_POST['user_id'])){
    die('User ID is invalid');
}

//First we will do a SELECT query to see if the user exists in our user table
$user_id = $_POST['user_id'];

//Prepare statement for the SELECT query
if(!($stmt = $myconn->prepare("SELECT `status` FROM `users` WHERE `id` = ?"))){
    die("Prepared failed: (" . $myconn->errno . ") " . $myconn->error);
}

//Bind statement for the SELECT query
if(!$stmt->bind_param('i', $user_id)){
    die("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error);
}

//Execute the prepared statement
if(!$stmt->execute()){
    die("Execute failed: (" . $stmt->errno . ") " . $stmt->error);
}

$stmt->store_result();
$stmt->bind_result($status);
if($stmt->num_rows > 0) {
    if($stmt->fetch()){
        //Test to see if the user has a banned status
        if($status === 'banned'){
            die("You have been banned");
        }

        //Prepare statement to delete any possible allergy rows currently in the table. We will rebuild after.
        if(!($stmt = $myconn->prepare("DELETE FROM `user_choices` WHERE `user_id` = ?"))){
            die("Prepared failed: (" . $myconn->errno . ") " . $myconn->error);
        }

        //Bind statement for the DELETE query
        if(!$stmt->bind_param('i', $user_id)){
            die("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error);
        }

        //Execute the delete statement
        if(!$stmt->execute()){
            die("Execute failed: (" . $stmt->errno . ") " . $stmt->error);
        } 
        
        $stmt->close();

        //Test the recipes to be added to see if they exist in our database, if they do add them to the meal plan.
        //Prepare statement for the SELECT statement that will happen in the loop.
        if(!($stmt = $myconn->prepare("SELECT `recipe_id` FROM `recipe_database` WHERE `recipe_id` = ?"))){
            die("Prepared failed: (" . $myconn->errno . ") " . $myconn->error);
        }

        //Bind statement for the SELECT query
        if(!$stmt->bind_param('i', $testRecipeID)){
            die("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error);
        }

        //Prepare statement for the INSERT query into recipes
        if(!($stmtAdd = $myconn->prepare("INSERT INTO `user_choices`(`user_id`,`choice_num`, `recipe_id`) VALUES (?, ?, ?)"))){
            die("Prepared failed: (" . $myconn->errno . ") " . $myconn->error);
        }
        
        //Bind statement for the INSERT query
        if(!$stmtAdd->bind_param('iii', $user_id, $loop_count, $testRecipeID)){
            die("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error);
        }

        for ($loop_count = 0; $loop_count < $recipe_count; $loop_count++){
            $testRecipeID = $_POST['recipe_ids'][$loop_count];
        
            //Execute the SELECT statement
            if(!$stmt->execute()){
                die("Execute failed: (" . $stmt->errno . ") " . $stmt->error);
            }
            
            $stmt->store_result();
            
            //If the recipe was found in our recipe database, we want to now add it into the meal plan database
            if($stmt->num_rows > 0){
                //Execute the INSERT statement
                $stmtAdd->execute();
                if($stmtAdd->affected_rows === 0) die('Meal plan row failed to add');
            } else {
                die('Recipe ID is not in the database');
            }                                      
        }
        echo 'Success';
    }      
} else {
    die('Not a valid user');
}

?>