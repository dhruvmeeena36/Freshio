import React, { useContext } from 'react';
import logo from '../../assets/Pulse.png'
import Lottie from 'lottie-react';
// import loginLottie from '../../assets/addfood.json';
// import bannerImg from '../../assets/HealtyBannerAd.png'
import { IoFastFoodOutline } from 'react-icons/io5';
import AuthContext from '../../Context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { API_ENDPOINTS } from '../../utils/api';

const AddFood = () => {
     const {user} = useContext(AuthContext);
     const navigate = useNavigate();
    //  Handle Add Food
    const handleAddFood = (e) => {
        e.preventDefault();
        const form = e.target;
        const formDate = new FormData(form);
        const foodData = Object.fromEntries(formDate.entries());
        foodData.expiryDate = new Date(form.expiryDate.value);
        foodData.addedDate = new Date();
     
        const newFood = {...foodData};
        
        
        // Send Data to DB
        axios.post(API_ENDPOINTS.createFood(), newFood,{
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        })
        .then(res => {
            if (res.data.insertedId) {
                toast.success('New Food Added Successfully!');
                navigate('/my-items');
            }
        })
        .catch(error => {
           toast.error(error.message);
        })
        form.reset();
    };
    return (
        <div className='bg-[#f4f1ea] pb-20 pt-4 px-5'>
            {/* <div>
                <img className='max-w-[1500px] mx-auto w-full object-cover rounded-2xl ' src={bannerImg} alt="" />
            </div> */}
            
            <div className='max-w-[1500px] mx-auto bg-[#151515] py-5 rounded-xl'>
                    <h2 className='text-6xl font-extrabold text-center text-primary'>Add Food Items</h2>
                    <div className='divider divider-primary w-56 mx-auto'></div>
            </div>
            <div className='max-w-[1500px] mx-auto bg-white p-5 md:p-10 rounded-3xl my-10'>

                {/* Form */}
                <div className='flex justify-center lg:justify-start'>
                    <div className="w-full md:px-10 px-5 py-12 space-y-3 rounded-3xl bg-[#f4f1ea]" bis_skin_checked="1">
                        <img src={logo} 
                        alt="logo"
                        className='w-40 mx-auto'
                        />
                        <div className='my-5 space-y-3'>
                            <h1 className="text-4xl md:text-6xl font-extrabold text-center">Add New Food</h1>
                            <p className='text-center font-medium text-accent'>Track your food before it expires!</p>
                        </div>
                        <form onSubmit={handleAddFood} className="space-y-6">

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            {/* Email */}
                            <div className="space-y-1 text-sm" bis_skin_checked="1">
                                <label htmlFor="Email" className="block text-secondary font-bold">User Email</label>
                                <input type="email" name="email" id="email" placeholder="Email"
                                value={user?.email}
                                onChange={e => e.target}
                                readOnly
                                required
                                className="input w-full px-4 py-6 rounded-md" />
                            </div>

                            {/* Title */}
                            <div className="space-y-1 text-sm" bis_skin_checked="1">
                                <label htmlFor="foodTitle" className="block text-secondary font-bold">*Food Title</label>
                                <input type="text" name="foodTitle" id="foodTitle" placeholder="Food Title"
                                required
                                className="input w-full px-4 py-6 rounded-md" />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            {/* Food Image */}
                            <div className="space-y-1 text-sm" bis_skin_checked="1">
                                <label htmlFor="foodImage" className="block text-secondary font-bold">*Food Image Url</label>
                                <input type="url" name="foodImage" id="foodImage" placeholder="Food Image Url"
                                required
                                className="input w-full px-4 py-6 rounded-md" />
                            </div>
                                                                                      {/* Category */}
                                <div className="space-y-1 text-sm" bis_skin_checked="1">
                                    <label htmlFor="foodTitle" className="block text-secondary font-bold">*Select a category</label>
                                    <select
                                    name='category'
                                    defaultValue="Select a category" 
                                    required
                                    className="select select-lg w-full rounded-md text-accent"
                                    >
                                        <option value=''>Select a category</option>
                                        <option>Dairy</option>
                                        <option>Meat</option>
                                        <option>Vegetables</option>
                                        <option>Snacks</option>
                                    </select>

                                </div>
                        </div>

                            {/* Category & Exp Date */}
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 '>
                                {/* Expiry Date */}
                                <div className="space-y-1 text-sm" bis_skin_checked="1">
                                    <label htmlFor="expiryDate" className="block text-secondary font-bold">*Expiry Date</label>
                                    <input type="date" name="expiryDate" id="expiryDate" placeholder="Expiry Date"
                                    required
                                    className="input w-full px-4 py-6 rounded-md" />
                                </div>

                                {/* Quantity */}
                                <div className="space-y-1 text-sm" bis_skin_checked="1">
                                    <label htmlFor="quantity" className="block text-secondary font-bold">*Quantity</label>
                                    <input type="number" name="quantity" id="quantity" placeholder="Food Quantity"
                                    required
                                    className="input w-full px-4 py-6 rounded-md" />
                                </div>
                            </div>



                            {/* Description */}
                            <div className="space-y-1 text-sm" bis_skin_checked="1">
                                <label htmlFor="description" className="block text-secondary font-bold">*Description</label>
                                <textarea className="textarea w-full px-4 py-6 rounded-md"
                                name='description'
                                placeholder="Write Description..."
                                required
                                ></textarea>
                            </div>



                            <button type='submit' className="w-full py-6 text-center rounded-sm btn btn-primary text-xl">
                                <IoFastFoodOutline size={30}></IoFastFoodOutline>
                                Add Food</button>
                        </form>

                    </div>
                </div>

                {/* Lottie */}
                {/* <div className='col-span-12 lg:col-span-5 flex items-center justify-center'>
                    <Lottie 
                    animationData={loginLottie}
                    style={{width: '600px'}}
                    ></Lottie>
                </div> */}

            </div>
        </div>
    );
};

export default AddFood;