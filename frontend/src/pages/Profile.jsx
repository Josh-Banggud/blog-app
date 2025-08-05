import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import Input from "../components/Input";
import TextButton from "../components/TextButton";

function Profile(){
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const getProfile = async () => {
            try{
                const res = await axios.get('http://localhost:5000/api/auth/profile');
                setProfile(res.data.userProfile);
            } catch(err){
                console.error('Failed to fetch profile', err);
            }
        };
        getProfile();
    }, []);

    return(
        <div className="w-full lg:w-2/3 px-4 md:px-8 flex flex-col lg:flex-wrap gap-4">
            <Card>
                <header className="relative h-48 md:h-64 px-4 md:px-8 pt-8 md:pt-12">
                    hello
                    <div className="absolute right-0 bottom-0 w-fit flex flex-row-reverse gap-1 md:gap-2 mx-4 md:mx-8">
                        <TextButton text="Edit" type={2}/>
                        <TextButton text="Cancel" type={1}/>
                    </div>
                </header>
                <div className="flex flex-col px-4 md:px-8 pb-8 md:pb-12 gap-6">
                    <Input label="Username" placeholder="Enter your username" input={profile?.name}/>
                    <Input label="Email Address" placeholder="Enter your email" input={profile?.email}/>
                    <Input label="Password" placeholder="Enter your password"/>
                </div>
            </Card>
        </div>
    )
}

export default Profile;