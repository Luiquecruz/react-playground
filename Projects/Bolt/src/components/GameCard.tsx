import React from 'react';
import { Trash2 } from 'lucide-react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onDelete: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onDelete }) => {
  return (
    <div className="relative group bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={game.coverUrl}
        alt={game.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{game.title}</h3>
        <p className="text-sm text-gray-500">
          Added: {new Date(game.dateAdded).toLocaleDateString()}
        </p>
      </div>
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 p-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Trash2 className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}