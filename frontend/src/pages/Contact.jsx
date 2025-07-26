import React from 'react'

const ContactUs = () => {
  return (
    <div>
       <section className="min-h-screen  text-gray-200 flex items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6">
          Contact Us
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-6">
          Looking to reach out? So are we.
        </p>
        <p className="text-base md:text-lg text-gray-500 mb-4">
          But let’s be honest — no one knows where we are. No phone numbers. No emails. Just vibes.
        </p>
        <p className="text-base md:text-lg text-gray-500 mb-4">
          Maybe we’ll contact you. Maybe we’re already watching.
        </p>
        <p className="text-sm text-gray-600 italic">
          (If you’re serious though, try shouting really loud. It might work.)
        </p>
      </div>
    </section>
    </div>
  )
}

export default ContactUs