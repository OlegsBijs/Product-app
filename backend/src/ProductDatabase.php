<?php

require_once 'AbstractProduct.php';
require_once 'DVD.php';
require_once 'Book.php';
require_once 'Furniture.php';

class ProductDatabase {
    private $conn;
    private $productTypeMap;

    public function __construct($servername, $username, $password, $dbname) {
        $this->conn = new mysqli($servername, $username, $password, $dbname);
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }

        // Map product types to their corresponding classes
        $this->productTypeMap = [
            'DVD' => 'DVD',
            'Book' => 'Book',
            'Furniture' => 'Furniture'
        ];
    }

    public function getProducts() {
        $sql = "SELECT * FROM products";
        $result = $this->conn->query($sql);
        $products = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $product = $this->createProductFromRow($row);
                if ($product !== null) {
                    $products[] = [
                        'sku' => $product->getSku(),
                        'name' => $product->getName(),
                        'price' => $product->getPrice(),
                        'product_type' => $product->getProductType(),
                        'attribute' => $product->getAttribute(),
                        'attribute_label' => $product->getAttributeLabel()
                    ];
                }
            }
        }
        return $products;
    }

    public function addProduct($product) {
        // Check if SKU already exists
        $sku = $product->getSku();
        $checkSku = $this->conn->prepare("SELECT id FROM products WHERE sku = ?");
        $checkSku->bind_param("s", $sku);
        $checkSku->execute();
        $checkSku->store_result();
    
        if ($checkSku->num_rows > 0) {
            return "Error: SKU already exists";
        }
    
        $sql = "INSERT INTO products (sku, name, price, product_type, attribute) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("ssdss", $sku, $product->getName(), $product->getPrice(), $product->getProductType(), $product->getAttribute());
    
        if ($stmt->execute()) {
            return "New product created successfully";
        } else {
            return "Error: " . $stmt->error;
        }
    }

    public function deleteProducts($skus) {
        if (is_array($skus) && count($skus) > 0) {
            $placeholders = implode(',', array_fill(0, count($skus), '?'));
            $types = str_repeat('s', count($skus));
            $stmt = $this->conn->prepare("DELETE FROM products WHERE sku IN ($placeholders)");
            $stmt->bind_param($types, ...array_values($skus));

            if ($stmt->execute()) {
                return "Products deleted successfully";
            } else {
                return "Error: " . $stmt->error;
            }
        }
        return "Error: No SKUs provided for deletion";
    }

    public function close() {
        $this->conn->close();
    }

    private function createProductFromRow($row) {
        $productClass = $this->productTypeMap[$row['product_type']] ?? null;
        if ($productClass && class_exists($productClass)) {
            return new $productClass($row['sku'], $row['name'], $row['price'], $row['attribute']);
        }
        return null;
    }
}
?>
