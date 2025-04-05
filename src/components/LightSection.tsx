type SecData = {
  title: string,
  desc: string,
  imgUrl: string,
  url?: string,
  btnLabel?: string,
  pdf?: boolean
}

export default function LightSection({secData}: {secData: SecData}) {
  return (
  <section>
    <div className="max-ctn pad-y pad-x flex flex-wrap-reverse justify-between items-center gap-16">
      <div className="w-full max-w-lg">
        <h3 className="text-3xl font-bold mb-6 max-md:!text-2xl "> 
          {secData.title}
        </h3>
        <p className="desc mb-4 md:mb-10 lg:mb-6 font-normal max-md:!text-lg">
          {secData.desc}
        </p>
        {!secData.pdf && <a href="#" className="primaryBtn">Explore Copy Trading <span className="ml-3">&rarr;</span></a>}
        {secData.pdf && <a href={secData.url} target="_blank" rel="noopener noreferrer" className="primaryBtn">{secData.btnLabel} <span className="ml-3">&rarr;</span></a>}
      </div>

      <div className='w-full max-w-md'>
        <img src={secData.imgUrl} alt='copy trade' className='w-full'/>
      </div>
    </div>
  </section>
  );
};