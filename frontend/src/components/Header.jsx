import { faUser, faHome } from "@fortawesome/free-regular-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import TextButton from "./TextButton";
import IconButton from "./IconButton";

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = !!localStorage.getItem("token");
    const username = !!localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).name : null;

    return(
        <header className="w-full flex items-center justify-center bg-orange-50 border-b-3 border-stone-900 p-4 md:px-6 mb-4 lg:mb-8 z-40">
            <div className="w-full md:w-3/4 lg:w-2/3 flex justify-between"> 
                <h1 className="text-2xl lg:text-3xl font-bold" onClick={() => navigate("/")}>
                    ArtBlock                                                                                      
                </h1>
                <div className="flex flex-row-reverse items-center gap-1 md:gap-2">
                    {isAuthenticated && location.pathname == "/auth/profile" && <IconButton icon={faHome} onClick={() => navigate("/")}/>}
                    {isAuthenticated && location.pathname != "/auth/profile" && <IconButton icon={faUser} onClick={() => navigate("/auth/profile")}/>}
                    {isAuthenticated && <p className="text-sm/4 md:text-base/5 font-light text-right pl-4">
                            New art awaits, {username}!
                        </p>
                    }
                    {!isAuthenticated && <TextButton text="Login" type={2} onClick={() => navigate("/auth/login")}/>}
                    {!isAuthenticated && <TextButton text="Sign Up" type={1} onClick={() => navigate("/auth/signup")}/>}
                </div>
            </div>
        </header>
    )
}

export default Header;