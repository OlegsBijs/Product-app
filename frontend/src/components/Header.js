import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Header = ({ title, buttons }) => {
    const navigate = useNavigate();

    const handleButtonClick = (action, event) => {
        if (action === 'add') {
            navigate('/add-product');
        } else if (action === 'mass-delete') {
            buttons.massDelete();
        } else if (action === 'save') {
            buttons.save(event);
        } else if (action === 'cancel') {
            navigate('/');
        }
    };

    return (
        <div className="header">
            <h1>{title}</h1>
            <div className="nav">
                {buttons.add && <button onClick={(event) => handleButtonClick('add', event)}>ADD</button>}
                {buttons.massDelete && <button onClick={(event) => handleButtonClick('mass-delete', event)} id='delete-product-btn'>MASS DELETE</button>}
                {buttons.save && <button onClick={(event) => handleButtonClick('save', event)}>Save</button>}
                {buttons.cancel && <button onClick={(event) => handleButtonClick('cancel', event)}>Cancel</button>}
            </div>
        </div>
    );
};

export default Header;
