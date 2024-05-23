import React, {useState, useEffect} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import Services from '../../components/Services/Services'
import Banner from '../../components/Banner/Banner'
import AppStore from '../../components/AppStore/AppStore'
import Testimonials from '../../components/Testimonials/Testimonials'
import Footer from '../../components/Footer/Footer'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from '../../../reduxs/accounts/account.slices.js';
import Cookies from 'js-cookie';


export default function Home() {
    const token = Cookies.get('token');
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/auth',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUserData();
    }, [token]);

    console.log(user);

    return (
        <div>
            <Navbar />
            <Hero />
            <Services />
            <Banner />
            <AppStore />
            <Testimonials />
            <Footer />
        </div>
    )
}
