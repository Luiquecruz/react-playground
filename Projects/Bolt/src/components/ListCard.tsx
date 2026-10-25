import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { GameList } from '../types';

interface ListCardProps {
  list: GameList;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const ListCard: React.FC<ListCardProps> = ({
  list,
  onSelect,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="relative group bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
      <div onClick={onSelect}>
        <img
          src={list.coverBanner}
          alt={list.name}
          className="w-full h-32 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg">{list.name}</h3>
          <p className="text-sm text-gray-500">{list.games.length} games</p>
        </div>
      </div>
      <div className="absolute top-2 right-2 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="p-2 bg-blue-500 rounded-full"
        >
          <Pencil className="w-4 h-4 text-white" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 bg-red-500 rounded-full"
        >
          <Trash2 className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}