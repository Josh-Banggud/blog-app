function TextButton({text, onClick, type}) {
    return(
        <div className={`flex items-center justify-center px-2 py-1 text-sm md:text-base rounded-lg
            ${type == 1 ? "bg-orange-50 border-2": type == 2 ? "bg-stone-950 border-2 border-stone-950 text-orange-50" : ""}
            `} onClick={onClick}>
            {text}
        </div>
    )
}

export default TextButton;  