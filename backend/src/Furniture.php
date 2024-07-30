<?php

require_once 'AbstractProduct.php';

class Furniture extends AbstractProduct {
    private $dimensions;

    public function __construct($sku, $name, $price, $dimensions) {
        parent::__construct($sku, $name, $price, 'Furniture');
        $this->dimensions = $dimensions;
    }

    public function getAttribute() { return $this->dimensions; }
    public function setAttribute($dimensions) { $this->dimensions = $dimensions; }

    public function getAttributeLabel() {
        return 'Dimensions: ' . $this->dimensions;
    }
}
?>
