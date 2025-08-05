function Card({ children, cardStyle}) {
    return(
        <div className={`flex flex-col gap-2 bg-orange-50 border-2 md:border-3 border-slate-950 rounded-md shadow-sharp overflow-clip ${cardStyle}`}>
            {children}
        </div>
    )
}

export default Card;