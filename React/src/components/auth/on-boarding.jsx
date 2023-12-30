import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function OnBoarding() {
  const navigate = useNavigate();

  const [instructor, setInstructor] = useState("");
  const [instructors, setInstructors] = useState([]);
  const location = useLocation();
  const userId = location.state.userId;
  // console.log(userId)


  const getAllInstructors = async () => {
    const { data } = await axios.get(
      "http://localhost:3000/user/getAllUsers", {
      role: "instructor"
    }
    );
    console.log("data", data.response)


    if (data.response) {

      const INSTRUCTORS = [];
      data.response.map((item) => {
        INSTRUCTORS.push({
          label: item.firstName + " " + item.lastName,
          value: item.userId,
        });
      });

      setInstructors(INSTRUCTORS);
    }
  };

  const onboarding = async () => {
    const { data } = await axios.put("http://localhost:3000/user/updateUser", {
      instructorId: instructor,
      userId,
      isRequested: true
    });

    console.log("data ", data);
    alert("Your requested has been sent");
    return navigate("/");


  };

  useEffect(() => {
    void getAllInstructors();
  }, []);

  return (
    <>
      <div className="w-screen h-screen bg-gray-100 flex justify-center">
        <div className="w-1/4 h-full flex justify-center flex-col ">
          <div className="w-full flex flex-col bg-white p-4 rounded-lg">
            <div className="w-full flex justify-center mb-4 ">
              <p className="text-black text-2xl font-semibold    ">
                Onboarding
              </p>
            </div>
            <label className="text-md text-black font-medium mb-1">
              Select Instructor
            </label>
            <Select
              className="bg-white  rounded-lg mb-2 focus:outline-none text-black font-medium"
              isSearchable={true}
              options={instructors}
              onChange={(e) => {
                setInstructor(e.value);
              }}
              isDisabled={false}
              placeholder="Select Role"
            />

            <div className="w-full p-4 flex justify-center mt-4">
              <button
                onClick={() => {
                  void onboarding();
                }}
                disabled={!instructor}
                className="bg-blue-500 w-36 focus:outline-none disabled:bg-gray-300"
              >
                submit
              </button>
            </div>
          </div>
          <div className="w-full  bg-red-900"></div>
        </div>
      </div>
    </>
  );
}

export default OnBoarding;
