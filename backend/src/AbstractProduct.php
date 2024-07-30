<?php

abstract class AbstractProduct {
    protected $sku;
    protected $name;
    protected $price;
    protected $product_type;

    public function __construct($sku, $name, $price, $product_type) {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
        $this->product_type = $product_type;
    }

    // Getters and setters
    public function getSku() { return $this->sku; }
    public function setSku($sku) { $this->sku = $sku; }

    public function getName() { return $this->name; }
    public function setName($name) { $this->name = $name; }

    public function getPrice() { return $this->price; }
    public function setPrice($price) { $this->price = $price; }

    public function getProductType() { return $this->product_type; }
    public function setProductType($product_type) { $this->product_type = $product_type; }

    // Abstract methods
    abstract public function getAttribute();
    abstract public function setAttribute($attribute);
    abstract public function getAttributeLabel();
}
?>
