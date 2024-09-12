import { Outlet } from 'react-router';

const App = () => {
  return (
    <div>
      <nav>Navbar</nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
