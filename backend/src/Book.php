<?php

require_once 'AbstractProduct.php';

class Book extends AbstractProduct {
    private $weight;

    public function __construct($sku, $name, $price, $weight) {
        parent::__construct($sku, $name, $price, 'Book');
        $this->weight = $weight;
    }

    public function getAttribute() { return $this->weight; }
    public function setAttribute($weight) { $this->weight = $weight; }

    public function getAttributeLabel() {
        return 'Weight: ' . $this->weight . ' Kg';
    }
}
?>
