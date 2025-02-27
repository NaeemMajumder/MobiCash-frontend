const verifyPin = async (axiosSecure, email, pin) => {
  try {
    const response = await axiosSecure.post(`/pinVerify?email=${email}`, {
      pin,
    });
    return response.data;
  } catch (error) {
    console.error("PIN verification failed:", error);
    return null;
  }
};

export default verifyPin; 
