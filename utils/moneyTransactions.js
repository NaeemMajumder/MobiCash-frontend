export const moneyTransaction = async (axiosSecure, route, data) => {
    try {
      const response = await axiosSecure.post(route, data);
      return response.data; 
    } catch (error) {
      console.error("API request failed:", error);
      return null; 
    }
  };
  