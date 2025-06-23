import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const HamburgerMenu = ({ toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    toggleSidebar(); // Callback to toggle sidebar
  };

  return (
    <button
      className="text-white p-2 focus:outline-none z-50 md:hidden"
      onClick={handleClick}
    >
      {isOpen ? <X size={28} /> : <Menu size={28} />}
    </button>
  );
};

export default HamburgerMenu;
