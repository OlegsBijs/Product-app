import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { productTypes } from '../ProductTypeConfig';
import '../App.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:80/Products.php')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleCheckboxChange = (sku) => {
        setSelectedProducts(prevSelected => {
            if (prevSelected.includes(sku)) {
                return prevSelected.filter(id => id !== sku);
            } else {
                return [...prevSelected, sku];
            }
        });
    };

    const handleMassDelete = () => {
        if (selectedProducts.length === 0) {
            alert('No products selected for deletion');
            return;
        }

        const formData = new FormData();
        formData.append('action', 'delete');
        formData.append('skus', JSON.stringify(selectedProducts));

        fetch('http://localhost:80/Products.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log("Response from server:", data);
            if (data.includes('Error')) {
                alert(data);
            } else {
                alert('Products deleted successfully');
                setProducts(products.filter(product => !selectedProducts.includes(product.sku)));
                setSelectedProducts([]);
            }
        })
        .catch(error => {
            console.error('Error deleting products:', error);
            alert('Failed to delete products');
        });
    };

    return (
        <div className="container">
            <Header title="Product List" buttons={{ add: true, massDelete: handleMassDelete }} />
            <div className='product-list'>
                {products.length === 0 ? (
                    <div className="empty-message">Product List is empty. No Product items have been added.</div>
                ) : (
                    products.map(product => (
                        <div key={product.sku} className={`product-item ${selectedProducts.includes(product.sku) ? 'red-border' : ''}`}>
                            <input 
                                type="checkbox" 
                                className='delete-checkbox'
                                onChange={() => handleCheckboxChange(product.sku)} 
                                checked={selectedProducts.includes(product.sku)} 
                            />
                            <div>{product.sku}</div>
                            <div>{product.name}</div>
                            <div>{product.price} $</div>
                            <div>{productTypes[product.product_type]?.attributeLabel.split(' ')[0]}: {product.attribute} {product.product_type === 'Book' ? 'Kg' : product.product_type === 'DVD' ? 'MB' : ''}</div>
                        </div>
                    ))
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ProductList;
