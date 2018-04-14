<?php 
require('mysqli_connect.php');
$query = "SELECT count(recipe_id), recipe_id FROM `recipe-diet` GROUP BY recipe_id ";

$result = mysqli_query($myconn, $query);
$output = [];
while($row = mysqli_fetch_assoc($result)){
    $output[]=$row;
}
$count = count($output);
$repeatedRecipes = [];
for($i=0; $i<$count; $i++){
    if($output[$i]['count(recipe_id)']>1){
        $repeatedRecipes[]=$output[$i]['recipe_id'];
    }
}
print_r($repeatedRecipes);
?>