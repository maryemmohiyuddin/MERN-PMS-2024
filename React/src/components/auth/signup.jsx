import { useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ROLE = [
    {
        value: "trainee",
        label: "Trainee",
    },
    {
        value: "instructor",
        label: "Instructor",
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


    const signup = async () => {
        const { data } = await axios.post("http://localhost:3000/user/createUser", {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            role,
            cohort,
            stack
        });
        console.log(data)
        if (data.error) {
            return alert("Invalid Credentials");
        }
        if (role == "instructor" && !data.error) {

        }
        return alert("Signed up Successfully");
    };

    return (
        <>
            <div className="w-screen  bg-gray-100 flex justify-center">
                <div className="w-1/4 h-full flex justify-center flex-col ">
                    <div className="w-full flex flex-col my-5 bg-white p-4 rounded-lg">
                        <div className="w-full flex justify-center mb-4 ">
                            <p className="text-black text-2xl font-semibold    ">Signup</p>
                        </div>
                        <label className="text-md text-black font-medium mb-1">
                            First Name
                        </label>
                        <input
                            className="bg-white border-2 border-gray-300 py-1 px-2 rounded-lg mb-2 focus:outline-none text-black font-medium"
                            required
                            type="text"
                            placeholder="First Name"
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                        />
                        <label className="text-md text-black font-medium mb-1">
                            Last Name
                        </label>
                        <input
                            className="bg-white border-2 border-gray-300 py-1 px-2 rounded-lg mb-2 focus:outline-none text-black font-medium"
                            required
                            type="text"
                            placeholder="Last Name"
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                        />
                        <label className="text-md text-black font-medium mb-1">Email</label>
                        <input
                            className="bg-white border-2 border-gray-300 py-1 px-2 rounded-lg mb-2 focus:outline-none text-black font-medium"
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
                            className="bg-white border-2 border-gray-300 py-1 px-2 rounded-lg mb-2 focus:outline-none text-black font-medium"
                            required
                            type="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <label className="text-md text-black font-medium mb-1">
                            Confirm Password
                        </label>
                        <input
                            className="bg-white border-2 border-gray-300 py-1 px-2 rounded-lg mb-2 focus:outline-none text-black font-medium"
                            required
                            type="password"
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                        />
                        <label className="text-md text-black font-medium mb-1">
                            Cohort
                        </label>
                        <input
                            className="bg-white border-2 border-gray-300 py-1 px-2 rounded-lg mb-2 focus:outline-none text-black font-medium"
                            required
                            type="text"
                            onChange={(e) => {
                                setCohort(e.target.value);
                            }}
                        />
                        <label className="text-md text-black font-medium mb-1">
                            Stack
                        </label>
                        <input
                            className="bg-white border-2 border-gray-300 py-1 px-2 rounded-lg mb-2 focus:outline-none text-black font-medium"
                            required
                            type="text"
                            onChange={(e) => {
                                setStack(e.target.value);
                            }}
                        />
                        <label className="text-md text-black font-medium mb-1">Role</label>
                        <Select
                            className="bg-white  rounded-lg mb-2 focus:outline-none text-black font-medium"
                            isSearchable={true}
                            options={ROLE}
                            onChange={(e) => {
                                setRole(e.value);
                            }}
                            isDisabled={false}
                            placeholder="Select Role"
                        />
                        <p className="text-md text-gray-400  mt-2">
                            {"Already have an account?  "}
                            <span
                                className="hover:text-blue-500 cursor-pointer hover:underline"
                                onClick={() => {
                                    void updateState.updateState(true);
                                }}
                            >
                                Login
                            </span>
                        </p>
                        <div className="w-full p-4 flex justify-center mt-4">
                            <button
                                className="bg-blue-500 w-36 disabled:bg-gray-300"
                                disabled={
                                    !(
                                        role &&
                                        firstName &&
                                        lastName &&
                                        email &&
                                        password &&
                                        confirmPassword
                                    )
                                }
                                onClick={() => {
                                    void signup();
                                }}
                            >
                                Sign up
                            </button>
                        </div>
                    </div>
                    <div className="w-full  bg-red-900"></div>
                </div>
            </div>
        </>
    );
}

export default Signup;
