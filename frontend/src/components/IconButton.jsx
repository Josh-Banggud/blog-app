import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function IconButton({icon, onClick, iconStyle, interactStyle, customStyle}) {
    return(
        <div className={`flex items-center justify-center w-8 md:w-9 lg:w-10 aspect-square p-1 bg-orange-50 border-2 border-stone-950 text-sm rounded-full ${customStyle} ${interactStyle} ${iconStyle}`} onClick={onClick}>
            <FontAwesomeIcon icon={icon} className={`text-base lg:text-lg ${customStyle}`}/>
        </div>
    )
}

export default IconButton;  