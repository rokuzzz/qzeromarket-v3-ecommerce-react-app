import { Outlet } from 'react-router';
import Navbar from './modules/shared/components/NavBar/Navbar';

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
