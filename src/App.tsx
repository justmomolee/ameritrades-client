import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

//importing pages
import Home from './pages/Home';
import Copytrade from './pages/Copytrade';
import Regulations from './pages/Regulations';
import Contact from './pages/Contact';
import Traders from './pages/Traders';
import Label from './pages/Label';
import Insurance from './pages/Insurance';
import { Server } from 'lucide-react';
import Tools from './pages/Tools';
import Forex from './pages/Forex';
import Commodities from './pages/Commodities';
import Bonds from './pages/Bonds';
import Indices from './pages/Indices';
import Crypto from './pages/Crypto';
import Stocks from './pages/Stocks';
import Futures from './pages/Futures';
import Conditions from './pages/Conditions';
import Spreads from './pages/Spreads';
import Hours from './pages/Hours';
import Swap from './pages/Swap';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import PasswordReset from './pages/passwordReset/PasswordReset';
import PricingPage from './pages/Pricing';
import PageLoader from './components/PageLoader';
import { contextData } from './context/AuthContext';
import UpdateProfile from './components/UpdateProfile';
import routes from './routes';
import Dashboard from './pages/Dashboard/Dashboard';
import DefaultLayout from './components/Layouts/DefaultLayout';
import Admin from './pages/Admin/Admin';
import AdminLayout from './components/Layouts/AdminLayout';
import ActiveUsers from './pages/Admin/ActiveUsers';
import ManageTrades from './pages/Admin/ManageTrades';
import BannedUsers from './pages/Admin/BannedUsers';
import ApprovedDeposits from './pages/Admin/ApprovedDeposits';
import PendingDeposits from './pages/Admin/PendingDeposits';
import RejectedDeposits from './pages/Admin/RejectedDeposits';
import ApprovedWithdrawals from './pages/Admin/ApprovedWithdrawals';
import PendingWithdrawals from './pages/Admin/PendingWithdrawals';
import RejectedWithdrawals from './pages/Admin/RejectedWithdrawals';
import KYC from './pages/Dashboard/KYC';
import Settings from './pages/Admin/Settings';
import { Helmet } from 'react-helmet';
import SendMail from './pages/Admin/SendMail';
import WhyAmeritrades from './pages/WhyAmeritrades';
import ManageTrader from './pages/Admin/ManageTrader';

function App() {
  const location = useLocation();
  const isPublicRoute =
    location.pathname.includes('/dashboard') ||
    location.pathname.includes('/admin') ||
    location.pathname.includes('/login') ||
    location.pathname.includes('/register') ||
    location.pathname.includes('/password-reset');
  const { fetching, user } = contextData();

  console.log(isPublicRoute);

  if (fetching) return <PageLoader />;

  if (!fetching)
    return (
      <>
        <Helmet>
          {isPublicRoute ? (
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
            />
          ) : (
            <meta name="viewport" content="width=1280, user-scalable=yes" />
          )}
        </Helmet>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/copytrade" element={<Copytrade />} />
          <Route path="/company/why" element={<WhyAmeritrades />} />
          <Route path="/company/regulations" element={<Regulations />} />
          <Route path="/company/contact" element={<Contact />} />
          <Route path="/company/traders" element={<Traders />} />
          <Route path="/company/label" element={<Label />} />
          <Route path="/company/insurance" element={<Insurance />} />
          <Route path="/company/servers" element={<Server />} />
          <Route path="/company/tools" element={<Tools />} />
          <Route path="/products/forex" element={<Forex />} />
          <Route path="/products/commodities" element={<Commodities />} />
          <Route path="/products/indices" element={<Indices />} />
          <Route path="/products/bonds" element={<Bonds />} />
          <Route path="/products/crypto" element={<Crypto />} />
          <Route path="/products/stocks" element={<Stocks />} />
          <Route path="/products/futures" element={<Futures />} />
          <Route path="/more/pricing" element={<PricingPage />} />
          <Route path="/more/conditions" element={<Conditions />} />
          <Route path="/more/spreads" element={<Spreads />} />
          <Route path="/more/hours" element={<Hours />} />
          <Route path="/more/swap" element={<Swap />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/password-reset/:page" element={<PasswordReset />} />

          {user ? (
            <>
              {user.isAdmin ? (
                <>
                  <Route path="/admin/" element={<AdminLayout />}>
                    <Route index element={<Admin />} />
                    <Route path="/admin/home" element={<Admin />} />
                    <Route
                      path="/admin/active-users"
                      element={<ActiveUsers />}
                    />
                    <Route path="/admin/trades" element={<ManageTrades />} />
                    <Route path="/admin/trader" element={<ManageTrader />} />
                    <Route
                      path="/admin/banned-users"
                      element={<BannedUsers />}
                    />
                    <Route
                      path="/admin/approved-deposits"
                      element={<ApprovedDeposits />}
                    />
                    <Route
                      path="/admin/pending-deposits"
                      element={<PendingDeposits />}
                    />
                    <Route
                      path="/admin/rejected-deposits"
                      element={<RejectedDeposits />}
                    />
                    <Route
                      path="/admin/approved-withdrawals"
                      element={<ApprovedWithdrawals />}
                    />
                    <Route
                      path="/admin/pending-withdrawals"
                      element={<PendingWithdrawals />}
                    />
                    <Route
                      path="/admin/rejected-withdrawals"
                      element={<RejectedWithdrawals />}
                    />
                    <Route path="/admin/sendmail" element={<SendMail />} />
                    <Route path="/admin/settings" element={<Settings />} />
                    <Route path="/admin/kyc" element={<KYC />} />
                  </Route>

                  <Route path="/login" element={<Navigate to="/admin/" />} />
                  <Route path="/register" element={<Navigate to="/admin/" />} />
                  <Route
                    path="/register/:ref"
                    element={<Navigate to="/admin/" />}
                  />
                </>
              ) : (
                <Route
                  path="/admin/*"
                  element={<Navigate to="/dashboard/" />}
                />
              )}

              {!user.isAdmin ? (
                <>
                  <Route path="/dashboard/" element={<DefaultLayout />}>
                    {user.fullName === '' ? (
                      <Route
                        path="/dashboard/updateProfile"
                        element={<UpdateProfile />}
                      />
                    ) : (
                      <Route path="/dashboard/home" element={<Dashboard />} />
                    )}

                    <Route index element={<Dashboard />} />
                    <Route path="/dashboard/home" element={<Dashboard />} />

                    {routes.map((route, i) => (
                      <Route
                        key={i}
                        path={route.path}
                        element={<route.component />}
                      />
                    ))}
                  </Route>

                  <Route
                    path="/login"
                    element={<Navigate to="/dashboard/" />}
                  />
                  <Route
                    path="/register"
                    element={<Navigate to="/dashboard/" />}
                  />
                  <Route
                    path="/register/:ref"
                    element={<Navigate to="/dashboard/" />}
                  />
                </>
              ) : (
                <Route
                  path="/dashboard/*"
                  element={<Navigate to="/admin/" />}
                />
              )}
            </>
          ) : (
            <>
              <Route path="/dashboard/*" element={<Navigate to="/login" />} />
              <Route path="/admin/*" element={<Navigate to="/login" />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register/:ref" element={<Register />} />
              <Route path="/password-reset" element={<PasswordReset />} />
              <Route path="/password-reset/:page" element={<PasswordReset />} />
            </>
          )}
        </Routes>
      </>
    );
}

export default App;
