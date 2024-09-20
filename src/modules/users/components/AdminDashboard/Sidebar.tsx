import { UsersIcon, PackageIcon } from 'lucide-react';
import { Button } from '../../../shared/components/ui/button';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => (
  <aside className='w-64 bg-white'>
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
    </div>
    <nav className='mt-6'>
      <Button
        variant={activeTab === 'users' ? 'default' : 'ghost'}
        className='w-full justify-start rounded-none'
        onClick={() => setActiveTab('users')}
      >
        <UsersIcon className='mr-2 h-4 w-4' />
        Users
      </Button>
      <Button
        variant={activeTab === 'products' ? 'default' : 'ghost'}
        className='w-full justify-start rounded-none'
        onClick={() => setActiveTab('products')}
      >
        <PackageIcon className='mr-2 h-4 w-4' />
        Products
      </Button>
    </nav>
  </aside>
);

export default Sidebar;
