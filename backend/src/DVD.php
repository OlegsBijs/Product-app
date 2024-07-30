<?php

require_once 'AbstractProduct.php';

class DVD extends AbstractProduct {
    private $size;

    public function __construct($sku, $name, $price, $size) {
        parent::__construct($sku, $name, $price, 'DVD');
        $this->size = $size;
    }

    public function getAttribute() { return $this->size; }
    public function setAttribute($size) { $this->size = $size; }

    public function getAttributeLabel() {
        return 'Size: ' . $this->size . ' MB';
    }
}
?>
