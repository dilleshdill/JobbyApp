
import React, { useState,useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const Login = () =>{
    const [username, setUsername] = useState('rahul');
    const [password, setPassword] = useState('rahul@2021');
    const [notFound, setNotFound] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const jwtToken = Cookies.get('jwt_token');
        if (jwtToken) {
          navigate('/'); 
        }
      }, [navigate]);

    const onSubmitSucess = (jwtToken) =>{
        Cookies.set('jwt_token', jwtToken, { expires: 30});
        navigate('/')
    }
    const toLogin = async (event) => {
        event.preventDefault();
        const userDetails = { username, password };
        const url = 'https://apis.ccbp.in/login';
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(userDetails),
            });
            const data = await response.json();
    
            if (response.ok) {
                onSubmitSucess(data.jwt_token);
            } else {
                setNotFound(data.error_msg || 'Invalid username or password');
            }
        } catch (error) {
            setNotFound('Something went wrong. Please try again later.');
            console.log('Error during login:', error);
        }
    };
    
    return(
        <div className='flex h-screen w-screen bg-[#121212] justify-center items-center'>
            <div className="w-5/6 bg-[#272727]  sm:max-w-[350px] px-[25px] py-[25px] rounded-xl flex flex-col ">
                <img
                    src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                    alt="logo"
                    className=" w-[100px] m-auto sm:w-[130px]"
                />
                <form className="flex flex-col gap-2 text-[#EADFD5] pb-2 mt-10" onSubmit={toLogin}>
                    <label className=" w-full text-xs" >USERNAME</label>
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full text-[#EADFD5] border border-[#424E5E] bg-transparent p-1 px-2 rounded outline-none"
                        name="username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                    <label className="  w-full text-xs mt-2">PASSWORD</label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full text-[#EADFD5] border border-[#424E5E] bg-transparent p-1 px-2 rounded outline-none"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />

                    <button type="submit" className="mt-5 outline-none"
                        style={{background:"#6163EE",outline:"none"}}>
                        Login
                    </button>
                    {notFound && <p className="text-[#DF0633]">{notFound}</p>}
                </form>
            </div>
        </div>
    )
}
export default Login;