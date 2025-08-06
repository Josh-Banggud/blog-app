import TextButton from "./TextButton";

function Modal({text, title, onClick, onClick2}){
    return(
        <div className="h-48 md:h-64 w-72 md:w-96 flex flex-col justify-center items-center bg-orange-50 border-2 md:border-3 border-slate-950 p-4 md:p-6 rounded-md shadow-sharp text-center gap-6">
            <div className="flex flex-col justify-center items-center gap-2">
                <h1 className="text-lg md:text-xl font-bold">
                    {title}
                </h1>
                <p className="text-xs md:text-sm font-light">
                    {text}
                </p>
            </div>
            <div className="flex gap-4">
                <TextButton text="Ok" type={1} onClick={onClick}/>
                {onClick2 && <TextButton text="Cancel" type={2} onClick={onClick2}/>}
            </div>
        </div>
    )
}

export default Modal;