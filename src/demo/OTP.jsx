import React from "react";

const OTP = () => {
  const handleOtp = async (event) => {
    event.preventDefault();
    const otp = event.target.otp.value;
    const phoneAuthCredential = firebase.auth.PhoneAuthProvider.credential(
      phoneCredential.verificationId,
      otp
    );

    // Authenticate the user using the OTP and phoneAuthCredential
    await signInWithCredential(auth, phoneAuthCredential);

    alert("otp work");
  };

  return (
    <div>
      <form onSubmit={handleOtp} action="">
        <input type="text" name="otp" placeholder="enter otp" />
        <button>submit</button>
      </form>
    </div>
  );
};

export default OTP;
