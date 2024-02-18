import React, { useState } from 'react';

const NavBar = ({ items }) => {
    const handleItemClick = (index) => {
        if (items[index].onClick) {
            items[index].onClick();
        }
    };

    console.log("nav bar time ")

    return (
        <nav className="border-b mb-4">
            <ul className="flex space-x-6 p-4"> {/* Added list-none class */}
                {items.map((item, index) => (
                    <NavItem key={index} label={item.label} onClick={() => handleItemClick(index)} href={item.href}>
                        
                    </NavItem>
                ))}
            </ul>
        </nav>
    );
};

const NavItem = ({ label, children, onClick, href }) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        onClick(); // Call the onClick function passed from NavBar
        setIsActive(true);
    };

    return (
        <li style={{marginRight: '25px'}}>
            <a href={href} className={`text-blue-600 hover:text-blue-800 ${isActive ? 'active' : ''}`} onClick={handleClick}>
                {label}
            </a>
            {isActive && children}
        </li>
    );
};

export default NavBar;
