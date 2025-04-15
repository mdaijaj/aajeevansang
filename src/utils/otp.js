
export const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000) //6-digit otp number
};

