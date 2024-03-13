import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoAddCircleSharp } from "react-icons/io5";
import { CiHome } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";
import { FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
    const navigate = useNavigate();
    const signOut = () => {
        localStorage.removeItem('token'); // Remove the token from local storage
        navigate('/');
    };

    return (
        <div className={`fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-indigo-600 text-white shadow-lg`}>
                <>
                    <SideBarIcon icon={<CiHome />} text="Go back to feed" path='/feed' navigate={navigate}/>
                    <SideBarIcon icon={<IoAddCircleSharp />} text="Add Subscriptions" path='/addSubscriptions' navigate={navigate}/>
                    <SideBarIcon icon={<FaRegUser />} text="Manage Subscriptions" path='/manageSubscriptions' navigate={navigate}/>
                    <SideBarIcon icon={<FaSignOutAlt />} text="Sign out" onClick={signOut} path='/' navigate={navigate}/>
                </>
        </div>
    );
};

const SideBarIcon = ({ icon, text = 'tooltip', path, navigate, onClick }) => {
    const handleClick = () => {
        if (path && navigate) {
            navigate(path);
        }
        if (onClick) {
            onClick();
        }
    };

    return (
        <div className="sidebar-icon group" onClick={handleClick}>
            {icon}
            <span className="sidebar-tooltip group-hover:scale-100">
                {text}
            </span>
        </div>
    );
};
export default Sidebar;
