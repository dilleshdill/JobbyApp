import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const Filters = ({ employmentTypesList, salaryRangesList, checkBoxfilter, onSalaryChange }) => {
    const [profileList, setProfileList] = useState(null);
    const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState([]);

    useEffect(() => {
        console.log('Component mounted or updated');
        fetchData();
    }, []);
    const fetchData = async () => {
        const url = 'https://apis.ccbp.in/profile';
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${Cookies.get('jwt_token')}`,
            },
        };
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
            const profile = {
                name: data.profile_details.name,
                imgUrl: data.profile_details.profile_image_url,
                bio: data.profile_details.short_bio,
            };
            setProfileList(profile);
        }
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        let updatedList;

        if (checked) {
            updatedList = [...selectedEmploymentTypes, value];
        } else {
            updatedList = selectedEmploymentTypes.filter((type) => type !== value);
        }

        setSelectedEmploymentTypes(updatedList);
        checkBoxfilter(updatedList);
    };

    const handleSalaryChange = (event) => {
        const { value } = event.target;
        onSalaryChange(value);
    };

    return (
        <div className="w-full flex flex-col pt-15 items-center sm:pl-9 sm:sticky sm:top-15 sm:pt-5">
            <div className='bg-[url("https://assets.ccbp.in/frontend/react-js/profile-bg.png")] bg-cover w-[90%] h-[150px] pl-4 mt-5 flex items-center rounded-br-2xl rounded-bl-2xl'>
                {profileList && (
                    <div>
                        <img src={profileList.imgUrl} className='h-[50px]' alt={profileList.name} />
                        <p className="text-[#6583F5] font-[600]">{profileList.name}</p>
                        <p className="font-[500] text-[12px] mt-[8px]">{profileList.bio}</p>
                    </div>
                )}
            </div>
            <h4 className="w-full border-t-3 mt-4 border-gray-500 pt-5 pl-5 pb-3 text-white font-[600]">Types of Employement</h4>
            {employmentTypesList.map((item) => (
                <div key={item.employmentTypeId} className="w-full pl-5 text-white">
                    <input
                        type="checkbox"
                        value={item.employmentTypeId}
                        onChange={handleCheckboxChange}
                    />
                    <label className='pl-4'>{item.label}</label>
                </div>
            ))}
            <h4 className="w-full border-t-3 mt-2 border-gray-500 pt-5 pl-5 pb-3 text-white font-[600]">Salary Range</h4>
            {salaryRangesList.map((item) => (
                <div key={item.salaryRangeId} className="w-full pl-5 text-white">
                    <input
                        type="radio"
                        name="salaryRange"
                        value={item.salaryRangeId}
                        onChange={handleSalaryChange}
                    />
                    <label className='pl-4'>{item.label}</label>
                </div>
            ))}
        </div>
    );
};

export default Filters;
