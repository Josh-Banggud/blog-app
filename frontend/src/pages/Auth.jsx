import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import Input from "../components/Input";
import TextButton from "../components/TextButton";
import IconButton from "../components/IconButton";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";

function Auth(){
    
    return(
        <div className="w-full h-screen flex flex-col items-center justify-center p-5 md:p-10">
            <Card cardStyle="w-full h-full lg:w-2/3">
                <div className="relative w-full">
                    <div className="absolute right-0 p-2">
                        <IconButton icon={faXmarkCircle} customStyle="border-none !text-4xl"/>
                    </div>
                </div>
                <div className="h-1/2 m-auto flex flex-col items-center justify-around">
                    <h1 className="text-5xl md:text-8xl text-center font-bold pb-12">
                        ArtBlock                                                                                     
                    </h1>
                    <div className="flex flex-col items-center px-4 md:px-8 gap-4">
                        <Input label="Username" placeholder="Enter your username"/>
                        <Input label="Email Address" placeholder="Enter your email"/>
                        <Input label="Password" placeholder="Enter your password"/>
                        <div className="w-full pt-4">
                            <TextButton text="Submit" type={2}/>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Auth;