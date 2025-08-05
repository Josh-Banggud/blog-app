import IconButton from "./IconButton";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import TextButton from "./TextButton";

function Header() {
    return(
        <header className="w-full sticky top-0 flex items-center justify-center bg-orange-50 border-b-3 border-stone-900 p-4 md:px-6 mb-4">
            <div className="w-full lg:w-2/3 flex justify-between"> 
                <h1 className="text-2xl lg:text-3xl font-bold">
                    ArtBlock                                                                                      
                </h1>
                <div className="flex flex-row-reverse gap-1 md:gap-2">
                    <IconButton icon={faUser}/>
                    <TextButton text="Login" type={2}/>
                    <TextButton text="Sign Up" type={1}/>
                </div>
            </div>
        </header>
    )
}

export default Header;