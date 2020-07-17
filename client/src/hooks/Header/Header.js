import React from "react";
import { Link } from 'react-router-dom';

import './Header.css';

export const Header = () => {
    return (

<div>  

    <nav id="navigation">
        <h1 href="#" className="logo">
        <li><Link to="/">Worldpal </Link></li>
        </h1>
      </nav>
     
</div>

    );
};
export default Header;