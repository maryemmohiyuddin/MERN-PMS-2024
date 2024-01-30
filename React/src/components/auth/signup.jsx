import { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const STACK = [
    {
        value: "MERN",
        label: "MERN",
    },
    {
        value: "Python & Django",
        label: "Python & Django",
    },
    {
        value: "Data Science",
        label: "Data Science",
    },
];
const COHORT = [
    {
        value: "Cohort-1",
        label: "Cohort-1",
    },
    {
        value: "Cohort-2",
        label: "Cohort-2",
    },
    {
        value: "Cohort-3",
        label: "Cohort-3",
    },
    {
        value: "Cohort-4",
        label: "Cohort-4",
    },
];

function Signup(updateState) {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [cohort, setCohort] = useState("");
    const [stack, setStack] = useState("");
    const [formType, setFormType] = useState("trainee"); // New state


    const signup = async () => {
        if (!firstName || !lastName || !email || !password || !confirmPassword || !cohort || !stack) {
            return alert("Please fill in all the required fields.");
        }
        const { data } = await axios.post("http://localhost:3000/user/createUser", {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            cohort,
            stack
        });
        console.log(data)
        if (data.error) {
            return alert("Invalid Credentials");
        }

        void updateState.updateState(true);
        return alert("Signed up Successfully! Please Login");
    };

    const insSignup = async () => {
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return alert("Please fill in all the required fields.");
        }
        const { data } = await axios.post("http://localhost:3000/instructor/createInstructor", {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,

        });
        console.log(data)
        if (data.error) {
            return alert(data.error);
        }

        void updateState.updateState(true);
        return alert("Signed up Successfully! Please Login");
    };

    return (
        <>
            <div className="w-screen bg-light-grey flex justify-center">
                <div className="h-screen w-form w-1/4 flex justify-center flex-col">
                    <div className="flex flex-col my-5 fade-in border border-gray-200 shadow-md bg-white p-4 rounded-lg">
                        <p className="text-black text-2xl mb-3 font-semibold text-center">
                            Signup as
                        </p>
                        <div className="mb-4 flex justify-center">
                            <div className="rounded-xl border border-gray-250">
                                <button
                                    className={`rounded-xl text-center ${formType === "trainee" ? "bg-indigo-500 text-white" : ""
                                        }`}
                                    onClick={() => setFormType("trainee")}
                                >
                                    Trainee
                                </button>
                                <button
                                    className={`rounded-xl text-center ${formType === "instructor" ? "bg-indigo-500 text-white" : ""
                                        }`}
                                    onClick={() => setFormType("instructor")}
                                >
                                    Instructor
                                </button>
                            </div>
                        </div>
                        {formType === "trainee" && (
                            <div className="fade-in">
                                <div className="inline-group mb-2 row-container ">
                                    <div className="row">
                                        <div className="row-item">
                                            <label className="text-md text-black font-medium mb-1">First Name</label>
                                            <input
                                                className="bg-gray-50 border-2 px-3  border-gray-200 py-1 rounded-lg mb-2 focus:outline-none text-black font-medium"
                                                required
                                                type="text"
                                                placeholder="Enter First Name"
                                                onChange={(e) => {
                                                    setFirstName(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="row-item">
                                            <label className="text-md text-black font-medium mb-1">Last Name</label>
                                            <input
                                                className="bg-gray-50 border-2 border-gray-200 py-1 px-3 rounded-lg mb-2 focus:outline-none text-black font-medium"
                                                required
                                                type="text"
                                                placeholder="Enter Last Name"
                                                onChange={(e) => {
                                                    setLastName(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {/* Add more rows as needed */}
                                </div>

                                <label className="text-md text-black font-medium ">Email</label><br />
                                <input
                                    className="bg-gray-50 border-2 w-full border-gray-200 py-1 px-2 rounded-lg mb-4 focus:outline-none text-black font-medium"
                                    required
                                    type="email"
                                    placeholder="Abc@example.com"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                                <div className="inline-group mb-2 row-container">
                                    <div className="row">
                                        <div className="row-item">
                                            <label className="text-md text-black font-medium mb-1">Password</label>
                                            <input
                                                className="bg-gray-50 border-2 border-gray-200 py-1 px-3 rounded-lg mb-2 focus:outline-none text-black font-medium"
                                                required
                                                placeholder="Enter password"
                                                type="password"
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="row-item">
                                            <label className="text-md text-black font-medium mb-1">Confirm Password</label>
                                            <input
                                                className="bg-gray-50 border-2 border-gray-200 py-1 px-3 rounded-lg mb-2 focus:outline-none text-black font-medium"
                                                required
                                                placeholder="Confirm password"

                                                type="password"
                                                onChange={(e) => {
                                                    setConfirmPassword(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {/* Add more rows as needed */}
                                </div>

                                <div className="inline-group mb-2 row-container">
                                    <div className="row">
                                        <div className="row-item">
                                            <label className="text-md text-black font-medium mb-1">Cohort</label>
                                            <Select
                                                className="bg-gray-50  rounded-lg mb-2 focus:outline-none text-black font-medium"
                                                isSearchable={true}
                                                options={COHORT}
                                                onChange={(e) => {
                                                    setCohort(e.value);
                                                }}
                                                isDisabled={false}
                                                placeholder="Select Cohort"
                                            />
                                        </div>
                                        <div className="row-item">
                                            <label className="text-md text-black font-medium mb-1">Stack</label>
                                            <Select
                                                className="bg-gray-50  rounded-lg mb-2 focus:outline-none text-black font-medium"
                                                isSearchable={true}
                                                options={STACK}
                                                onChange={(e) => {
                                                    setStack(e.value);
                                                }}
                                                isDisabled={false}
                                                placeholder="Select Stack"
                                            />
                                        </div>
                                    </div>
                                    {/* Add more rows as needed */}
                                </div>

                               
                                <p className="text-md text-gray-400  mt-2">
                                    {"Already have an account?  "}
                                    <span
                                        className="hover:text-indigo-500 text-indigo-500 cursor-pointer hover:no-underline"
                                        onClick={() => {
                                            void updateState.updateState(true);
                                        }}
                                    >
                                        Login
                                    </span>
                                </p>
                                <div className="w-full p-4 flex justify-center mt-4">
                                    <button
                                        className={`
                                                        bg-indigo-500 text-white w-36 cursor-pointer focus:outline-none
                                     transition-all duration-300 ease-in-out
                                hover:bg-indigo-600 hover:shadow-md
                                            `}

                                        onClick={() => {
                                            void signup();
                                        }}
                                    >
                                        Sign up
                                    </button>
                                </div>
                            </div>
                        )}
                        {formType === "instructor" && (

                            <div className="fade-in">

                                <div className="inline-group mb-2 row-container ">
                                    <div className="row">
                                        <div className="row-item">
                                            <label className="text-md text-black font-medium mb-1">First Name</label>
                                            <input
                                                className="bg-gray-50 border-2 px-3  border-gray-200 py-1 rounded-lg mb-2 focus:outline-none text-black font-medium"
                                                required
                                                type="text"
                                                placeholder="Enter First Name"
                                                onChange={(e) => {
                                                    setFirstName(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="row-item">
                                            <label className="text-md text-black font-medium mb-1">Last Name</label>
                                            <input
                                                className="bg-gray-50 border-2 border-gray-200 py-1 px-3 rounded-lg mb-2 focus:outline-none text-black font-medium"
                                                required
                                                type="text"
                                                placeholder="Enter Last Name"
                                                onChange={(e) => {
                                                    setLastName(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {/* Add more rows as needed */}
                                </div>

                                <label className="text-md text-black font-medium ">Email</label><br />
                                <input
                                    className="bg-gray-50 border-2 w-full border-gray-200 py-1 px-2 rounded-lg mb-4 focus:outline-none text-black font-medium"
                                    required
                                    type="email"
                                    placeholder="Abc@example.com"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                                <div className="inline-group mb-2 row-container">
                                    <div className="row">
                                        <div className="row-item">
                                            <label className="text-md text-black font-medium mb-1">Password</label>
                                            <input
                                                className="bg-gray-50 border-2 border-gray-200 py-1 px-3 rounded-lg mb-2 focus:outline-none text-black font-medium"
                                                required
                                                placeholder="Enter password"
                                                type="password"
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="row-item">
                                            <label className="text-md text-black font-medium mb-1">Confirm Password</label>
                                            <input
                                                className="bg-gray-50 border-2 border-gray-200 py-1 px-3 rounded-lg mb-2 focus:outline-none text-black font-medium"
                                                required
                                                placeholder="Confirm password"

                                                type="password"
                                                onChange={(e) => {
                                                    setConfirmPassword(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {/* Add more rows as needed */}
                                </div>




                                <p className="text-md text-gray-400  mt-2">
                                    {"Already have an account?  "}
                                    <span
                                        className="hover:text-indigo-500 text-indigo-500 cursor-pointer hover:no-underline"
                                        onClick={() => {
                                            void updateState.updateState(true);
                                        }}
                                    >
                                        Login
                                    </span>
                                </p>
                                <div className="w-full p-4 flex justify-center mt-4">
                                    <button
                                        className={`
                                                        bg-indigo-500 text-white w-36 cursor-pointer focus:outline-none
                                     transition-all duration-300 ease-in-out
                                hover:bg-indigo-600 hover:shadow-md
                                            `}

                                        onClick={() => {
                                            void insSignup();
                                        }}
                                    >
                                        Sign up
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>


                    <div className="w-full  bg-red-900"></div>
                </div>
            </div>
        </>
    );
}

export default Signup;
