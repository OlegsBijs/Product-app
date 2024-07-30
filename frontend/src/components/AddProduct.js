import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { productTypes } from '../ProductTypeConfig';
import '../App.css';

const AddProduct = () => {
    const [sku, setSku] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [productType, setProductType] = useState('DVD');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [length, setLength] = useState('');
    const [attributeValue, setAttributeValue] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (productType === 'Furniture') {
            setAttributeValue(`${height}x${width}x${length}`);
        } else {
            setHeight('');
            setWidth('');
            setLength('');
            setAttributeValue('');
        }
    }, [height, width, length, productType]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!sku || !name || !price || !productType) {
            setError('Please submit required data');
            return;
        }

        if (productType === 'Furniture') {
            if (!height || !width || !length) {
                setError('Please submit required data');
                return;
            }
            setAttributeValue(`${height}x${width}x${length}`);
        } else {
            if (!attributeValue) {
                setError('Please submit required data');
                return;
            }
        }

        if (isNaN(price)) {
            setError('Price must be a number');
            return;
        }

        if (productType !== 'Furniture' && isNaN(attributeValue)) {
            setError('Please provide data of indicated type');
            return;
        }

        const formData = new FormData();
        formData.append('sku', sku);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('product_type', productType);
        formData.append('attribute', attributeValue);

        fetch('http://localhost:80/Products.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text())
        .then(data => {
            if (data.includes('Error')) {
                setError(data);
            } else {
                navigate('/');
            }
        })
        .catch(error => {
            console.error('Error adding product:', error);
            setError('Failed to add product');
        });
    };

    const handleCancel = () => {
        navigate('/');
    };

    const productConfig = productTypes[productType] || {};

    return (
        <div className="container">
            <Header title="Add Product" buttons={{ save: handleSubmit, cancel: handleCancel }} />
            <form onSubmit={handleSubmit} id="product_form" className="form-container">
                <div className="form-group">
                    <label htmlFor="sku">SKU:</label>
                    <input
                        type="text"
                        value={sku}
                        id="sku"
                        onChange={e => setSku(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        value={name}
                        id="name"
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price ($):</label>
                    <input
                        type="number"
                        value={price}
                        id="price"
                        onChange={e => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productType">Product Type:</label>
                    <select
                        value={productType}
                        id="productType"
                        onChange={e => setProductType(e.target.value)}
                        required
                    >
                        {Object.keys(productTypes).map(type => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                {productType && (
                    <>
                        <label htmlFor={productType === 'DVD' ? 'size' : productType === 'Book' ? 'weight' : ''}>
                            {productConfig.attributeLabel}:
                        </label>
                        {productType === 'Furniture' ? (
                            <>
                                <div className="form-group">
                                    <label htmlFor="height">Height:</label>
                                    <input
                                        type="text"
                                        placeholder="Height"
                                        value={height}
                                        id="height"
                                        onChange={e => setHeight(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="width">Width:</label>
                                    <input
                                        type="text"
                                        placeholder="Width"
                                        value={width}
                                        id="width"
                                        onChange={e => setWidth(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="length">Length:</label>
                                    <input
                                        type="text"
                                        placeholder="Length"
                                        value={length}
                                        id="length"
                                        onChange={e => setLength(e.target.value)}
                                        required
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder={productConfig.attributePlaceholder}
                                    value={attributeValue}
                                    id={productType === 'DVD' ? 'size' : productType === 'Book' ? 'weight' : ''}
                                    onChange={e => setAttributeValue(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                        <div className="description">{productConfig.description}</div>
                    </>
                )}
                {error && <div className="error">{error}</div>}
            </form>
            <Footer />
        </div>
    );
};

export default AddProduct;
