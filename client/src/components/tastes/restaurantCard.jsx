
export default function RestaurantCard({ name, img, latitude, longitude, average }) {
  return (
      <div className="containerCard h-full w-full my-5 mx-auto hover:transition duration-200 hover:scale-110 ">
        <div className="w-full h-36 ">
          <img
            className="rounded-lg object-fill w-full h-36"
            src={img} alt={name}
          />
        </div>
        <div className="flex justify-around my-6 w-full">
          <div className="containerRestaurantName">
            <h3 className="text-base font-bold text-slate-500">
                {name}
            </h3>
            <h3 className="text-xs font-normal  text-slate-500">
              descripcion
            </h3>
          </div>
          <div className="flex flex-col justify-center content-center ">
            <div className="flex pb-0.5">
              <img className="w-3.5 h-3.5"
                src="https://img.icons8.com/?size=512&id=104&format=png"
                alt="stars"
              />
              <h3 className="text-xs font-normal text-slate-500"> {average} </h3>
            </div>
            <div className=" flex pt-0.5">
              <img
                className="w-3.5 h-3.5"
                src="https://img.icons8.com/?size=512&id=3723&format=png"
                alt="location"
              />
              <p className="text-xs font-normal text-slate-500"><Distance latitudDestiRestaurant={latitude} longitudRestaurant={longitude}/></p>
            </div>
          </div>
        </div>
      </div>
  );
}
