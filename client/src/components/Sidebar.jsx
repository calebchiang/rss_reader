import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <nav>
                <ul>
                    <li className="subscriptions-dropdown">
                        Subscriptions
                        <ul className="dropdown-content">
                            <li><Link to="/addSubscriptions">Add Subscriptions</Link></li>
                            <li><Link to="/my-subscriptions">My Subscriptions</Link></li>
                        </ul>
                    </li>
                    {/* Include more links or sections as needed */}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
