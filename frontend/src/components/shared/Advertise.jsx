import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Advertise = () => {
  return (
    <div className='flex flex-col md:flex-row p-4 border border-gray-300 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center bg-white shadow-md'>

      <div className='flex-1 flex flex-col p-4 w-full'>
        <h2 className='text-2xl font-semibold'>
          Curious about today’s <span className='text-red-600'>Top Tech Highlights</span>?
        </h2>

        <p className='text-gray-600 my-2'>
          Discover trending stories in startups, AI breakthroughs, gadget releases, and more.
        </p>

        <Button className='bg-blue-600 hover:bg-blue-700 text-white text-md mt-3 px-4 py-2 w-fit mx-auto'>
          <Link
            to='/posts'
            className='whitespace-nowrap'
            target='_self'
            rel='noopener noreferrer'
          >
            Explore Today’s Insights
          </Link>
        </Button>
      </div>

      <div className='p-4 w-full md:w-2/5'>
        <img
          src='https://images.pexels.com/photos/6335/man-coffee-cup-pen.jpg'
          alt='TechTrendz - Stay Informed'
          className='w-full rounded-lg object-cover shadow-sm'
        />
      </div>
    </div>
  );
};

export default Advertise;
