import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function Login(updateState) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Role, setRole] = useState("");

  const [loading, setLoading] = useState(false); // Added loading state
  const ROLE = [
    {
      value: "trainee",
      label: "Trainee",
    },
    {
      value: "instructor",
      label: "Instructor",
    },
  ]; const login = async () => {
    setLoading(true);

    try {
      const { data } = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
        role: Role, // Include the selected role in the request
      },
      {
          withCredentials: true,
        }
      
      );

      console.log("login", data.response.traineeId);
      let traineeId = data.response.traineeId;
let PendingRequest;
      let ApprovedRequest;

      if(traineeId){
        console.log(traineeId)
      const Pending = await axios.get("http://localhost:3000/request/getRequest", {
      
      params:
      {traineeId:traineeId,
      status:"Pending"
      } // Include the selected role in the request
      }
    
      );
      console.log("request data",Pending.data)

         PendingRequest= Pending.data.response;
   
      const Approved = await axios.get("http://localhost:3000/request/getRequest", {

          params:
          {
            traineeId: traineeId,
            status: "Approved"
          } // Include the selected role in the request
        }

        );
      ApprovedRequest=Approved.data.response

      
      }

      if (data.error) {
        alert("Invalid Credentials");
      }
     else if (PendingRequest) {
        alert("You have already requested. Wait for your approval");

      }
      else if (ApprovedRequest) {
       navigate("/trainee")
      }

      else if (data.response.instructorId) {
        navigate("/instructor");
      } else if (data.response.isBlocked === true) {
        alert("You are blocked");
      } else {
        navigate("onBoarding", { state: { userId: data.response.traineeId } });
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-screen h-screen   bg-light-grey flex justify-center">
        <div className="w-1/4 h-full  flex justify-center flex-col ">
          <div className="w-full shadow-md border  fade-in border-gray-200 flex flex-col bg-white p-4 rounded-lg">
            <div className="w-full border-black flex justify-center mb-4 ">
              <p className="text-black  text-2xl font-semibold    ">Login</p>
            </div>
            <label className="text-md text-black font-medium mb-1">Email</label>
            <input
              className="bg-gray-50 border-2 border-gray-200 py-1 px-2 rounded-lg mb-2 focus:outline-none text-black font-medium"
              required
              type="email"
              placeholder="Abc@example.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label className="text-md text-black font-medium mb-1">
              Password
            </label>
            <input
              placeholder="Enter your password"

              className="bg-gray-50 border-2 border-gray-200 py-1 px-2 rounded-lg focus:outline-none text-black font-medium"
              required
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label className="text-md text-black font-medium mb-1">Role</label>
            <Select
              className="bg-gray-50 rounded-lg mb-2 focus:outline-none text-black font-medium"
              isSearchable={true}
              options={ROLE}  // Use ROLE array instead of Role
              onChange={(selectedOption) => {
                setRole(selectedOption.value);  // Update the selected role in the state
              }}
              isDisabled={false}
              placeholder="Select Role"
            />

            <p className="text-md text-gray-400  mt-2">
              {"Don't have an account?  "}
              <span
                className="hover:text-indigo-500 text-indigo-500  hover:no-underline cursor-pointer "
                onClick={() => {
                  void updateState.updateState(false);
                }}
              >
                Signup
              </span>
            </p>
            <div className="w-full p-4 flex justify-center mt-4">
              <button
                disabled={!(email && password) || loading}
                className={`
  bg-indigo-500 text-white w-36 cursor-pointer focus:outline-none
  transition-all duration-300 ease-in-out
  hover:bg-indigo-600 hover:shadow-md
  ${loading ? 'cursor-not-allowed opacity-50' : ''}
`}
                onClick={() => {
                  void login();
                }}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </div>
          <div className="w-full  bg-red-900"></div>
        </div>
      </div>
    </>
  );
}

export default Login;
