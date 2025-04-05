import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Balance from '@/components/balance/Balance';
import BigChart from '@/components/BigChart';
import ChartOne from '@/components/ChartOne';
import ChartSlide from '@/components/ChartSlide';
import ChartThree from '@/components/ChartThree';
import MiniBals from '@/components/MiniBals';
import NoDepositAlert from '@/components/NoDepositAlert';
import PageLoader from '@/components/PageLoader';
import TraderGrid from '@/components/TraderGrid';
import UsdChart from '@/components/UsdChart';
import { contextData } from '@/context/AuthContext';

const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

export default function Dashboard() {
  const { user } = contextData();
  const navigate = useNavigate();
  const [traders, setTraders] = useState([]);
  const [copiedTraderId, setCopiedTraderId] = useState<string | null>(null);

  const combinedBalance =
    user?.deposit + user?.trade + user?.interest + user?.bonus || 0;
  const balancePlusWithdraw = combinedBalance + (user?.withdraw || 0);

  const fetchTraders = async () => {
    try {
      const res = await fetch(`${url}/trader`);
      if (!res.ok) throw new Error('Failed to fetch traders');
      const data = await res.json();
      setTraders(data || []);
    } catch (error) {
      console.error('Error fetching traders:', error);
    }
  };

  const copyTrader = async (traderId: string) => {
    try {
      const action = traderId === copiedTraderId ? 'uncopy' : 'copy';

      const response = await fetch(`${url}/users/update-user-trader`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ traderId, action, userId: user._id }),
      });

      if (response.ok) {
        setCopiedTraderId(action === 'copy' ? traderId : null);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error copying trader:', error);
      return false;
    }
  };

  useEffect(() => {
    if (!user) return navigate('/login');
    if (user && user.fullName === '') return navigate('/dashboard/updateProfile');
    fetchTraders();
  }, [user]);

  if (!user) return <PageLoader />;

  return (
    <>
      {balancePlusWithdraw === 0 && <NoDepositAlert />}

      <div className="w-full flex gap-5 my-5 max-[900px]:flex-col">
        <div className="flex-none">
          <Balance type="balance" user={user} />
        </div>
        <div className="flex-auto shadow-1">
          <UsdChart />
        </div>
      </div>

      <div className="flex items-center justify-center mb-4 rounded-[15px] p-1 shadow-1 bg-gray-50 dark:bg-gray-800">
        <ChartSlide />
      </div>

      <div className="container mx-auto px-4 py-8">
        <TraderGrid
          traders={traders}
          copiedTraderId={copiedTraderId}
          onCopyTrader={copyTrader}
        />
      </div>

      <div className="w-full flex gap-5 my-4 max-[1100px]:flex-col mb-4">
        <div className="flex-auto">
          <ChartOne />
        </div>
        <div className="flex-none">
          <ChartThree />
        </div>
      </div>

      <MiniBals />

      <div className="h-100 flex items-center justify-center mb-4 rounded-[15px] p-1 shadow-1 bg-gray-50 dark:bg-gray-800">
        <BigChart />
      </div>
    </>
  );
}
