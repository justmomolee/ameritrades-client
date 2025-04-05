import { useEffect, useState } from 'react';
import s from '../login/Login.module.css';

export default function Settings() {
  const [coins, setCoins] = useState([
    { name: '', address: '', network: '', price: 0 },
  ]);
  const [utilId, setUtilId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchUtils = async () => {
    try {
      const res = await fetch(`${url}/utils`);
      const data = await res.json();

      if (res.ok) {
        setCoins(data.coins || []);
        setUtilId(data._id);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUtils();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      const res = await fetch(`${url}/utils/update/${utilId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coins }),
      });
      const data = await res.json();

      if (res.ok) setSuccess(true);
      else throw new Error(data.message);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCoinChange = (
    index: number,
    field: string,
    value: string | number,
  ) => {
    const newCoins = [...coins];
    newCoins[index] = { ...newCoins[index], [field]: value };
    setCoins(newCoins);
  };

  const addCoin = () => {
    setCoins([...coins, { name: '', address: '', network: '', price: 0 }]);
  };

  const removeCoin = (index: number) => {
    const newCoins = coins.filter((_, i) => i !== index);
    setCoins(newCoins);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative bg-white rounded-lg shadow dark:bg-gray-800"
    >
      <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Edit Utility Details
        </h3>
      </div>
      <div className="p-6 space-y-6">
        {coins.map((coin, index) => (
          <div key={index} className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor={`coin-name-${index}`} className="editUserLabel">
                Coin Name
              </label>
              <input
                value={coin.name}
                onChange={(e) =>
                  handleCoinChange(index, 'name', e.target.value)
                }
                type="text"
                id={`coin-name-${index}`}
                className="editUserInput"
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor={`coin-address-${index}`}
                className="editUserLabel"
              >
                Address
              </label>
              <input
                value={coin.address}
                onChange={(e) =>
                  handleCoinChange(index, 'address', e.target.value)
                }
                type="text"
                id={`coin-address-${index}`}
                className="editUserInput"
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor={`coin-network-${index}`}
                className="editUserLabel"
              >
                Network
              </label>
              <input
                value={coin.network}
                onChange={(e) =>
                  handleCoinChange(index, 'network', e.target.value)
                }
                type="text"
                id={`coin-network-${index}`}
                className="editUserInput"
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor={`coin-price-${index}`} className="editUserLabel">
                Price
              </label>
              <input
                value={coin.price}
                onChange={(e) =>
                  handleCoinChange(index, 'price', parseFloat(e.target.value))
                }
                type="number"
                id={`coin-price-${index}`}
                className="editUserInput"
                required
              />
            </div>
            <div className="col-span-6">
              <button
                type="button"
                onClick={() => removeCoin(index)}
                className="text-red-500 text-xs font-medium border-[1.2px] border-red-500 rounded-lg p-3"
              >
                Remove Coin
              </button>
            </div>
          </div>
        ))}
        {error && <p className={s.formError}>{error}</p>}
        {success && (
          <p className={s.formSuccess}>Utils Updated Successfully...</p>
        )}
      </div>

      <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
        <button
          type="button"
          onClick={addCoin}
          className="text-lime-600 text-xs font-medium border-[1.2px] border-lime-500 rounded-lg p-3"
        >
          Add New Coin
        </button>
        
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? 'Saving...' : 'Save all'}
        </button>
      </div>
    </form>
  );
}
