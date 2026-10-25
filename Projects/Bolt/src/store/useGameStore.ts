import { create } from 'zustand';
import { Game, GameList } from '../types';

interface GameStore {
  lists: GameList[];
  addList: (name: string, coverBanner: string) => void;
  addGameToList: (listId: string, game: Game) => void;
  removeGameFromList: (listId: string, gameId: string) => void;
  updateList: (listId: string, updates: Partial<GameList>) => void;
  deleteList: (listId: string) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  lists: [],
  addList: (name, coverBanner) =>
    set((state) => ({
      lists: [
        ...state.lists,
        {
          id: crypto.randomUUID(),
          name,
          coverBanner,
          games: [],
        },
      ],
    })),
  addGameToList: (listId, game) =>
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === listId
          ? { ...list, games: [...list.games, game] }
          : list
      ),
    })),
  removeGameFromList: (listId, gameId) =>
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === listId
          ? { ...list, games: list.games.filter((game) => game.id !== gameId) }
          : list
      ),
    })),
  updateList: (listId, updates) =>
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === listId ? { ...list, ...updates } : list
      ),
    })),
  deleteList: (listId) =>
    set((state) => ({
      lists: state.lists.filter((list) => list.id !== listId),
    })),
}));