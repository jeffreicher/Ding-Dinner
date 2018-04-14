<?php
/**Get the cooking instructions for the user's meals */

require('../mysqli_connect.php');
// $recipeID = $_POST['recipe_id'];
$recipeID = 558826;

if (!($stmt = $myconn->prepare("SELECT inst.step_num, inst.step, inst.recipe_id FROM instructions AS inst WHERE inst.recipe_id = ?"))) {
    echo "Prepare failed: (" . $myconn->errno . ") " . $myconn->error;
}
if (!$stmt->bind_param("i", $recipeID)) {
    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}
if (!$stmt->execute()) {
    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
}
$instructionsResult =$stmt -> get_result();
$instructions = [];
while($row = mysqli_fetch_assoc($instructionsResult)){
    $row['step_num']=addslashes($row['step_num']);
    $row['step']=addslashes($row['step']);
    if(!is_numeric($row['recipe_id'])){
        print 'Invalid recipe ID from database';
        exit();
    };
    $instructions[]=$row;
}
$encodedInstructions = json_encode($instructions);
print_r($encodedInstructions);
?>