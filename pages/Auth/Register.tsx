import axios from "axios";
import { useState } from "react";

import { useAuth } from "../../contex/AuthContex";
import { useNavigate } from "react-router-dom";

function Register() {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [fname, setFname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    async function submit(event: any) {
        event.preventDefault(); //disable default form submission

        if (fname === "" || email === "" || username === "" || password === "") { //validate user inputs
            setError("All fields are required");
            return;
        }

        const data = {
            fname: fname,
            email: email,
            username: username,
            password: password
        }

        try {
            const response = await axios.post("http://localhost:8080/auth/users", data);
            login(response.data); // Assuming registration also logs the user in
            navigate("/");
        } catch (error) {
            setError("There was an error registering");
        }
    }

    return (
        <div className="p-10">
            <div className="max-w-[600px] p-8 shadow-xl rounded-lg mx-auto">
                <div className="text-center mb-5">
                    <h1 className="text-2xl font-semibold">Register</h1>
                </div>

                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label className="block mb-1">First Name</label>
                        <input type="text" onChange={(event) => {
                            setFname(event.target.value);
                            setError("");
                        }} className="block w-full p-2 border border-gray-200 rounded-lg" placeholder="Enter your first name" />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Email</label>
                        <input type="email" onChange={(event) => {
                            setEmail(event.target.value);
                            setError("");
                        }} className="block w-full p-2 border border-gray-200 rounded-lg" placeholder="Enter your email" />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Username</label>
                        <input type="text" onChange={(event) => {
                            setUsername(event.target.value);
                            setError("");
                        }} className="block w-full p-2 border border-gray-200 rounded-lg" placeholder="Enter your username" />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1">Password</label>
                        <input type="password" onChange={(event) => {
                            setPassword(event.target.value);
                            setError("");
                        }} className="block w-full p-2 border border-gray-200 rounded-lg" placeholder="Enter your password" />
                    </div>

                    {error && <div className="text-sm text-red-500">{error}</div>}

                    <div className="mt-8">
                        <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full hover:bg-gray-950">Register</button>
                        
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;