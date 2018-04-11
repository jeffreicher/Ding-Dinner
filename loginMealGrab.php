<?php 
require('mysqli_conn.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, 
    X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");

// $userID=$_SESSION['user_id'];
$userID=2;
if(!is_numeric($userID)){
    print 'Invalid user ID';
    exit;
};

/**Get all the current meals for the user */
//Need to sanitize userID prior to making the query call
$recipeIDList=[];
$output=[];
$query = "SELECT recipe_id, title FROM `user_choices` WHERE `user_id`=$userID";
$result = mysqli_query($conn, $query);
while($row = mysqli_fetch_assoc($result)){
    $row['title']=addslashes($row['title']);
    $recipeID = $row['recipe_id'];
    if(!is_numeric($recipeID)){
        print 'Invalid recipe ID';
        exit;
    };
    $output[]=$row;
}

$count = count($output);
for($i = 0; $i<$count; $i++){
    $recipeIDList[]=$output[$i]['recipe_id'];
};

/**Get the nutrition information for the user's meals */

$query2 = "SELECT n.calories, n.protein, n.sugar, n.carbs, n.fat, n.sodium, n.servingSize, 
            n.servingPrice, n.recipe_id
            FROM nutrition AS n
            WHERE ";
forEach($recipeIDList as $value){
    $query2 .= "n.recipe_id" .'='. $value .' OR ';
}
$query2 = substr($query2, 0, -3);
$output2=[];
$result = mysqli_query($conn, $query2);
while($row = mysqli_fetch_assoc($result)){
    $row['calories']=addslashes($row['calories']);
    $row['protein']=addslashes($row['protein']);
    $row['sugar']=addslashes($row['sugar']);
    $row['carbs']=addslashes($row['carbs']);
    $row['fat']=addslashes($row['fat']);
    $row['sodium']=addslashes($row['sodium']);
    $row['servingSize']=addslashes($row['servingSize']);
    $row['servingPrice']=addslashes($row['servingPrice']);
    $recipeID = $row['recipe_id'];
    if(!is_numeric($recipeID)){
        print 'Invalid recipe ID';
        exit;
    };
    
    $output2[]=$row;
};

/**Get the ingredients for the user's meals */

$query3 = "SELECT ing.ingredient, ing.amount, ing.unit_type, ing.recipe_id
            FROM ingredients AS ing 
            WHERE ";
forEach($recipeIDList as $value){
    $query3 .= "ing.recipe_id" .'='. $value .' OR ';
}
$query3 = substr($query3, 0, -3);
$output3=[];
$result = mysqli_query($conn, $query3);
while($row = mysqli_fetch_assoc($result)){
    $row['ingredient']=addslashes($row['ingredient']);
    $row['amount']=addslashes($row['amount']);
    $row['unit_type']=addslashes($row['unit_type']);
    $recipeID = $row['recipe_id'];
    if(!is_numeric($recipeID)){
        print 'Invalid recipe ID';
        exit;
    };
    
    $output3[]=$row;
};

/**Get the cooking instructions for the user's meals */

$query4 = "SELECT inst.step_num, inst.step, inst.recipe_id
            FROM instructions AS inst 
            WHERE ";
forEach($recipeIDList as $value){
    $query4 .= "inst.recipe_id" .'='. $value .' OR ';
}
$query4 = substr($query4, 0, -3);
$output4=[];
$result = mysqli_query($conn, $query4);
while($row = mysqli_fetch_assoc($result)){
    $row['step_num']=addslashes($row['step_num']);
    $row['step']=addslashes($row['step']);
    $recipeID = $row['recipe_id'];
    if(!is_numeric($recipeID)){
        print 'Invalid recipe ID';
        exit;
    };
    
    $output4[]=$row;
};

/**Package all the info in a legible JSON object */

$finalOutput = [];
for($x=0; $x<$count; $x++){
    $finalOutput[] = [];
}
$finalcount = count($finalOutput);
$instCount = count($output4);
$ingrCount = count($output3);
for($y=0; $y<$finalcount; $y++){
    $instructions=[];
    $ingredients=[];
    $finalOutput[$y][]=$output[$y];
    $finalOutput[$y][]=$output2[$y];
    for($z=0;$z<$ingrCount; $z++){
        if($output3[$z]['recipe_id']===$recipeIDList[$y]){
            $ingredients[]=$output3[$z];
        }
    }
    for($z=0;$z<$instCount; $z++){
        if($output4[$z]['recipe_id']===$recipeIDList[$y]){
            $instructions[]=$output4[$z];
        }
    }
    $finalOutput[$y][]=$ingredients;
    $finalOutput[$y][]=$instructions;
    
}
$finalOutputEncoded = json_encode($finalOutput);
print_r($finalOutputEncoded);

?>