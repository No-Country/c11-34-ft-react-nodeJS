import magnifyingGlass from '../assets/magnifying-glass.svg';
import { Selector } from './Selector';
import calendar from '../assets/calendar.svg';
import clock from '../assets/clock.svg';
import user from '../assets/user.svg';

export function SearchBar() {

  return (
    <div className="w-full gap-3 flex flex-col mt-5 lg:flex-row lg:border lg:border-gray-300 lg:rounded-full lg:p-6">
        <div className="relative flex items-center px-8 py-4 rounded-full border border-gray-300 lg:border-0 lg:grow">
            <input className="flex items-center gap-10 relative w-full text-sm lg:w-auto lg:grow" placeholder="Buscar por ubicacion, restaurante" />
            <img src={magnifyingGlass} alt="magnifying glass" width={20} height={20} className='absolute left-2'/>
        </div>
        <div className='flex flex-row items-center px-6 py-2 rounded-full border border-gray-300 lg:border-0 w-full lg:w-auto lg:grow lg:justify-between'>
            <Selector textDefault={'12/5/23'} image={calendar}/>
            <Selector textDefault={'18:00'} image={clock}/>
            <Selector textDefault={'2'} image={user}/>
        </div>
        <button className="bg-black text-white px-6 py-4 rounded-full w-full lg:w-auto">Buscar</button>
    </div>
  )
}