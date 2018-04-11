<?php
require_once 'mysql_connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, 
    X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");

$_POST['user_id'] = 9;
$_POST['recipe_ids'] = [547899, 525527];

$user_id = $_POST['user_id'];
$recipe_count = count($_POST['recipe_ids']);

//Test to see if the $user_id is an integer
if(!is_int($user_id)){
    echo 'Invalid user id';
} else {
    //Checks to ensure that the user exists
    if(!($stmt = $myconn->prepare("SELECT `status` FROM `users` WHERE `id` = ?"))){
        die("Prepared failed: (" . $myconn->errno . ") " . $myconn->error);
    } else {
        if(!$stmt->bind_param('i', $user_id)){
            die("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error);
        } else {
            if(!$stmt->execute()){
                die("Execute failed: (" . $stmt->errno . ") " . $stmt->error);
            } else {
                $stmt->store_result();
                $stmt->bind_result($status);
                if($stmt->num_rows > 0) {
                    if($stmt->fetch()){
                        //Test to see if the user has a banned status
                        if($status === 'banned'){
                            echo "You have been banned";
                        //Success, we are in the database
                        } else {
                            //Delete potential meal plan in database
                            if(!($stmt = $myconn->prepare("DELETE FROM `user_choices` WHERE `user_id` = ?"))){
                                die("Prepared failed: (" . $myconn->errno . ") " . $myconn->error);
                            } else {
                                if(!$stmt->bind_param('i', $user_id)){
                                    die("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error);
                                } else {
                                    if(!$stmt->execute()){
                                        die("Execute failed: (" . $stmt->errno . ") " . $stmt->error);
                                    } else {
                                        $stmt->close();

                                        //Test the recipes to be added to see if they exist in our database, if they do add them to the meal plan.
                                        if(!($stmt = $myconn->prepare("SELECT `recipe_id` FROM `recipe_database` WHERE `recipe_id` = ?"))){
                                            die("Prepared failed: (" . $myconn->errno . ") " . $myconn->error);
                                        } else {
                                            if(!$stmt->bind_param('i', $testRecipeID)){
                                                die("Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error);
                                            } else {
                                                for ($loop_count = 0; $loop_count < $recipe_count; $loop_count++){
                                                    $testRecipeID = $_POST['recipe_ids'][$loop_count];
                                                    if(!$stmt->execute()){
                                                        die("Execute failed: (" . $stmt->errno . ") " . $stmt->error);
                                                    } else {
                                                        $stmt->store_result();
                                                        //If the recipe was in the database, lets add that recipe to our meal plan table
                                                        //Talk to Tim or Dan here to see if you should be doing the same error handling. Was unable to prepare and bind these previous to the loop. Caused an error.
                                                        if($stmt->num_rows > 0){
                                                            $stmtAdd = $myconn->prepare("INSERT INTO `user_choices`(`user_id`,`choice_num`, `recipe_id`) VALUES (?, ?, ?)");
                                                            $stmtAdd->bind_param('iii', $user_id, $loop_count, $testRecipeID);
                                                            $stmtAdd->execute();
                                                            if($stmtAdd->affected_rows === 0) die('No rows updated');
                                                            $stmtAdd->close();
                                                        } else {
                                                            die('recipe ID is not in the database');
                                                        }
                                                    }
                                                }        
                                            }   
                                        }            
                                    }
                                }               
                            } 
                        }                                
                    }
                } else {
                    echo "Invalid user id";
                    $stmt->close();
                }
                echo "Success!";
            }   
        }
    }
}

?>