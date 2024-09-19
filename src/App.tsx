import { Outlet } from 'react-router';

import Navbar from './modules/shared/components/NavBar/Navbar';
import { Toaster } from './modules/shared/components/ui/toaster';

const App = () => {
  return (
    <div>
      <div className='flex align-center justify-center py-2'>
        <p className='text-[10px] font-thin text-neutral-500'>
          FREE SHIPPING ON ORDERS OVER 250€*
        </p>
      </div>
      <Navbar />
      <main className='px-0 sm:px-8 md:px-16 xl:px-40'>
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};

export default App;
