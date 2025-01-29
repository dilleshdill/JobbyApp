
import Header from '../Header/Header';
import AllJobs from '../AllJobs/AllJobs';
const Jobs = () =>{
    return(
        <div className='h-full w-screen sm:h-min-screen m-0 p-0' >
            <div className="sticky top-0 z-10">
                <Header />
            </div>
            <AllJobs/>
        </div>
    )
}
export default Jobs;