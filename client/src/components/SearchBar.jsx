import magnifyingGlass from '../assets/magnifying-glass.svg';
import { Selector } from './Selector';
import calendar from '../assets/calendar.svg';
import clock from '../assets/clock.svg';
import user from '../assets/user.svg';
import filter from '../assets/filter.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function SearchBar() {

  const navigate = useNavigate()

  const [search, setSearch] = useState('')

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/result?search=${search}`)
  }



  return (
    <form onSubmit={handleSubmit} className="w-full gap-2.5 flex flex-col lg:items-center my-5 lg:flex-row lg:border-2 lg:border-border-color rounded-full lg:py-3.5 lg:px-5 lg:w-4/5 mx-auto">
        <div className="relative flex items-center py-4 rounded-full border border-border-color lg:border-0 lg:grow">
            <input value={search} onChange={handleChange} className="flex items-center pl-9 gap-10 relative w-full text-sm text-subtitle lg:w-auto lg:grow outline-0" placeholder="Buscar por ubicacion, restaurante" />
            <img src={magnifyingGlass} alt="magnifying glass" width={20} height={20} className='absolute left-2 lg:left-1'/>
            <img src={filter} alt="filter" width={20} height={20} className='absolute right-2 w-6 h-6 lg:hidden'/> 
        </div>
        <div className="hidden lg:flex">
          <Selector textDefault={'12/5/23'} image={calendar} type='calendar'/>
          <Selector textDefault={'18:00'} image={clock} type='clock'/>
          <Selector textDefault={'2'} image={user} type='people'/>
        </div>

        <button type='submit' className="hidden lg:block bg-black-light text-white px-6 p-2.5 rounded-full w-full lg:w-auto font-inter text-sm">Buscar</button>
    </form>
  )
}