import { Link } from 'react-router-dom'
import arrowLeft from '../assets/arrow-left.svg'
import arrowRight from '../assets/arrow-right.svg'
import logoWhite from '../assets/logo-white.svg'

export function BackgroundAuth() {
  return (
    <section className="hidden lg:col-span-5 dt:col-span-7 overflow-hidden rounded-3xl h-full lg:flex justify-between items-end px-12 py-16 relative ">
          <img src='https://a.storyblok.com/f/53624/1365x1800/5f945a262a/two-men-on-a-colorful-balcony-in-caminito-la-boca-buenos-aires.jpg' alt='restaurante la boca' 
          className='w-full h-full object-cover absolute top-0 left-0 rounded-3xl'
          />
         <section className="absolute h-full w-full bg-black/40 top-0 left-0 flex justify-between items-end text-white px-8 py-12">
           {/* Info */}
           <div className='font-inter flex flex-col gap-y-1'>
              <h2 className='text-2xl font-medium '>Sabores del Riachuelo</h2>
              <p className='text-base leading-5 w-96 font-normal'>Inspirado en la rica historia y cultura de La Boca, este establecimiento ofrece una experiencia culinaria única que celebra los sabores auténticos y tradicionales de la región.</p>
            </div>
    
            {/* Buttons Slide */}
            <div className='flex gap-x-6 items-center'>
              <button>
                <img src={arrowLeft}/> 
              </button>
              <button>
                <img src={arrowRight}/>
              </button>
            </div>
         </section>
    
        <Link to='/' className=' transition-transform cursor-pointer'>
          <img src={logoWhite} alt='logo morfi' className='absolute top-8 left-10 hover:scale-95'/>
        </Link>
            
    </section>
  )
}
