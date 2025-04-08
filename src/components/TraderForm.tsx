// components/TraderForm.tsx
import { Trader } from '@/types/types';
import React, { useState, useEffect, useRef } from 'react';
import s from '../pages/register/Register.module.css';

interface TraderFormProps {
  trader: Trader | null;
  onSubmit: (data: Omit<Trader, '_id'>, profileImageFile?: File) => void;
  onCancel: () => void;
  isLoading: boolean;
  error: string | null;
  setIsLoading: any;
}

const TraderForm: React.FC<TraderFormProps> = ({
  trader,
  onSubmit,
  onCancel,
  isLoading,
  error,
}) => {
  const [formData, setFormData] = useState<Omit<Trader, '_id'>>({
    name: '',
    profileImage: '',
    bio: '',
    specialization: 'Forex' as const,
    experience: 1,
    profitPercentage: {
      monthly: 0,
      yearly: 0,
    },
    riskLevel: 'Medium' as const,
    tradingStyle: 'Day Trading' as const,
    winRate: 0,
    totalCopiers: 0,
    averageHoldingTime: '',
    minimumCopyAmount: 100,
    copierFee: 0,
    status: 'active' as const,
  });

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (trader) {
      setFormData({
        name: trader.name || '',
        profileImage: trader.profileImage || '',
        bio: trader.bio || '',
        specialization: trader.specialization || 'Forex',
        experience: trader.experience || 1,
        profitPercentage: {
          monthly: trader.profitPercentage?.monthly || 0,
          yearly: trader.profitPercentage?.yearly || 0,
        },
        riskLevel: trader.riskLevel || 'Medium',
        tradingStyle: trader.tradingStyle || 'Day Trading',
        winRate: trader.winRate || 0,
        totalCopiers: trader.totalCopiers || 0,
        averageHoldingTime: trader.averageHoldingTime || '',
        minimumCopyAmount: trader.minimumCopyAmount || 100,
        copierFee: trader.copierFee || 0,
        status: trader.status || 'active',
      });

      // If the trader has an existing profile image, set the preview
      if (trader.profileImage) {
        setPreviewUrl(trader.profileImage);
      }
    }
  }, [trader]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    // Handle nested properties
    if (name === 'monthlyProfit' || name === 'yearlyProfit') {
      setFormData((prev) => ({
        ...prev,
        profitPercentage: {
          ...prev.profitPercentage,
          [name === 'monthlyProfit' ? 'monthly' : 'yearly']:
            parseFloat(value) || 0,
        },
      }));
      return;
    }

    // Special handling for fields with specific allowed values
    if (name === 'specialization') {
      setFormData((prev) => ({
        ...prev,
        specialization: value as Trader['specialization'],
      }));
      return;
    }

    if (name === 'riskLevel') {
      setFormData((prev) => ({
        ...prev,
        riskLevel: value as Trader['riskLevel'],
      }));
      return;
    }

    if (name === 'tradingStyle') {
      setFormData((prev) => ({
        ...prev,
        tradingStyle: value as Trader['tradingStyle'],
      }));
      return;
    }

    if (name === 'status') {
      setFormData((prev) => ({
        ...prev,
        status: value as Trader['status'],
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: [
        'experience',
        'winRate',
        'totalCopiers',
        'minimumCopyAmount',
        'copierFee',
      ].includes(name)
        ? parseFloat(value) || 0
        : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);

      // Create a preview URL for the selected image
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (typeof fileReader.result === 'string') {
          setPreviewUrl(fileReader.result);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImageFile(null);
    setPreviewUrl('');
    setFormData((prev) => ({
      ...prev,
      profileImage: '',
    }));

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, profileImageFile || undefined);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        {trader ? 'Edit Trader' : 'Add New Trader'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
              Basic Information
            </h3>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 dark:text-gray-300 mb-1"
              >
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="profileImage"
                className="block text-gray-700 dark:text-gray-300 mb-1"
              >
                Profile Image
              </label>
              <div className="flex flex-col space-y-2">
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleFileChange}
                  accept="image/*"
                  ref={fileInputRef}
                  className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                />

                {previewUrl && (
                  <div className="mt-2">
                    <div className="relative inline-block">
                      <img
                        src={previewUrl}
                        alt="Profile preview"
                        className="h-24 w-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="bio"
                className="block text-gray-700 dark:text-gray-300 mb-1"
              >
                Bio *
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
                rows={3}
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="experience"
                className="block text-gray-700 dark:text-gray-300 mb-1"
              >
                Experience (Years) *
              </label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                min="1"
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Trading Profile */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
              Trading Profile
            </h3>

            <div className="mb-4">
              <label
                htmlFor="specialization"
                className="block text-gray-700 dark:text-gray-300 mb-1"
              >
                Specialization *
              </label>
              <select
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              >
                <option value="Forex">Forex</option>
                <option value="Crypto">Crypto</option>
                <option value="Stocks">Stocks</option>
                <option value="Commodities">Commodities</option>
                <option value="Options">Options</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="tradingStyle"
                className="block text-gray-700 dark:text-gray-300 mb-1"
              >
                Trading Style *
              </label>
              <select
                id="tradingStyle"
                name="tradingStyle"
                value={formData.tradingStyle}
                onChange={handleChange}
                required
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              >
                <option value="Day Trading">Day Trading</option>
                <option value="Swing Trading">Swing Trading</option>
                <option value="Position Trading">Position Trading</option>
                <option value="Scalping">Scalping</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="riskLevel"
                className="block text-gray-700 dark:text-gray-300 mb-1"
              >
                Risk Level *
              </label>
              <select
                id="riskLevel"
                name="riskLevel"
                value={formData.riskLevel}
                onChange={handleChange}
                required
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="averageHoldingTime"
                className="block text-gray-700 dark:text-gray-300 mb-1"
              >
                Average Holding Time
              </label>
              <input
                type="text"
                id="averageHoldingTime"
                name="averageHoldingTime"
                value={formData.averageHoldingTime}
                onChange={handleChange}
                placeholder="e.g. 2 days, 4 hours"
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Performance Metrics */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
              Performance Metrics
            </h3>

            <div className="mb-4">
              <label
                htmlFor="monthlyProfit"
                className="block text-gray-700 dark:text-gray-300 mb-1"
              >
                Monthly Profit (%)
              </label>
              <input
                type="number"
                id="monthlyProfit"
                name="monthlyProfit"
                value={formData.profitPercentage.monthly}
                onChange={handleChange}
                step="0.1"
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="yearlyProfit"
                className="block text-gray-700 dark:text-gray-300 mb-1"
              >
                Yearly Profit (%)
              </label>
              <input
                type="number"
                id="yearlyProfit"
                name="yearlyProfit"
                value={formData.profitPercentage.yearly}
                onChange={handleChange}
                step="0.1"
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="winRate"
                className="block text-gray-700 dark:text-gray-300 mb-1"
              >
                Win Rate (%)
              </label>
              <input
                type="number"
                id="winRate"
                name="winRate"
                value={formData.winRate}
                onChange={handleChange}
                min="0"
                max="100"
                step="0.1"
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="totalCopiers"
                className="block text-gray-700 dark:text-gray-300 mb-1"
              >
                Total Copiers
              </label>
              <input
                type="number"
                id="totalCopiers"
                name="totalCopiers"
                value={formData.totalCopiers}
                onChange={handleChange}
                min="0"
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Copy Settings */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
              Copy Settings
            </h3>

            <div className="mb-4">
              <label
                htmlFor="minimumCopyAmount"
                className="block text-gray-700 dark:text-gray-300 mb-1"
              >
                Minimum Copy Amount *
              </label>
              <input
                type="number"
                id="minimumCopyAmount"
                name="minimumCopyAmount"
                value={formData.minimumCopyAmount}
                onChange={handleChange}
                required
                min="0"
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="copierFee"
                className="block text-gray-700 dark:text-gray-300 mb-1"
              >
                Copier Fee (%)
              </label>
              <input
                type="number"
                id="copierFee"
                name="copierFee"
                value={formData.copierFee}
                onChange={handleChange}
                min="0"
                max="100"
                step="0.1"
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-gray-700 dark:text-gray-300 mb-1"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="terminated">Terminated</option>
              </select>
            </div>
          </div>
        </div>
        {error && <p className={s.formError}>{error}</p>}

        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          >
            {trader
              ? isLoading
                ? 'Updating...'
                : 'Update Trader'
              : isLoading
                ? 'Creating...'
                : 'Create Trader'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TraderForm;
