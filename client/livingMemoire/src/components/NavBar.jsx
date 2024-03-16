import React, { useState } from 'react';
import '../styles/navbar.css'

const NavBar = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleItemClick = (index) => {
        if (items[index].onClick) {
            items[index].onClick();
        }
        setActiveIndex(index); // Update the active index
    };

    return (
        <div className='nav-container'>
            <nav className="border-b mb-4">
                <ul className="nav-items flex space-x-6 p-4"> {/* Added list-none class */}
                    {items.map((item, index) => (
                        <NavItem
                            key={index}
                            label={item.label}
                            onClick={() => handleItemClick(index)}
                            href={item.href}
                            isActive={index === activeIndex} // Pass isActive prop
                        />
                    ))}
                </ul>
            </nav>
            <div className='nav-underline'></div>
        </div>
    );
};

const NavItem = ({ label, onClick, href, isActive }) => {
    const handleClick = () => {
        onClick(); // Call the onClick function passed from NavBar
    };

    return (
        <li style={{width: '90vw'}}>
            <a
                href={href}
                className={`nav-item-content ${isActive ? 'active' : ''}`}
                onClick={handleClick}
            >
                {label}
            </a>
        </li>
    );
};

export default NavBar;
