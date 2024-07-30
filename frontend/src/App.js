import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import './App.css';

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/" element={<ProductList />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
