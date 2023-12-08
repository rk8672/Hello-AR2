import React, { useState,  } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const OTPVerify = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [React.createRef(), React.createRef(), React.createRef(), React.createRef()];
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    // Move to the next input box
    if (index < inputRefs.length - 1 && value !== "") {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join("");

    // Add your OTP verification logic here
    if (enteredOtp === "5678") {
      // Successful verification, show success alert
      login(5678);
      navigate("/SongList");
      Swal.fire({
        icon: "success",
        title: "OTP Verified Successfully!",
        text: "You can now access the secured area.",
      });
    } else {
      // Incorrect OTP, show error alert
      Swal.fire({
        icon: "error",
        title: "OTP Verification Failed",
        text: "Please enter the correct OTP.",
      });
    }
  };

  return (
    <div>
      <h2>OTP Verification</h2>
      <div>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            style={{
              width: "30px",
              height: "30px",
              textAlign: "center",
              marginRight: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        ))}
      </div>
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
};

export default OTPVerify;
