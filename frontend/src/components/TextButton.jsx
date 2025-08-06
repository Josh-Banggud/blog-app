function TextButton({text, onClick, type, disabled=false}) {
    return(
        <div className={`flex items-center justify-center px-2 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-lg
            ${type == 1 ? "bg-orange-50 border-2": type == 2 ? "bg-stone-950 border-2 border-stone-950 text-orange-50" : ""}
            ${disabled ? "!bg-stone-500 !border-stone-500": ""}
            `}
            onClick={!disabled ? onClick : () => {}}
            >
            {text}
        </div>
    )
}

export default TextButton;  