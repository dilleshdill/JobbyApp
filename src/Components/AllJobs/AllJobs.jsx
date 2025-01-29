import { Component } from 'react';
import Filters from '../Filters/Filters';
import Cookies from 'js-cookie';
import { FaLocationDot } from "react-icons/fa6";
import { MdContactMail } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import { FiSearch } from "react-icons/fi";
import { Link } from 'react-router-dom';

const employmentTypesList = [
    { label: 'Full Time', employmentTypeId: 'FULLTIME' },
    { label: 'Part Time', employmentTypeId: 'PARTTIME' },
    { label: 'Freelance', employmentTypeId: 'FREELANCE' },
    { label: 'Internship', employmentTypeId: 'INTERNSHIP' },
];

const salaryRangesList = [
    { salaryRangeId: '1000000', label: '10 LPA and above' },
    { salaryRangeId: '2000000', label: '20 LPA and above' },
    { salaryRangeId: '3000000', label: '30 LPA and above' },
    { salaryRangeId: '4000000', label: '40 LPA and above' },
];

class AllJobs extends Component {
    state = {
        jobsList: [],
        inputVal: '',
        selectedEmploymentTypes: [],
        selectedSalaryRange: '',
        searchVal: '',
    };

    componentDidMount() {
        this.getJobsData();
    }

    getJobsData = async () => {
        const { selectedEmploymentTypes, selectedSalaryRange, inputVal } = this.state;
        const employmentTypeQuery = selectedEmploymentTypes.join(',');
        const minimumPackageQuery = selectedSalaryRange;
        const searchQuery = inputVal;

        const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeQuery}&minimum_package=${minimumPackageQuery}&search=${searchQuery}`;
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('jwt_token')}`,
            },
        };

        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
            const updatedJobsList = data.jobs.map((job) => ({
                companyLogoUrl: job.company_logo_url,
                employmentType: job.employment_type,
                id: job.id,
                jobDescription: job.job_description,
                location: job.location,
                packagePerAnnum: job.package_per_annum,
                rating: job.rating,
                title: job.title,
            }));
            this.setState({ jobsList: updatedJobsList });
        }
    };

    handleEmploymentFilter = (selectedEmploymentTypes) => {
        this.setState({ selectedEmploymentTypes }, this.getJobsData);
    };

    handleSalaryFilter = (selectedSalaryRange) => {
        this.setState({ selectedSalaryRange }, this.getJobsData);
    };

    handleSearch = (value) => {
        this.setState({ searchVal: value });
    };

    getSearch = () => {
        const { searchVal } = this.state;
        this.setState({ inputVal: searchVal }, this.getJobsData);
    };

    render() {
        const { jobsList, searchVal } = this.state;
        return (
            <div className="w-full h-full bg-[#000000] sm:flex sm:min-h-screen">

                <div className="sm:w-[20%] sm:sticky sm:top-0 sm:h-screen">
                    <div className="bg-[#000000] w-[100%] h-[80px] pt-5 items-center fixed block sm:hidden">
                        <div className="flex w-[90%] items-center border-2 border-gray-600 ml-[5%]">
                            <input
                                className="border-none outline-none flex-grow p-2 text-white bg-[#000000]"
                                type="text"
                                placeholder="Search"
                                value={searchVal}
                                onChange={(e) => this.handleSearch(e.target.value)}
                            />
                            <button 
                                onClick={this.getSearch} 
                                className="bg-[#201F1F] text-white outline-none border-l-2 border-gray-600 h-[35px] px-4 flex items-center justify-center" style={{background:"#201F1F",color:"white",outline:"none",border:"none",borderRadius:"0",display:"flex",alignItems:"center"}}>
                                <FiSearch />
                            </button>
                        </div>
                    </div>
                    <Filters
                        employmentTypesList={employmentTypesList}
                        salaryRangesList={salaryRangesList}
                        checkBoxfilter={this.handleEmploymentFilter}
                        onSalaryChange={this.handleSalaryFilter}
                    />
                </div>

                {/* Main Content Section */}
                <div className="w-[90%] ml-[5%] sm:w-[60%]">
                    <div className="bg-[#000000] w-full h-[80px] items-center hidden fixed sm:block pt-5">
                        <div className="flex w-[40%] items-center border-2 border-gray-600 ml-[5%]">
                            <input
                                className="border-none outline-none flex-grow p-2 text-white bg-transparent"
                                type="text"
                                placeholder="Search"
                                value={searchVal}
                                onChange={(e) => this.handleSearch(e.target.value)}
                            />
                            <button 
                                onClick={this.getSearch} 
                                className="bg-[#201F1F] text-white outline-none border-l-2 border-gray-600 h-[35px] px-4 flex items-center justify-center" style={{background:"#201F1F",color:"white",outline:"none",border:"none",borderRadius:"0",display:"flex",alignItems:"center"}}>
                                <FiSearch />
                            </button>
                        </div>
                    </div>

                    {/* Job Listings */}
                    <div className="pt-[10%]">
                        {jobsList.length === 0 ? (
                            <div className="h-[70vh] flex flex-col justify-center w-full items-center">
                                <img src='https://assets.ccbp.in/frontend/react-js/no-jobs-img.png' alt='nojob' className="h-[300px]" />
                                <p className="text-white text-[20px] font-[600]">No Jobs found</p>
                            </div>
                        ) : (
                            jobsList.map((job) => (
                                <Link key={job.id} to={`/jobs/${job.id}`} className="sm:w-[90%] w-full text-white bg-[#272727]">
                                    <div className="sm:w-[90%] w-full text-white bg-[#272727] pl-3 pr-3 mb-5 pt-3 rounded-lg sm:pb-5 sm:pt-7 sm:pl-5 sm:pr-5">
                                        <div className="flex h-[50px]">
                                            <img src={job.companyLogoUrl} className='h-full' alt="Company Logo" />
                                            <div className="pl-3">
                                                <h2>{job.title}</h2>
                                                <div className="flex h-[30px] items-center">
                                                    <FaStar className="text-yellow-500" />
                                                    <span className="pl-1">{job.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between h-[80px] items-center">
                                            <div className="flex h-full items-center">
                                                <FaLocationDot />
                                                <span className="pl-2 pr-5">{job.location}</span>
                                                <MdContactMail />
                                                <span className="pl-2 pr-2">{job.employmentType}</span>
                                            </div>
                                            <span>{job.packagePerAnnum}</span>
                                        </div>
                                        <hr />
                                        <p className="pt-3 pb-3 text-[18px] font-[600]">Description</p>
                                        <p className="font-[400] text-[14px] pb-3">{job.jobDescription}</p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default AllJobs;
