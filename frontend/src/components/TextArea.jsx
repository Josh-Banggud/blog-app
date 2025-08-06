function TextArea({label, placeholder, value="", onChange, disabled=false, inputStyle="", rows="12"}) {
    return(
        <div className="w-full">
            <label className="">
                {label}
            </label>
            <textarea className={`w-full h-full font-light px-3 py-2 border-2 border-stone-950 rounded-sm inner-shadow-sharp focus:outline-none
                    ${inputStyle} ${disabled ? "bg-stone-400" : "bg-orange-50"}`
                } placeholder={placeholder}
                value={value}
                rows={rows}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    )
}

export default TextArea;