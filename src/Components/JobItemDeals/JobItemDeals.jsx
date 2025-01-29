import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Header from '../Header/Header';
import { FaStar } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { MdContactMail } from 'react-icons/md';
import { CiShare1 } from "react-icons/ci";
class JobItemDeals extends Component {
    state = {
        jobDetails: null,
        similarJobs: [],
        skillsList: [],
        companyLife: null,
        isLoading: true,
        error: null,
    };

    componentDidMount() {
        this.getData();
    }

    fetchedDetails = (job) => ({
        companyLogoUrl: job.company_logo_url,
        companyWebsiteUrl: job.company_website_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
    });

    getData = async () => {
        const { id } = this.props;
        const url = `https://apis.ccbp.in/jobs/${id}`;
        const jwtToken = Cookies.get('jwt_token');
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Failed to fetch job details');
            }

            const data = await response.json();

            const updatedJobDetails = this.fetchedDetails(data.job_details);

            const updatedSkillsList = data.job_details.skills.map((item) => ({
                name: item.name,
                imageUrl: item.image_url,
            }));

            const companyLife = {
                description: data.job_details.life_at_company.description,
                imageUrl: data.job_details.life_at_company.image_url,
            };

            const updatedSimilarJobs = data.similar_jobs.map((job) => ({
                companyLogoUrl: job.company_logo_url,
                employmentType: job.employment_type,
                id: job.id,
                jobDescription: job.job_description,
                location: job.location,
                packagePerAnnum: job.package_per_annum,
                rating: job.rating,
                title: job.title,
            }));

            this.setState({
                jobDetails: updatedJobDetails,
                similarJobs: updatedSimilarJobs,
                skillsList: updatedSkillsList,
                companyLife,
                isLoading: false,
            });
        } catch (error) {
            this.setState({ error: error.message, isLoading: false });
        }
    };

    render() {
        const { jobDetails, similarJobs, skillsList, companyLife, isLoading, error } = this.state;

        if (isLoading) {
            console.log("Loader is visible");
            return <div className="loading loading-dots loading-lg"></div>;
        }

        if (error) {
            return <p>{error}</p>;
        }

        return (
            <div className="w-full h-full bg-[#000000] pb-2  ">
                <Header/>
                {jobDetails && (
                    <div className="sm:w-[90%] w-[90%] ml-[5%] mt-5 text-white bg-[#272727] pl-3 pr-3 mb-5 pt-3 rounded-lg sm:pb-5 sm:pt-7 sm:pl-7 sm:pr-5 ">
                        <div className="flex h-[50px] sm:h-[80px]">
                            <img src={jobDetails.companyLogoUrl} className='h-full' alt="Company Logo" />
                                <div className="pl-3">
                                    <h2 className="sm:text-[23px] sm:font-[600]">{jobDetails.title}</h2>
                                    <div className="flex h-[30px] items-center">
                                        <FaStar className="text-yellow-500" />
                                        <span className="pl-1">{jobDetails.rating}</span>
                                    </div>
                                </div>
                        </div>
                        <div className="flex justify-between  h-[80px] items-center">
                            <div className="flex h-full items-center">
                                <FaLocationDot />
                                <span className="pl-2 pr-5">{jobDetails.location}</span>
                                <MdContactMail />
                                <span className="pl-2 pr-2">{jobDetails.employmentType}</span>
                            </div>
                            <span>{jobDetails.packagePerAnnum}</span>
                        </div>
                        <hr/>
                        <div className="flex justify-between pt-4 pb-4 ">
                            <p className="text-[18px] font-[600] sm:text-[20px] ">Description</p>
                            <a href={jobDetails.companyWebsiteUrl} target="_blank" rel="noopener noreferrer">
                               <div className="flex h-[50px] items-center">
                                    <p className="pr-2">Visit</p>
                                  <CiShare1 />
                               </div>

                            </a>
                        </div>
                        <p className="font-[400] text-[14px] pb-3 sm:text-[17px] sm:w-[80%]">{jobDetails.jobDescription}</p>   
                        {skillsList.length > 0 && (
                            <div className="w-full">
                                <h2>Skills</h2>
                                <ul className="flex flex-wrap pt-10">
                                    {skillsList.map((skill) => (
                                        <li key={skill.name} className="flex  mr-1 w-[30%] ml-5 mb-10">
                                            <img src={skill.imageUrl} alt={skill.name} className="w-[30px]" />
                                            <p className="pl-3 font-[500]">{skill.name}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {companyLife && (
                            <div className="w-full">
                                <h2 className="font-[500] pb-3 sm:text-[23px]">Life at Company</h2>
                                <div className="sm:flex sm:justify-between h-fit items-center">
                                    <p className="sm:w-[60%] sm:text-[20px] sm:pl-5 sm:leading-loose">{companyLife.description}</p>
                                    <img src={companyLife.imageUrl} alt="Life at Company" className="w-full mt-3 pb-3 sm:w-[30%] sm:pr-9"/>
                                </div>
                            </div>
                        )}    

                                 
                    </div>
                )}
                <div className="w-[90%] h-full bg-[#000000] sm:flex">
                    {similarJobs.length > 0 && (
                        <div className="w-full ml-[5%] ">
                            <h2 className="text-white font-[500] pb-4 sm:text-[23px]">Similar Jobs</h2>
                            <ul className="sm:flex sm:flex-wrap sm:w-full">
                                {similarJobs.map((jobDetails) => (
                                    <div key={jobDetails.id} className="similar-job-item mb-5 pl-3 pt-3 pr-3 bg-[#272727] text-white rounded-lg sm:w-[30%] sm:mr-[3%] sm:pl-5 sm:pt-5 sm:pr-5">
                                        <div className="flex h-[50px] items-center">
                                            <img
                                                src={jobDetails.companyLogoUrl}
                                                className="h-full rounded-md"
                                                alt="Company Logo"
                                            />
                                            <div className="pl-3">
                                                <h2 className="text-lg font-semibold">{jobDetails.title}</h2>
                                                <div className="flex h-[30px] items-center">
                                                    <FaStar className="text-yellow-500" />
                                                    <span className="pl-1 text-sm">{jobDetails.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="pt-5 pb-3 text-base font-medium sm:text-[17px]">Description</p>
                                        <p className="text-sm  sm:text-[15px]">{jobDetails.jobDescription}</p>
                                        <div className="flex justify-between h-[80px] items-center mt-3 ">
                                            <div className="flex h-full items-center">
                                                <FaLocationDot className="text-blue-500" />
                                                <span className="pl-2 pr-5 text-sm">{jobDetails.location}</span>
                                                <MdContactMail className="text-blue-500" />
                                                <span className="pl-2 pr-2 text-sm">{jobDetails.employmentType}</span>
                                            </div>
                                            <span className="text-sm font-medium">{jobDetails.packagePerAnnum}</span>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

            </div>
        );
    }
}

export default JobItemDeals;
