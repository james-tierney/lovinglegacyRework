import React, { useState } from 'react';

const TabbedNavigation = ({ defaultActiveLink, components }) => {
  const [activeLink, setActiveLink] = useState(defaultActiveLink);

  const handleLinkClick = (link, event) => {
    event.preventDefault();
    setActiveLink(link);
  };

  return (
    <div className="flex justify-around text-sm text-gray-600 border-t pt-2">
      {Object.keys(components).map((link) => (
        <a
          key={link}
          href="#"
          className={`footer-links ${activeLink === link ? 'active' : ''}`}
          onClick={(event) => handleLinkClick(link, event)}
        >
          {link.charAt(0).toUpperCase() + link.slice(1)}
        </a>
      ))}
      <div>
        {/* Render appropriate component based on the active link */}
        {components[activeLink]}
      </div>
    </div>
  );
};

export default TabbedNavigation;
