function Input({label, placeholder, value="", onChange, type="text", disabled=false, inputStyle=""}){
    return(
        <div className="w-full">
            <label className="">
                {label}
            </label>
            <input className={`w-full font-light px-3 py-2 focus:outline-none
                    ${!inputStyle ? "border-2 border-stone-950 rounded-sm inner-shadow-sharp" : inputStyle}
                    ${disabled ? "bg-stone-400" : "bg-orange-50"}`
                } placeholder={placeholder} type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    )
}

export default Input;