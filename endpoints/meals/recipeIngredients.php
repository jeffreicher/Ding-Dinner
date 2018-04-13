<?php
/**Get the ingredients for the user's meals */

require('../mysqli_connect.php');
// $recipeID = $_POST['recipe_id'];
$recipeID = 558826;

if (!($stmt = $myconn->prepare("SELECT ing.ingredient, ing.amount, ing.unit_type, ing.recipe_id FROM ingredients AS ing WHERE ing.recipe_id = ?"))) {
    echo "Prepare failed: (" . $myconn->errno . ") " . $myconn->error;
}
if (!$stmt->bind_param("i", $recipeID)) {
    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}
if (!$stmt->execute()) {
    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
}
$ingredientsResult =$stmt -> get_result();
$ingredients = [];
while($row = mysqli_fetch_assoc($ingredientsResult)){
    $row['ingredient']=addslashes($row['ingredient']);
    $row['amount']=addslashes($row['amount']);
    $row['unit_type']=addslashes($row['unit_type']);
    if(!is_numeric($row['recipe_id'])){
        print 'Invalid recipe ID from database';
        exit();
    };
    $ingredients[]=$row;
}
$encodedIngredients = json_encode($ingredients);
print_r($encodedIngredients);
?>