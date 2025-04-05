import poster from '../assets/gif-frame.jpg'

export default function BlackSection() {
    return (
    <section>
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden bg-white flex align-middle justify-center">
          <video
            poster={poster}
            className=" w-[90%] h-full object-cover rounded-md bg-white/5 ring-1 ring-white/10"
            title="video"
            autoPlay
            loop
            muted
            playsInline
            src="https://videos.ctfassets.net/hzjmpv1aaorq/1jyp4t5GfvTq4ayS8pGoSW/bff000cf3f9e51e5bf7a3e5775f44bd0/Hero_noring_comp.mp4"
          ></video>
        </div>
      </div>
    </section>
    );
  };
  