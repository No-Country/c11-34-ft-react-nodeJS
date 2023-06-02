export function CardTastes({ name, img, width, height}) {



    return (
        <div className={`flex flex-col ${width} justify-center items-center hover:transition duration-200 hover:scale-105 hover:border-b-2 hover:border-gray-400`}>
            <div className={`${height} ${width}`}>
                <img
                    className={`rounded lg object-cover ${width} ${height}`}
                    src={img} alt={name}
                />
            </div>
            <div className="flex justify-center pt-1.5 pb-4 ">
                <h3 className="text-base text-black-500 font-medium font-montserrat">
                    {name}
                </h3>
            </div>
        </div>
    );
}
