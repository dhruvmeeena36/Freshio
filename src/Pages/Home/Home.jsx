import React, { useEffect, useState, useContext } from 'react';
import Slider from '../../Components/Slider/Slider';
import NearlyExpiryItems from '../../Components/NearlyExpiryItems/NearlyExpiryItems';
import ExpiredFood from '../../Components/ExpiredFood/ExpiredFood';
import CountUpSection from '../../Components/CountUpSection/CountUpSection';
import FoodStorageTips from '../../Components/FoodStorageTips/FoodStorageTips';
import HowItWorks from '../../Components/HowItWorks/HowItWorks';
import { API_ENDPOINTS } from '../../utils/api';
import AuthContext from '../../Context/AuthContext';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [expiringSoon, setExpiringSoon] = useState([]);
    const [expiredFoods, setExpiredFoods] = useState([]);
    const [allFoods, setAllFoods] = useState([]);
    const [allNotes, setAllNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load data when user is authenticated
    useEffect(() => {
        const fetchData = async () => {
            if (user?.accessToken) {
                try {
                    setLoading(true);
                    const headers = { authorization: `Bearer ${user.accessToken}` };

                    // Fetch expired foods
                    const expiredRes = await fetch(API_ENDPOINTS.getExpiredFoods(), { headers });
                    if (!expiredRes.ok) throw new Error(`Expired foods error: ${expiredRes.status}`);
                    const expiredData = await expiredRes.json();
                    setExpiredFoods(Array.isArray(expiredData) ? expiredData : []);

                    // Fetch expiring soon
                    const expiringRes = await fetch(API_ENDPOINTS.getExpiringFoods(), { headers });
                    if (!expiringRes.ok) throw new Error(`Expiring foods error: ${expiringRes.status}`);
                    const expiringData = await expiringRes.json();
                    setExpiringSoon(Array.isArray(expiringData) ? expiringData : []);

                    // Fetch all foods
                    const allRes = await fetch(API_ENDPOINTS.getMyFoods(), { headers });
                    if (!allRes.ok) throw new Error(`My foods error: ${allRes.status}`);
                    const allData = await allRes.json();
                    setAllFoods(Array.isArray(allData) ? allData : []);

                    // Fetch all notes
                    const notesRes = await fetch(API_ENDPOINTS.getAllNotes(), { headers });
                    if (!notesRes.ok) throw new Error(`Notes error: ${notesRes.status}`);
                    const notesData = await notesRes.json();
                    setAllNotes(Array.isArray(notesData) ? notesData : []);
                } catch (error) {
                    console.error('Error fetching home data:', error);
                    setExpiredFoods([]);
                    setExpiringSoon([]);
                    setAllFoods([]);
                    setAllNotes([]);
                } finally {
                    setLoading(false);
                }
            } else {
                setExpiredFoods([]);
                setExpiringSoon([]);
                setAllFoods([]);
                setAllNotes([]);
                setLoading(false);
            }
        };

        fetchData();
    }, [user?.accessToken]);

    return (
        <div>
            <Slider></Slider>
            <div>
                <div>
                    <div className='bg-[#f4f1ea] lg:p-20 md:px-5 py-10'>
                        <NearlyExpiryItems expiringSoon={expiringSoon}></NearlyExpiryItems>
                    </div>
                    
                    <div id='expiredFoods'>
                        <ExpiredFood expiredFoods={expiredFoods}></ExpiredFood>
                    </div>

                    <div className='bg-black lg:p-20 md:px-5 py-10'>
                        <CountUpSection 
                            expiringSoon={expiringSoon}
                            expiredFoods={expiredFoods}
                            allFoods={allFoods}
                            allNotes={allNotes}
                        ></CountUpSection>
                    </div>

                    <div id='storageTips' className='bg-[#f4f1ea] lg:py-20 md:px-5 lg:px-0 py-10'>
                        <FoodStorageTips></FoodStorageTips>
                    </div>

                    <div id='howItWork' className='bg-white'>
                        <HowItWorks></HowItWorks>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Home;