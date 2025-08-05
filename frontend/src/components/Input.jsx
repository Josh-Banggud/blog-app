function Input({label, placeholder, input = ""}){
    return(
        <div className="w-full">
            <label className="">
                {label}
            </label>
            <input className={`w-full border-2 border-stone-950 rounded-sm font-light inner-shadow-sharp px-3 py-2 
                    ${input ? "bg-stone-100" : "bg-orange-50"}`
                } placeholder={input ? input : placeholder}>
            </input>
        </div>
    )
}

export default Input;