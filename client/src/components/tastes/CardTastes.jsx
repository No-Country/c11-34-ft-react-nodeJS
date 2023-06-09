export function CardTastes({ name, img, isSelected}) {

    return (
        <div className={`flex flex-col w-auto justify-center items-center transition duration-200 `}>
            <div className='relative group hover:scale-[1.03] transition-transform'>
                <img
                    className={`rounded-lg object-cover w-96 h-44 md:w-48 md:h-[26rem] dt:w-56 mb-4`}
                    src={img} alt={name}
                />
                <div className={`${!isSelected ? 'bg-black/50 ' : 'bg-transparent'} top-0 left-0 absolute h-44  md:h-[26rem] w-full group-hover:bg-transparent transition-all `}></div>
            </div>
            <div className="flex justify-center  ">
                <h3 className="text-base text-black-500 font-bold font-montserrat lg:text-2xl">
                    {name}
                </h3>
            </div>
        </div>
    );
}
