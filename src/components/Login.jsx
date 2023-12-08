import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.css";
import Swal from "sweetalert2";
const Login = () => {
  const [value, setValue] = useState("");
  const [varifyOTP, setVarifyOTP] = useState(false);
  const [requestID, setRequestID] = useState("");

  //const [error, setError] = useState()

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ];
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (index < inputRefs.length - 1 && value !== "") {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleVerify = () => {
    varifyOtpFunction();

    // if (validUser) {

    //  login(true);
    //  navigate("/SongList");
    //   Swal.fire({
    //     icon: "success",
    //     title: "OTP Verified Successfully!",
    //     text: "You can now access the secured area.",
    //   });
    // } else {
    //   // Incorrect OTP, show error alert
    //   Swal.fire({
    //     icon: "error",
    //     title: "OTP Verification Failed",
    //     text: "Please enter the correct OTP.",
    //   });
    // }
  };

  // Varify OTP function
  const varifyOtpFunction = async () => {
    const enteredOtp = otp.join("");

    try {
      const response = await fetch(
        "https://dev.api.goongoonalo.com/v1/auth/verify_otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: "+917524807719",
            requestId: requestID,
            otp: enteredOtp,
          }),
        }
      );

 
     
     
      
    
  const data = await response.json();
 if(data.message==="Invalid phone number")
 {
  Swal.fire({
    icon: "error",
    title: "Signin Failed",
    text: "Please correct phone number with +91",
  });
 }
 else{
  const token = data.token;
  if (token) {
    login({ token });
    navigate("/SongList");
  }
 
}
     
    } catch (error) {
    
      Swal.fire({
        icon: "error",
        title: "Signin Failed",
        text: "Please correct phone number with +91",
      });
    }
  };

  //Handle Sign IN
  const handleSignin = async () => {
    sendOTP();
  };

  // Send OTP function
  const sendOTP = async () => {
    try {
      const response = await fetch(
        "https://dev.api.goongoonalo.com/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber: value,
          }),
        }
      );

      if (!response.ok) {



        const errorResponse = await response.json().catch(() => null);
        console.error("Error response:", errorResponse);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setVarifyOTP(true);
      setRequestID(data.requestId);
      console.log("API response:", data);
    } catch (error) {
      console.error("Error making API call", error);
    }
  };

  const handleChangeNumber = () => {
    // Reset state to allow the user to enter a new phone number
    setValue("");
    setVarifyOTP(false);
    setRequestID("");
    setOtp(["", "", "", ""]);
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", width: "100%" }}
    >
      {!varifyOTP && (
        <>
          <div className="" style={{ width: "25%" }}>
            <div style={{ fontSize: "38px", color: "#552583" }}>Sign In</div>
            <div style={{ fontSize: "12px" }}>
              Please enter your mobile number to login. We will send an OTP to
              verify your number.
            </div>

            <input
              type="text"
              className="form-control mt-3"
              placeholder="Phone Number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <div className="mt-3">
              <button
                className="btn  text-white"
                style={{ backgroundColor: "#552583", width: "100%" }}
                onClick={handleSignin}
              >
                Sign In
              </button>
            </div>
          </div>
        </>
      )}

      {varifyOTP && (
        <>
          <div style={{width:"30%"}}>
            <div style={{ fontSize: "38px", color: "#552583" }}>OTP Verification</div>
            <div className="mb-3" style={{ fontSize: "12px" }}>We have sent and OTP to {value}. Please enter the code received to verify.</div>
            <div style={{ textAlign: "center" }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  style={{
                    width: "50px",
                    height: "50px",
                    textAlign: "center",
                    marginRight: "40px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                />
              ))}
            </div>
            <div className="mt-3" style={{ textAlign: "center" }}>
            <button   className="btn  text-white"
                style={{ backgroundColor: "#552583", width: "100%" }} onClick={handleVerify}>Verify</button>
               <div>
            <button className="bg-white text-primary underline-text " onClick={sendOTP}>Resend OTP</button>
            </div>
            <div>
            <button className="bg-white text-primary underline-text" onClick={handleChangeNumber}>Use Another Number</button>
     
            </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default Login;
