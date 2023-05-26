export function CardTastes({ name, img}) {
    return (
        <div className="flex flex-col w-60   justify-center items-center mx-auto hover:transition duration-200 hover:scale-105 hover:border-b-2 hover:border-gray-400">
            <div className="w-full h-full">
                <img
                    className="rounded-lg object-cover w-60 h-[25rem] "
                    src={img} alt={name}
                />
            </div>
            <div className="flex justify-center w-52 ">
                <h3 className="text-3xl text-black-500 font-medium font-montserrat">
                    {name}
                </h3>
            </div>
        </div>
    );
}
