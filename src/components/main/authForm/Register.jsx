import React, { useState } from "react";
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'; // Importing the eye icons

const Register = () => {
    const [number, setNumber] = useState('');
    const [image, setImage] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [pinVisible, setPinVisible] = useState(false); // State to toggle pin visibility

    const validateForm = (formData) => {
        const errors = {};
        // Check if required fields are filled
        if (!formData.name) errors.name = "Name is required.";
        if (!formData.pin) errors.pin = "Pin is required.";
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Please enter a valid email.";
        if (!formData.role) errors.role = "Please select a role.";
        if (!formData.nid) errors.nid = "NID number is required.";
        if (!number || !isValidPhoneNumber(number)) errors.phone = "Please enter a valid phone number.";
        if (!image) errors.image = "Please upload an image.";
        
        return errors;
    };

    const handleRegister = (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        let newUserInfo = Object.fromEntries(formData.entries());
        newUserInfo.phone = number;

        const errors = validateForm(newUserInfo);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        // Proceed with form submission
        if (newUserInfo.role === "user") {
            newUserInfo.amount = 40;
        } else {
            newUserInfo.amount = 100000;
        }

        console.log(newUserInfo);
    };

    // Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="min-h-screen bg-[#F2F6FE] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex max-w-5xl w-full bg-white p-8 rounded-xl shadow-2xl gap-4">
                {/* Left Side: Registration Form */}
                <div className="w-full lg:w-1/2 space-y-6">
                    <h2 className="text-3xl font-extrabold text-center text-[#164193]">Register for an Account</h2>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter your name"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                            />
                            {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
                        </div>

                        <div className="relative">
                            <label htmlFor="pin" className="block text-sm font-medium text-gray-700">Pin</label>
                            <input
                                type={pinVisible ? "text" : "password"} // Toggle between text and password
                                name="pin"
                                id="pin"
                                placeholder="Enter your pin"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                            />
                            <div
                                className="absolute inset-y-0 top-6 right-3 flex items-center cursor-pointer"
                                onClick={() => setPinVisible(!pinVisible)}
                            >
                                {pinVisible ? <AiOutlineEyeInvisible className="text-gray-500" /> : <AiOutlineEye className="text-gray-500" />}
                            </div>
                            {formErrors.pin && <p className="text-sm text-red-500">{formErrors.pin}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                            />
                            {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Select Role <span className="text-red-500">*</span></label>
                            <select
                                name="role"
                                id="role"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                            >
                                <option disabled>Select Role</option>
                                <option value="agent">Agent</option>
                                <option value="user">User</option>
                            </select>
                            {formErrors.role && <p className="text-sm text-red-500">{formErrors.role}</p>}
                        </div>

                        <div>
                            <label htmlFor="nid" className="block text-sm font-medium text-gray-700">NID Number</label>
                            <input
                                type="number"
                                name="nid"
                                id="nid"
                                placeholder="Enter your NID number"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                            />
                            {formErrors.nid && <p className="text-sm text-red-500">{formErrors.nid}</p>}
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <PhoneInput
                                international
                                defaultCountry="BD"
                                value={number}
                                onChange={setNumber}
                                name="phone"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                            />
                            {formErrors.phone && <p className="text-sm text-red-500">{formErrors.phone}</p>}
                        </div>

                        {/* Image Input */}
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Profile Image</label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
                            />
                            {formErrors.image && <p className="text-sm text-red-500">{formErrors.image}</p>}
                        </div>
                        
                        {/* Display the selected image */}
                        {image && <div className="mt-2">
                            <img src={image} alt="Profile" className="w-32 h-32 object-cover rounded-full" />
                        </div>}

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-[#164193] text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                        >
                            Register
                        </button>
                    </form>

                    {/* Login Button */}
                    <div className="mt-4 text-center">
                        <p className="text-sm inline text-gray-600">Already have an account? &nbsp;</p>
                        <Link
                            to="/login"
                            className="text-indigo-600 hover:text-indigo-500 font-semibold"
                        >
                            Login here
                        </Link>
                    </div>
                </div>

                {/* Right Side: Image */}
                <div className="hidden lg:block w-1/2">
                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/002/290/642/small/register-now-icon-or-logo-badge-template-3d-modern-with-warning-mark-in-yellow-color-illustation-vector.jpg"
                        alt="Register Now"
                        className="h-full object-cover rounded-xl shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;
