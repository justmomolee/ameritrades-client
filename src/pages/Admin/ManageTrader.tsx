// ManageTrader.tsx
import TraderForm from '@/components/TraderForm';
import TraderList from '@/components/TraderList';
import { Trader } from '@/types/types';
import React, { useState, useEffect } from 'react';

const ManageTrader: React.FC = () => {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingTrader, setEditingTrader] = useState<Trader | null>(null);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  useEffect(() => {
    fetchTraders();
  }, []);

  const fetchTraders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/trader`);

      if (!response.ok) {
        throw new Error('Failed to fetch traders');
      }

      const data = await response.json();
      setTraders(data);
      setError(null);
    } catch (err) {
      setError('Error fetching traders. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTrader = () => {
    setEditingTrader(null);
    setShowForm(true);
  };

  const handleEditTrader = (trader: Trader) => {
    setEditingTrader(trader);
    setShowForm(true);
  };

  const handleDeleteTrader = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this trader?')) return;

    try {
      const response = await fetch(`${url}/trader/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete trader');
      }

      setTraders(traders.filter((trader) => trader._id !== id));
    } catch (err) {
      setError('Error deleting trader. Please try again.');
      console.error(err);
    }
  };

  const handleFormSubmit = async (
    formData: Omit<Trader, '_id'>,
    profileImageFile?: File,
  ) => {
    setIsLoading(true);
    try {
      const submitData = new FormData();

      // Add the trader data as a JSON string
      submitData.append('traderData', JSON.stringify(formData));

      // Add the profile image if provided
      if (profileImageFile) {
        submitData.append('profileImage', profileImageFile);
      }

      let response;

      if (editingTrader) {
        // Update existing trader
        response = await fetch(`${url}/trader/${editingTrader._id}`, {
          method: 'PUT',
          body: submitData,
        });
      } else {
        // Create new trader
        response = await fetch(`${url}/trader/create`, {
          method: 'POST',
          body: submitData,
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save trader');
      }

      // Refresh the list
      fetchTraders();
      setShowForm(false);
      setEditingTrader(null);
    } catch (err: any) {
      setError(err.message || 'Error saving trader. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-gray-900 dark:text-white whitespace-nowrap">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-2xl font-bold ">Trader Management</h1>
          <button
            onClick={handleAddTrader}
            className="max-sm:w-full font-medium px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          >
            Add New Trader
          </button>
        </div>

        {error && (
          <div className="p-4 mb-6 rounded-md bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100">
            {error}
          </div>
        )}

        {showForm ? (
          <TraderForm
            error={error}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            trader={editingTrader}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingTrader(null);
            }}
          />
        ) : (
          <TraderList
            traders={traders}
            loading={loading}
            onEdit={handleEditTrader}
            onDelete={handleDeleteTrader}
          />
        )}
      </div>
    </div>
  );
};

export default ManageTrader;
