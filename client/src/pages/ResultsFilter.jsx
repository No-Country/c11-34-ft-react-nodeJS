import { NavBarUI, SearchBar } from "../components";
import MapRestaurant from "../components/map/map";
import { countries, galleryCards } from "../utils";

export function ResultsFilter() {

    const randomRestaurant = galleryCards[0]
  return (
    <main className="">
        {/* TODO : Modularizar secciones, ya que cada uno tendra logica */}
        <NavBarUI />
        <SearchBar />
        <section className="grid grid-cols-1 lg:grid-cols-12 w-full px-8 lg:px-20 h-[76vh] gap-4 lg:overflow-hidden">
            <section className="col-span-3 ">
                <h3 className="mb-2.5 font-montserrat font-bold text-xl">Cocina</h3>

                {/* Section Checkbox */}
                <section className="flex flex-col gap-y-3">
                    {
                        countries.map(countrie => {

                            const name = countrie.name.split(' ')[1]

                            return (
                            
                            <div className="w-full flex justify-between" key={countrie.name}>
                                <label className="font-inter font-medium text-lg">{name}</label>
                                <input id={name} value={name} type="checkbox" className="w-4 h-4 rounded text-red-400 border border-border-color"/>
                            </div>
                            )
                        })
                    }
                </section>

                
                <h3 className="mt-6 mb-2.5 font-montserrat font-bold text-xl">Rango de precios</h3>
               
                {/* Section Price Range */}
                <input  type="range" value="50" className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-subtitle mb-6" />
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    <p className="font-semibold font-inter text-base">$-$$</p>
                    <p className="font-semibold text-subtitle font-inter">Promedio: <span className="text-black">$500</span></p>
                </div>


            </section>
            <section className="col-span-6 h-full bg-green-200">
                <MapRestaurant 
                    latitude={randomRestaurant.latitude}
                    longitude={randomRestaurant.longitude}
                    name={randomRestaurant.title}
                    height={"h-full"}
                    width={"w-full"}
                />
            </section>

            {/* Result Section */}
            <section className="col-span-3 flex flex-col gap-y-4 ">
                <h3 className="font-montserrat font-semibold lg:font-medium text-xl">16 resultados</h3>
                <section className="flex flex-col gap-y-3 overflow-y-auto items-center h-auto lg:h-screen pb-24 lg:pb-56 dt:pb-80 lg:pr-2.5">
                    {
                        galleryCards.slice(0, 4).map(card => (
                            <article key={card.id} className="flex flex-col gap-y-3">
                                <img src={card.img} alt={card.title} className="rounded-xl w-full h-72 object-cover"/>
                                <h3 className="font-montserrat font-medium text-xl">{card.title}</h3>
                                <p className="text-subtitle">23m</p>
                                <p className="font-inter font-semibold ">${card.priceRange}</p>
                            </article>
                        ))
                    }
                </section>
            </section>
        </section>
    </main>
  )
}
