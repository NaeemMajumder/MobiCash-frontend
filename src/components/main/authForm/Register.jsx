import React, { useState } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'

const Register = () => {
    const [number, setNumber] = useState();

    let handleRegister = (event) => {
        event.preventDefault();

        if (!isValidPhoneNumber(number)) {
            alert("Please enter a valid phone number.");
            return;
        }

        let formData = new FormData(event.target);
        let newUserInfo = Object.fromEntries(formData.entries());

        newUserInfo.phone = number;
        
        if(newUserInfo.role === "user"){
            newUserInfo.amount = 40;
        }else{
            newUserInfo.amount = 100000;
        }

        console.log(newUserInfo); 
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                <input type="text" name="name" id="name" placeholder="Name" />
                <br />
                <br />
                <input type="text" name="pin" id="pin" placeholder="Enter your pin" />
                <br />
                <br />
                <input type="text" name="number" id="number" placeholder="Enter your number" />
                <br />
                <br />
                <input type="text" name="email" id="email" placeholder="Enter your email" />
                <br />
                <br />
                <select name="role" id="role">
                    <option value="" disabled>Select Role</option>
                    <option value="agent">Agent</option>
                    <option value="user">User</option>
                </select>
                <br />
                <br />
                <input type="number" name="nid" id="nid" placeholder="Enter your NID number" />
                <br />
                <br />

                <div>
                    <PhoneInput
                        international
                        defaultCountry="BD"  // Make sure you have a valid default country
                        value={number}
                        onChange={setNumber}
                        name="phone"  // Tied to the form data
                    />
                    <div>
                        {number ? `Phone Number: ${number}` : "Please enter a valid phone number."}
                    </div>
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
