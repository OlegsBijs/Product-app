<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Initialize configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "product_db";

require_once 'src/ProductDatabase.php';

$db = new ProductDatabase($servername, $username, $password, $dbname);

// Handle OPTIONS request (for CORS preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 204 No Content");
    exit();
}

// Handle GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode($db->getProducts());
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action']) && $_POST['action'] === 'delete') {
        $skus = json_decode($_POST['skus'], true);
        echo $db->deleteProducts($skus);
    } else {
        $sku = $_POST['sku'];
        $name = $_POST['name'];
        $price = $_POST['price'];
        $product_type = $_POST['product_type'];
        $attribute = $_POST['attribute'];

        // Create product instance dynamically
        $productClass = ucfirst($product_type);
        if (class_exists($productClass)) {
            $product = new $productClass($sku, $name, $price, $attribute);
            echo $db->addProduct($product);
        } else {
            echo "Error: Invalid product type";
        }
    }
}

$db->close();
?>
