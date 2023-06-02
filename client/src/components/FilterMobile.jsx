import x from '../assets/x.svg'
import { Selector } from './Selector';
import calendar from '../assets/calendar.svg';
import clock from '../assets/clock.svg';
import user from '../assets/user.svg';
import {Checkbox} from './Checkbox'


export function FilterMobile({isOpenFilter, setIsOpenFilter}) { 

  const closeFilter = () => {
    setIsOpenFilter(false);
  }

  return (
        <div className={`${isOpenFilter ? 'bottom-0' : '-bottom-full'} fixed  left-0 w-full h-3/4 bg-bg-color z-10 flex flex-col justify-between items-center pt-5 pb-24 px-10 transition-all duration-[400ms]`}>
            <div className="flex flex-row gap-8 justify-center w-full font-inter relative">
                <button onClick={closeFilter} type='button' className='absolute top-0 left-2'>
                    <img src={x} alt='close-icon' className='w-8 h-6 icon-color'/>
                </button>
                <h2>Filtros</h2>
            </div>
            <div className="flex">
                <Selector textDefault={'12/5/23'} image={calendar} type='calendar'/>
                <Selector textDefault={'18:00'} image={clock} type='clock'/>
                <Selector textDefault={'2'} image={user} type='people'/>
            </div>
            <div className="flex flex-col gap-4 w-full">
                <h3 className="mb-2.5 font-montserrat font-bold text-xl">Cocina</h3>
                <Checkbox />
            </div>
            
            <button type='submit' className="bg-black-light text-white px-6 p-2.5 rounded-full w-full lg:w-auto font-inter text-sm" onClick={closeFilter}>Buscar</button>     
        </div>
  )
}