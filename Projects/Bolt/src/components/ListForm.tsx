import React, { useState } from 'react';
import { Upload } from 'lucide-react';

interface ListFormProps {
  initialName?: string;
  initialBanner?: string;
  onSubmit: (name: string, banner: string) => void;
}

export const ListForm: React.FC<ListFormProps> = ({
  initialName = '',
  initialBanner = '',
  onSubmit,
}) => {
  const [name, setName] = useState(initialName);
  const [banner, setBanner] = useState(initialBanner);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && banner) {
      onSubmit(name, banner);
      if (!initialName) {
        setName('');
        setBanner('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          List Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="banner" className="block text-sm font-medium text-gray-700">
          Banner Image URL
        </label>
        <input
          type="url"
          id="banner"
          value={banner}
          onChange={(e) => setBanner(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        <Upload className="w-4 h-4 mr-2" />
        {initialName ? 'Update List' : 'Create List'}
      </button>
    </form>
  );
}