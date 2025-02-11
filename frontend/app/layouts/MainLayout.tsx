import { Outlet } from "react-router-dom";
// components
import MainHeader from './main-header/MainHeader';
import NotificationStatus from './notification-status/NotificationStatus';
import MainFooter from './main-footer/MainFooter';

export default function MainLayout() {
  return (
    <div className="main-layout">
      <MainHeader />
      <main className="content p-8">
        <Outlet />
      </main>
      <NotificationStatus />
      <MainFooter />
    </div>
  );
};
