import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";
import Input from "../components/Input";
import TextButton from "../components/TextButton";

function Profile(){
    const [profile, setProfile] = useState({});
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const [willEdit, setWillEdit] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getProfile = async () => {
            try{
                const res = await axios.get('http://localhost:5000/api/auth/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                setProfile(res.data.userProfile);
            } catch(err){
                console.error('Failed to fetch profile', err);
            }
        };
        getProfile();
    }, []);
    
    const updateProfile = async () => {
        try{
            const token = localStorage.getItem("token");
            const response = await axios.put(
                "http://localhost:5000/api/auth/profile/update",
                {
                    name: profile.name,
                    email: profile.email,
                    password: profile.password || undefined
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const { user, forceLogout, message } = response.data;

            if (forceLogout) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/auth/login");
            } else {
                localStorage.setItem("user", JSON.stringify(user));
                setProfile({ ...profile, password: "" });
                setWillEdit(false);
            }
        } catch (err) {
            console.error("Profile update failed", err);
        }
    }

    return(
        <div className="w-full lg:w-2/3 px-4 md:px-8 flex flex-col lg:flex-wrap gap-4">
            <Card>
                <header className="relative h-12 md:h-24 px-4 md:px-8 pt-8 md:pt-12">
                    <div className="absolute right-0 bottom-0 w-fit flex flex-row-reverse gap-1 md:gap-2 mx-4 md:mx-8">
                        {!willEdit && <TextButton text="Edit" type={2} onClick={() => {setWillEdit(true); setResetPassword(false); setProfile((prev) => ({
                            ...prev,
                            password: "",
                        }));}}/>}
                        {willEdit && <TextButton text="Confirm" type={2} onClick={() => updateProfile()}/>}
                        {willEdit && <TextButton text="Cancel" type={1} onClick={() => {setWillEdit(false); setProfile((prev) => ({
                            ...prev,
                            name: user.name,
                            email: user.email,
                        }));}}/>}
                    </div>
                </header>
                <div className="flex flex-col px-4 md:px-8 pb-8 md:pb-12 gap-6">
                    <Input label="Username"
                        placeholder="Enter your new username"
                        value={profile?.name}
                        disabled={!willEdit}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                    <Input label="Email Address"
                        placeholder="Enter your new email" 
                        value={profile?.email}
                        disabled={!willEdit}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                    {resetPassword && <Input label="Password"
                        placeholder="Enter your new password"
                        value={profile?.password}
                        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                        type="password"
                    />}
                    <footer className="w-fit self-center flex flex-col gap-4">
                        {!resetPassword && <TextButton text="Change Password" type={1} onClick={() => {setResetPassword(true); setWillEdit(false); setProfile((prev) => ({
                            ...prev,
                            name: user.name,
                            email: user.email,
                        }));}}/>}
                        {resetPassword && <div className="w-fit self-center flex flex-row gap-2">
                            <TextButton text="Confirm" type={2} onClick={() => updateProfile()} disabled={!profile.password}/>
                            <TextButton text="Cancel" type={1} onClick={() => {setResetPassword(false); setProfile((prev) => ({
                                ...prev,
                                password: "",
                            }));}}/>
                        </div>}
                        <TextButton text="Log Out" type={2} onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            navigate("/");
                        }}/>
                    </footer>
                </div>
            </Card>
        </div>
    )
}

export default Profile;