import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

const Home = () =>{
    const navigate = useNavigate()
    const gotoJobs = () =>{
        navigate('/jobs')
    }
    return(
        <div className='flex flex-col w-screen  h-screen'>
            <Header/>
            <div className="bg-[url('https://assets.ccbp.in/frontend/react-js/home-sm-bg.png')] bg-cover h-full sm:bg-[url('https://assets.ccbp.in/frontend/react-js/home-lg-bg.png')]">
                <div className="w-full p-4 h-full sm:flex sm:flex-col  sm:justify-center sm:w-[60%]" >
                    <p className="text-[30px] font-[600] text-white sm:text-[80px]">Find The Job that Fits Your Life</p>
                    <p className="text-[#C7DEE9] font-[400] pt-3 sm:font-[400] sm:text-[20px]">Millions of people are searching for jobs, salary information, company reviews. Find the job that fits your abilities and potential.</p>
                    <button onClick={gotoJobs} 
                        className="text-white mt-5 sm:w-[120px] sm:mt-15"
                        style={{background:"#6163EE",outline:"none"}}
                    >Find Jobs</button>
                </div>
            </div>
        </div>
    )
}
export default Home;