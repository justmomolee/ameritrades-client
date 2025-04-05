import { useState, useEffect } from 'react';
import PageLoader from '@/components/PageLoader';
import { contextData } from '@/context/AuthContext';
import SendMailModal from '@/components/SendMailModal';

type User = {
  _id: string;
  email: string;
  fullName: string;
  deposit: number;
  interest: number;
  withdraw: number;
};

type Admin = {
  _id: string;
};

export default function SendMail() {
  const { user: admin } = contextData() as { user: Admin };
  const [users, setUsers] = useState<User[] | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]); // Using email instead of _id
  const [mailData, setMailData] = useState<string[] | null>(null);
  const [fetching, setFetching] = useState<boolean>(true);
  const [filterType, setFilterType] = useState<string>('all');
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${url}/users`);
      const data = await res.json();

      if (res.ok) {
        const filteredData = data.filter(
          (user: User) => user._id !== admin._id,
        );
        setUsers(filteredData);
        setFilteredUsers(filteredData);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedUsers(filteredUsers?.map((user) => user.email) || []);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userEmail: string) => {
    setSelectedUsers((prev) => {
      if (prev.includes(userEmail)) {
        return prev.filter((email) => email !== userEmail);
      }
      return [...prev, userEmail];
    });
  };

  const handleFilter = (type: string) => {
    setFilterType(type);
    let filtered = users;

    switch (type) {
      case 'deposited':
        filtered = users?.filter((user) => user.deposit > 0) || [];
        break;
      case 'no-deposits':
        filtered = users?.filter((user) => user.deposit === 0) || [];
        break;
      case 'with-trades':
        filtered = users?.filter((user) => user.interest > 0) || [];
        break;
      case 'with-withdrawals':
        filtered = users?.filter((user) => user.withdraw > 0) || [];
        break;
      default:
        filtered = users || [];
    }
    setFilteredUsers(filtered);
    setSelectedUsers([]);
  };

  const handleMailData = (userEmails: string[]) => {
    setMailData(userEmails);
  };

  if (fetching) return <PageLoader />;

  return (
    <div className="relative overflow-x-auto text-nowrap">
      <div className="w-fit flex gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg">
        <button
          onClick={() => handleFilter('all')}
          className={`px-4 py-2 text-xs font-medium rounded ${
            filterType === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          All Users
        </button>
        <button
          onClick={() => handleFilter('deposited')}
          className={`px-4 py-2 text-xs font-medium rounded ${
            filterType === 'deposited'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          Deposited Users
        </button>
        <button
          onClick={() => handleFilter('no-deposits')}
          className={`px-4 py-2 text-xs font-medium rounded ${
            filterType === 'no-deposits'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          Users Without Deposits
        </button>
        <button
          onClick={() => handleFilter('with-trades')}
          className={`px-4 py-2 text-xs font-medium rounded ${
            filterType === 'with-trades'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          Users With Trades
        </button>
        <button
          onClick={() => handleFilter('with-withdrawals')}
          className={`px-4 py-2 text-xs font-medium rounded ${
            filterType === 'with-withdrawals'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          Users With Withdrawals
        </button>
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              <input
                type="checkbox"
                checked={selectedUsers.length === filteredUsers?.length}
                onChange={handleSelectAll}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </th>
            <th scope="col" className="px-6 py-3">
              Users
            </th>
            <th scope="col" className="px-6 py-3">
              Balance
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers &&
            filteredUsers.map((user) => (
              <tr
                key={user.email}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.email)}
                    onChange={() => handleSelectUser(user.email)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {user.email}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {user.fullName}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div>Deposit: ${user.deposit}</div>
                    <div>Interest: ${user.interest}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleMailData([user.email])}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Send Mail
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {selectedUsers.length > 0 && (
        <div className="fixed bottom-4 right-7.5">
          <button
            onClick={() => handleMailData(selectedUsers)}
            className="px-4 py-2 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send Mail to Selected ({selectedUsers.length})
          </button>
        </div>
      )}

      {mailData && (
        <SendMailModal emails={mailData} onClose={() => setMailData(null)} />
      )}
    </div>
  );
}
