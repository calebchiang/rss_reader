import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IoAddCircleSharp } from "react-icons/io5";
import { CiHome } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";



const Sidebar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={`fixed top-0 left-0 h-screen ${isOpen ? 'w-16' : 'w-0'} m-0 flex flex-col bg-indigo-600 text-white shadow-lg`}>
            <ExpandCollapseIcon toggleSidebar={toggleSidebar} isOpen={isOpen} />
            {isOpen && (
                <>
                    <SideBarIcon icon={<CiHome />} text="Go back to feed" path='/feed' navigate={navigate}/>
                    <SideBarIcon icon={<IoAddCircleSharp />} text="Add Subscriptions" path='/addSubscriptions' navigate={navigate}/>
                    <SideBarIcon icon={<FaRegUser />} text="Manage Subscriptions" path='/yourPath' navigate={navigate}/>
                </>
            )}
        </div>
    );
};

const SideBarIcon = ({ icon, text = 'tooltip', path, navigate }) => {
    const onClick = () => {
        if (path && navigate) {
            navigate(path);
        }
    };

    return (
        <div className="sidebar-icon group" onClick={onClick}>
            {icon}
            <span className="sidebar-tooltip group-hover:scale-100">
                {text}
            </span>
        </div>
    );
};

const ExpandCollapseIcon = ({ toggleSidebar, isOpen }) => {
    return (
        <div className={isOpen ? 'expand-icon' : 'collapse-icon'} onClick={toggleSidebar}>
            {isOpen ? <GoSidebarExpand /> : <GoSidebarCollapse />}
        </div>
    );
};

export default Sidebar;
