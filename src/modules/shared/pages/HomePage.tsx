import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import homePageImage from '../assets/images/home-background-image.jpg';

const HomePage: React.FC = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center space-y-4 text-center'>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                Welcome to QZM
              </h1>
              <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
                Discover our latest collection of premium products. Quality
                meets style in every item.
              </p>
            </div>
            <div className='w-full max-w-sm space-y-2'>
              <Button className='w-full' size='lg'>
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className='w-full py-12 md:py-24 lg:py-32 mb-8 bg-gray-100 dark:bg-gray-800'>
        <div className='container px-4 md:px-6'>
          <div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
            <img
              alt='QZM Store Featured Poster'
              className='mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last'
              height='310'
              src={homePageImage}
              width='550'
            />
            <div className='flex flex-col justify-center space-y-4'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                  Experience Quality Like Never Before
                </h2>
                <p className='max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                  Our products are crafted with the finest materials and
                  attention to detail. Elevate your lifestyle with our curated
                  selection.
                </p>
              </div>
              <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                <Button size='lg'>
                  <Link to={'/products'}>View Collection</Link>
                </Button>
                <Button size='lg' variant='outline'>
                  <Link to={'#'}>Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
