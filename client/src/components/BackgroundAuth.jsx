import placeholder from '../assets/Vector.svg'

export function BackgroundAuth() {
  return (
    <section className="hidden lg:col-span-5 dt:col-span-8 bg-[#EFEFF0] rounded-3xl h-full lg:flex justify-between items-end px-12 py-16 relative ">
    
          {/* Info */}
            <div className=''>
              <h2 className='text-2xl font-medium'>Lorem ipsum</h2>
              <p className='text-lg w-96 font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi aut</p>
            </div>
    
            {/* Buttons Slide */}
            <div className='flex gap-x-4 items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='bg-white p-1 rounded-full'><path d="M15 4l-8 8 8 8"/></svg>       
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='bg-white p-1 rounded-full'><path d="M8 4l8 8-8 8"/></svg>
            </div>
    
            {/* Placeholder svg */}
            <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
              <img src={placeholder} alt='placeholder'/>
            </div>
            {/* Placeholder svg */}
            <div className='absolute top-12 left-12 opacity-60'>
              <img src={placeholder} alt='placeholder'/>
            </div>
    </section>
  )
}
