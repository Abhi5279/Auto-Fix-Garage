import React from 'react'

const About = () => {
  return (
    <div>
          <section className="min-h-screen  text-gray-200 flex items-center justify-center px-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6">
          About Us
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8">
          You were probably expecting something about our garage, right?
        </p>
        <p className="text-base md:text-lg text-gray-500 mb-4">
          But here's the thing... sometimes, the best stories are left untold.  
        </p>
        <p className="text-base md:text-lg text-gray-500 mb-4">
          Maybe we fix cars. Maybe we fix hearts. Who knows?
        </p>
        <p className="text-base md:text-lg text-gray-500 mb-8">
          One thing’s for sure though — you’re in the right place.
        </p>
        <p className="text-sm text-gray-600 italic">
          (Check back later. Or don't. We won't mind.)
        </p>
      </div>
    </section>
    </div>
  )
}

export default About