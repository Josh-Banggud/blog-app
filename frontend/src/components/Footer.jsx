import IconButton from "./IconButton";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import TextButton from "./TextButton";

function Footer() {
    return(
        <footer className="w-full fixed bottom-0 flex items-center justify-center bg-stone-950 border-stone-900 font-bold p-2">
            <p className="text-orange-50 text-xs font-light">
                Made by Josh Banggud
            </p>
        </footer>
    )
}

export default Footer;