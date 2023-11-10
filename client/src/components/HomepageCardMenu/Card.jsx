const Card = ({ text, setMenu }) => {
    return (
        <div class="bg-gray-300 w-32 h-52 rounded-md shadow-2xl hover:mr-64 hover:text-amber-600 transition cursor-pointer"
        onClick={() => setMenu(text)}>
            <h2 class="uppercase rotate-90 pl-[40px] pt-[95px]">
                {text}
            </h2>
        </div>
    )
}

export default Card;