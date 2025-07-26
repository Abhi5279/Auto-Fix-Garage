import React from 'react';

const MyProfile = () => {
  return (
    <div className=' min-h-screen flex flex-col items-center justify-center text-white px-4 py-12'>
      <h2 className='text-4xl font-bold text-yellow-400 mb-6 underline underline-offset-8'>
        My Profile?
      </h2>

      <p className='text-center max-w-xl text-lg leading-relaxed text-gray-300'>
        Seriously? You're checking your profile? <br />
        Bro... you literally just filled this in. <br />
        <span className='text-yellow-400 font-semibold'>What do you think changed?</span>
      </p>

      <p className='mt-6 text-sm text-gray-400 italic'>
        Still curious? Sorry, there’s nothing spicy here. Just your legendary self.
      </p>

      <p className='mt-10 text-xs text-gray-600'>
        ⚠️ Warning: Excessive profile checking may lead to overconfidence 😎
      </p>
    </div>
  );
};

export default MyProfile;
