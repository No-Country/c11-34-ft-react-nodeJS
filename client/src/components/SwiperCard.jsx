

import PropTypes from 'prop-types';

export function SwiperCard({ card }) {
  return (
    <article className='relative '>

          <img src={card.img} alt='restaurante la boca' 
          className='w-screen object-cover lg:h-[92vh] dt:h-[96vh]'
            />
          {/* Content */}
          <section className="absolute lg:h-[92vh] dt:h-[96vh] w-full bg-black/40 top-0 left-0 flex justify-between items-end text-white px-8 py-12">
          {/* Info */}
          <div className='font-inter flex flex-col gap-y-1'>
              <h2 className='text-2xl font-medium '>{card.title}</h2>
              <p className='text-base leading-5 w-96 font-normal'>{card.subtitle}</p>
            </div>
          </section>
    </article>
  )
}

SwiperCard.propTypes = {
    card: PropTypes.shape({
      img: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
}).isRequired,
}


