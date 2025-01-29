import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
const Header = () => {
    const [isShow, setIsSmallDevice] = useState(window.innerWidth <= 768);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsSmallDevice(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const removeToken = () => {
        Cookies.remove('jwt_token');
        navigate('/login');
    };

    const gotoJobs = () => {
        navigate('/jobs');
    };

    const gotoHomePage = () => {
        navigate('/');
    };

    return (
        <div className="w-full bg-[#272727] text-white ">
            {isShow ? (
                <div className="flex justify-between h-[50px]  items-center p-4">
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                        className="w-[80px]"
                        alt="logo"
                        onClick={gotoHomePage}
                    />
                    <div className='flex w-[150px] h-full items-center'>
                        <button
                            onClick={gotoHomePage}
                            style={{background:"transparent",color:"white",border:"none",outline:"none"}}
                        >
                            <AiFillHome />
                        </button>
                        <button
                            onClick={gotoJobs}
                            style={{background:"transparent",color:"white",border:"none",outline:"none",}}
                        >
                            <MdEmail />
                        </button>
                        <button
                            onClick={removeToken}
                            
                            style={{background:"transparent",color:"white",border:"none",outline:"none",}}
                        >
                            <FiLogOut />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-between h-[60px] items-center px-8 w-full">
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                        className="h-[40px]"
                        alt="logo"
                        onClick={gotoHomePage}
                    />
                    <div className="flex space-x-4 ">
                        <button
                            onClick={gotoHomePage}
                            className="text-lg bg-transparent border-none outline-none"
                            style={{background:"transparent",color:"white",border:"none",outline:"none",width:"50px",}}
                        >
                            Home
                        </button>
                        <button
                            onClick={gotoJobs}
                            className="text-lg bg-transparent border-none outline-none"
                            style={{background:"transparent",color:"white",border:"none",outline:"none",width:"130px",}}
                        >
                            Jobs
                        </button>
                    </div>
                    <button
                        onClick={removeToken}
                        className="text-lg bg-[#6163EE] px-4 py-2 rounded"
                        style={{background:"#6163EE",color:"white",border:"none",outline:"none",width:"130px",}}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
