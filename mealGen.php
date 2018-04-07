<?php
require('mysqli_conn.php');
// $userID = $_POST['userID'];
// $diets = $_POST['diet'];

// $count = $_POST['count'];
// $dairy = $_POST['diary'];
// $egg = $_POST['eggy'];
// $gluten = $_POST['gluten'];
// $peanut = $_POST['peanut'];
// $seafood = $_POST['seafood'];
// $sesame = $_POST['sesame'];
// $shellfish = $_POST['shellfish'];
// $soy = $_POST['soy'];
// $tree_nut = $_POST['tree_nut'];
// $wheat = $_POST['wheat'];
$diet = 'vegetarian';
$count = '1';
$dairy = '1';
$egg = '0';
$gluten = '1';
$peanut = '0';
$seafood = '1';
$sesame = '0';
$shellfish = '1';
$soy = '0';
$tree_nut = '1';
$wheat = '0';

$allergens = ['dairy' => $dairy, 'egg'=>$egg, 'gluten'=>$gluten, 
            'peanut'=>$peanut, 'seafood'=>$seafood, 'sesame'=> $sesame, 
            'shellfish'=>$shellfish, 'soy'=>$soy, 'tree_nut'=>$tree_nut, 'wheat'=>$wheat ];

$query = "SELECT ra.recipe_id, rd.title, rd.image  FROM `recipe-allergy` AS ra JOIN `recipe-diet` AS rd ON ra.recipe_id = rd.recipe_id WHERE ";


forEach($allergens as $key => $value){
    $query .= "ra.$key" .'='. $value .' AND ';
};
$query = substr($query, 0, -4);
$query .= " AND rd.$diet".'=1';
$query .= " LIMIT 20";
$output=[];
$result = mysqli_query($conn, $query);
while($row = mysqli_fetch_assoc($result)){
    $output[]=$row;
}


$recipeIDArray = [];
$recipeTitleArr = [];
$imageURLArr = [];

$count = count($output);
for($i = 0; $i<$count; $i++){
    $recipeIDArray[]=$output[$i]['recipe_id'];
    $recipeTitleArr[]=$output[$i]['title'];
    $imageURLArr[]=$output[$i]['image'];
};

// $query2 = "SELECT Distinct n.recipe_id, n.calories, n.protein, n.sugar, n.carbs, n.fat, n.sodium, n.servingSize, 
//             n.servingPrice, inst.step_num, inst.step, ing.ingredient, ing.amount, ing.unit_type 
//             FROM ingredients AS ing
//             JOIN instructions AS inst
//             ON ing.recipe_id=inst.recipe_id
//             JOIN nutrition AS n
//             ON ing.recipe_id=n.recipe_id WHERE ";
// forEach($recipeIDArray as $value){
//     $query2 .= "n.recipe_id" .'='. $value .' OR ';
// }
// $query2 = substr($query2, 0, -3);
// $output2=[];
// $result = mysqli_query($conn, $query2);
// while($row = mysqli_fetch_assoc($result)){
//     $output2[]=$row;
// };


$query2 = "SELECT n.calories, n.protein, n.sugar, n.carbs, n.fat, n.sodium, n.servingSize, 
            n.servingPrice, n.recipe_id
            FROM nutrition AS n
            WHERE ";
forEach($recipeIDArray as $value){
    $query2 .= "n.recipe_id" .'='. $value .' OR ';
}
$query2 = substr($query2, 0, -3);
$output2=[];
$result = mysqli_query($conn, $query2);
while($row = mysqli_fetch_assoc($result)){
    $output2[]=$row;
};


$query3 = "SELECT ing.ingredient, ing.amount, ing.unit_type, ing.recipe_id
            FROM ingredients AS ing 
            WHERE ";
forEach($recipeIDArray as $value){
    $query3 .= "ing.recipe_id" .'='. $value .' OR ';
}
$query3 = substr($query3, 0, -3);
$output3=[];
$result = mysqli_query($conn, $query3);
while($row = mysqli_fetch_assoc($result)){
    $output3[]=$row;
};


$query4 = "SELECT inst.step_num, inst.step, inst.recipe_id
            FROM instructions AS inst 
            WHERE ";
forEach($recipeIDArray as $value){
    $query4 .= "inst.recipe_id" .'='. $value .' OR ';
}
$query4 = substr($query4, 0, -3);
$output4=[];
$result = mysqli_query($conn, $query4);
while($row = mysqli_fetch_assoc($result)){
    $output4[]=$row;
};


$outputEncoded = json_encode($output);
$output2Encoded = json_encode($output2);
$output3Encoded = json_encode($output3);
$output4Encoded = json_encode($output4);
// print_r($output);
// ?><br><br><?php
// print_r($output2);
// ?><br><br><?php
// print_r($output3);
// ?><br><br><?php
print_r($output4);
?><br><br><?php
// print_r($outputEncoded);
// ?><br><br><?php
// print_r($output2Encoded);
// ?><br><br><?php
// print_r($output3Encoded);
// ?><br><br><?php
// print_r($output4Encoded);


$finalOutput = [];
for($x=0; $x<$count; $x++){
    $finalOutput[] = [];
}
$finalcount = count($finalOutput);
$instCount = count($output4);
for($y=0; $y<$finalcount; $y++){
    $instructions=[];
    $finalOutput[$y][]=$output[$y];
    $finalOutput[$y][]=$output2[$y];
    $finalOutput[$y][]=$output3[$y];
    for($z=0;$z<$instCount; $z++){
        if($output4[$z]['recipe_id']===$recipeIDArray[$y]){
            $instructions[]=$output4[$z];
        }
    }
    $finalOutput[$y][]=$instructions;
    
}
$finalOutputEncoded = json_encode($finalOutput);
print_r($finalOutputEncoded);

// echo('ID:');
// print_r($recipeIDArray);
// ?><br><?php
// echo('Title:');
// print_r($recipeTitleArr);
// ?><br><?php
// echo('Image:');
// print_r($imageURLArr);

//things to print: 
//choice num
//recipe id
//ingredients
//steps
//step num
//nutrition
//
?>
