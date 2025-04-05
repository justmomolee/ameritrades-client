import mapIMG from '../assets/map.png'

export default function Map() {
  return (
    <section>
      <div className='max-ctn'>
        <img src={mapIMG} alt='map' className='w-full'/>
      </div>
    </section>
  )
}
