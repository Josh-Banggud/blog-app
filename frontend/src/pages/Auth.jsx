import { use, useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import Card from "../components/Card";
import Input from "../components/Input";
import TextButton from "../components/TextButton";
import IconButton from "../components/IconButton";
import Modal from "../components/Modal";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";

function Auth(){
    const location = useLocation();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState({
        show: false,
        title: "",
        text: ""
    });
    
    const handleSubmit = async () => {
        if (!email.trim() || !password.trim()) {
            setShowModal({
                show: true,
                title: "Missing Credentials",
                text: "Your email and password are required. Please fill up the missing information."
            });
            return;
        }

        if (location.pathname === "/auth/signup" && !username.trim()) {
            setShowModal({
                show: true,
                title: "Missing Username",
                text: "Your username is required for signing up. Please fill up the missing information."
            });
            return;
        }
        const payload = {
            email,
            password,
            ...(location.pathname === "/auth/signup" && { name: username })
        }

        if (location.pathname === "/auth/signup") {
            axios.post("http://localhost:5000/api/auth/sign-up", payload)
                .then(() => navigate("/"))
                .catch(err => {
                    setShowModal({
                        show: true,
                        title: "Email Already In Use",
                        text: "You need to use a unique email for your account. Please choose a different email address to continue."
                    });
                    console.error(err);
                });
        } else {
            axios.post("http://localhost:5000/api/auth/login", payload)
                .then(res => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                navigate("/");
                })
                .catch(err => {
                    setShowModal({
                        show: true,
                        title: "Incorrect Credentials",
                        text: "Your email and/or password are incorrect. Please try again."
                    });
                    console.error(err);
                });
        }
    }

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden"; 
        } else {
            document.body.style.overflow = "auto";
        }
        
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showModal]);

    
    return(
        <div className="relative w-full h-screen flex flex-col items-center justify-center p-5 md:p-10">
            <Card cardStyle="w-full h-full lg:w-2/3">
                <div className="relative w-full">
                    <div className="absolute right-0 p-2">
                        <IconButton icon={faXmarkCircle} customStyle="border-none !text-4xl" onClick={() => navigate(-1)}/>
                    </div>
                </div>
                <div className="h-1/2 m-auto flex flex-col items-center justify-around">
                    <header className="pb-12 flex flex-col">
                        <h1 className="text-6xl md:text-8xl text-center font-bold">
                            ArtBlock                                                                                     
                        </h1>
                        <h2 className="font-light text-center">
                            Where inspiration finds you
                        </h2>
                    </header>
                    <div className="flex flex-col items-center px-4 md:px-8 gap-4">
                        {location.pathname == "/auth/signup" && <Input label="Username" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)}/>}
                        <Input label="Email Address" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)}/>
                        <Input label="Password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} type="password"/>
                        <div className="w-full pt-4">
                            <TextButton text="Submit" type={2} onClick={() => handleSubmit()}/>
                        </div>
                    </div>
                </div>
            </Card>
            {showModal.show && <div className="fixed inset-0 w-screen h-screen flex justify-center items-center bg-stone-950/50 backdrop-blur-xs z-50">
                    <Modal text={showModal.text} title={showModal.title} onClick={() => setShowModal({...showModal, show: false})}
                    />
                </div>
            }
        </div>
    )
}

export default Auth;