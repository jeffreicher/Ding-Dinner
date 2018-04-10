<?php
require_once 'mysql_connect.php';
$_POST['user_id'] = 9;
$_POST['recipe_ids'] = [547899, 525527];

$user_id = $_POST['user_id'];
$recipe_count = count($_POST['recipe_ids']);

if(!is_numeric($user_id)){
    echo 'Invalid user id';
} else {
    //Checks to ensure that the user exists
    $stmt = $myconn->prepare("SELECT `status` FROM `users` WHERE `id` = ?");
    $stmt->bind_param('i', $user_id);
    $stmt->execute();
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
                $stmt = $myconn->prepare("DELETE FROM `user_choices` WHERE `user_id` = ?");
                $stmt->bind_param('i', $user_id);
                $stmt->execute();
                $stmt->close();

                //Test the recipes to be added to see if they exist in our database, if they do add them to the meal plan.
                for ($loop_count = 0; $loop_count < $recipe_count; $loop_count++){
                    $stmt = $myconn->prepare("SELECT `recipe_id` FROM `recipe_database` WHERE `recipe_id` = ?");
                    $testRecipeID = $_POST['recipe_ids'][$loop_count];
                    $stmt->bind_param('i', $testRecipeID);
                    $stmt->execute();
                    $stmt->store_result();
                    //If the recipe was in the database, lets add that recipe to our meal plan table
                    if($stmt->num_rows > 0){
                        $stmt = $myconn->prepare("INSERT INTO `user_choices`(`user_id`,`choice_num`, `recipe_id`) VALUES (?, ?, ?)");
                        $stmt->bind_param('iii', $user_id, $loop_count, $testRecipeID);
                        $stmt->execute();
                        if($stmt->affected_rows === 0) exit('No rows updated');
                        $stmt->close();
                    } else {
                        exit('recipe ID is not in the database');
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

?>