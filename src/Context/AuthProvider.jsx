import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, updateProfile } from "firebase/auth";
import { auth } from '../Firebase/firebase.config';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const AuthProvider = ({children}) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Configure Google Provider with proper settings
    googleProvider.setCustomParameters({
        prompt: 'select_account',
        access_type: 'offline'
    });
    googleProvider.addScope('email');
    googleProvider.addScope('profile');

    // Create User
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Sign in with Google (try popup first, fallback to redirect)
    const googleSingIn = async () => {
        try {
            setLoading(true);
            console.log('Attempting Google sign in with popup...');

            // Try popup first
            const result = await signInWithPopup(auth, googleProvider);
            console.log('Google sign in successful:', result.user.email);
            setLoading(false);
            return result;
        } catch (error) {
            console.error('Popup failed, trying redirect...', error);

            // If popup fails, try redirect as fallback
            if (error.code === 'auth/popup-blocked' ||
                error.code === 'auth/popup-closed-by-user' ||
                error.code === 'auth/cancelled-popup-request') {

                try {
                    await signInWithRedirect(auth, googleProvider);
                    // This will redirect the page, so we don't return anything
                    return null;
                } catch (redirectError) {
                    console.error('Redirect also failed:', redirectError);
                    setLoading(false);
                    throw redirectError;
                }
            } else {
                setLoading(false);
                throw error;
            }
        }
    }

    // Handle redirect result on page load
    useEffect(() => {
        const handleRedirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result) {
                    console.log('Redirect sign in successful:', result.user.email);
                    setUser(result.user);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Redirect result error:', error);
                setLoading(false);
            }
        };

        handleRedirectResult();
    }, []);

    // Current User
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // Get Firebase ID token
                const idToken = await currentUser.getIdToken();
                setUser({ ...currentUser, accessToken: idToken });
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => {
            unSubscribe();
        };
    },[])

    // Update a user's profile
    const updateUser = (userInfo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, userInfo)
    }

    // Login User
    const logInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Sign Out
    const handleSingOut = () => {
        signOut(auth)
        .then(() => {
            toast.success('Log Out Successful!')
        })
        .catch((error) => {
            toast.error(error.message)
        })
    }

    const userInfo = {
        createUser,
        googleSingIn,
        updateUser,
        logInUser,
        user,
        setUser,
        loading,
        setLoading,
        handleSingOut,
    }
    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    )
};

export default AuthProvider;