import {countries} from '../utils/Countries.js';


export function Categories() {

    return (
        <div className="lg:flex flex-row items-center gap-2.5 hidden ">
            {countries.map((country, index) => (
                <button className="flex flex-row items-center justify-center h-10 px-2 gap-1 border border-border-color rounded-full text-xs text-subtitle transition ease-in-out duration-700 hover:bg-bg-hover" key={index}>
                    <img src={country.image} alt={country.name} />
                    <span className="whitespace-nowrap">{country.name}</span>  
                </button>
            ))}
        </div>
      );
}