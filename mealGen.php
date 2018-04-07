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

$result = mysqli_query($conn, $query);
while($row = mysqli_fetch_assoc($result)){
    $result = json_encode($row);
}

print_r($result);

//things to print: 
//choice num
//recipe id
//ingredients
//steps
//step num
//nutrition
//
?>















<?php
//lookup recipes - burgers


// require __DIR__ . '/vendor/autoload.php';
// use RapidApi\RapidApiConnect;
// $rapid = new RapidApiConnect('ding_5abd42cae4b084deb4eac1cd', '/connect/auth/ding_5abd42cae4b084deb4eac1cd');
// Unirest\Request::verifyPeer(false);
// $response = Unirest\Request::get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?offset=0&diet=vegetarian&number=10&query=burger&excludeIngredients=coconut&type=main+course",
//   array(
//     "X-Mashape-Key" => "ctPBKJeb9MmshN8R3JwGbc9RxXhgp1lBAx0jsnYrEYZq29XdRS",
//     "X-Mashape-Host" => 'spoonacular-recipe-food-nutrition-v1.p.mashape.com'
//   )
// );

// $id = json_decode($response->raw_body)->results[0]->id;
// ?>





// <?php
// //lookup recipes by ID
// require __DIR__ . '/vendor/autoload.php';
// // use RapidApi\RapidApiConnect;
// $rapid = new RapidApiConnect('ding_5abd42cae4b084deb4eac1cd', '/connect/auth/ding_5abd42cae4b084deb4eac1cd');
// Unirest\Request::verifyPeer(false);
// // $id = '492923';
// $response = Unirest\Request::get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/".$id."/information?includeNutrition=true",
//   array(
//     "X-Mashape-Key" => "ctPBKJeb9MmshN8R3JwGbc9RxXhgp1lBAx0jsnYrEYZq29XdRS",
//     "X-Mashape-Host" => "spoonacular-recipe-food-nutrition-v1.p.mashape.com"
//   )
// );
// $returnedItems = json_decode($response->raw_body, true);

// $name = $returnedItems['title'];
// $picSrc = $returnedItems['image'];
// $unparsedIngredients = $returnedItems['extendedIngredients'];
// $ingredlength = count($unparsedIngredients);
// $ingredientsArray=Array();
// print($name);
// print($picSrc);
// print('Ingredients: ');
// for($i = 0; $i<$ingredlength; $i++){
  
//   print($unparsedIngredients[$i]['amount']. $unparsedIngredients[$i]['unit'].' '. $unparsedIngredients[$i]['name']);
//   ?><br><?php
//   // $ingredientsArray[] = $unparsedIngredients[$i]['amount']. $unparsedIngredients[$i]['unit'].' '. $unparsedIngredients[$i]['name'];
// }
// $encoded = json_encode($ingredientsArray);

// $unparsedSteps = $returnedItems['analyzedInstructions'][0]['steps'];
// $stepsLength = count($unparsedSteps);
// for($x=0; $x<$stepsLength; $x++){
//   print('Step '.$unparsedSteps[$x]['number'].': '.$unparsedSteps[$x]['step']);
//   ?><br><?php
// }

// ?><br><?php

// //nutrition
// $response = Unirest\Request::get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/".$id."/nutritionWidget",
//   array(
//     "X-Mashape-Key" => "ctPBKJeb9MmshN8R3JwGbc9RxXhgp1lBAx0jsnYrEYZq29XdRS",
//     "X-Mashape-Host" => "spoonacular-recipe-food-nutrition-v1.p.mashape.com"
//   )
// );

// print_r($response->raw_body);

?>
