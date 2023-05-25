export function CardTastes({ name, img}) {
    return (
        <div className="flex flex-col w-52 justify-center items-center my-5 mx-auto hover:transition duration-200 hover:scale-110 hover:border-b-2 hover:border-gray-400">
            <div className="w-full h-full">
                <img
                    className="rounded-lg object-cover w-52 h-96"
                    src={img} alt={name}
                />
            </div>
            <div className="flex justify-center w-52 ">
                <h3 className="text-3xl text-black-500 font-medium">
                    {name}
                </h3>
            </div>
        </div>
    );
}