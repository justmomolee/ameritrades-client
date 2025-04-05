import { useEffect, useState } from 'react';
import Header from '../Header';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../AdminSidebar';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const chatCtn = document.getElementById('smartsupp-widget-container');
    if (chatCtn) chatCtn.style.display = 'none';

    return () => {
      if (chatCtn) chatCtn.style.display = 'block';
    };
  }, []);


  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
