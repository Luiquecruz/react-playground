import React, { useState } from 'react';
import { ListPlus, SortAsc, SortDesc } from 'lucide-react';
import { useGameStore } from './store/useGameStore';
import { GameCard } from './components/GameCard';
import { ListCard } from './components/ListCard';
import { AddGameForm } from './components/AddGameForm';
import { ListForm } from './components/ListForm';
import { GameList } from './types';

function App() {
  const [selectedList, setSelectedList] = useState<GameList | null>(null);
  const [showAddList, setShowAddList] = useState(false);
  const [showEditList, setShowEditList] = useState(false);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const { lists, addList, addGameToList, removeGameFromList, updateList, deleteList } = useGameStore();

  const handleAddGame = (title: string, coverUrl: string) => {
    if (selectedList) {
      addGameToList(selectedList.id, {
        id: crypto.randomUUID(),
        title,
        coverUrl,
        dateAdded: new Date().toISOString(),
      });
    }
  };

  const handleAddList = (name: string, banner: string) => {
    addList(name, banner);
    setShowAddList(false);
  };

  const handleUpdateList = (name: string, banner: string) => {
    if (selectedList) {
      updateList(selectedList.id, { name, coverBanner: banner });
      setShowEditList(false);
    }
  };

  const sortedGames = selectedList?.games.slice().sort((a, b) => {
    const comparison = new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    return sortDirection === 'desc' ? comparison : -comparison;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {selectedList ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">{selectedList.name}</h1>
                <p className="text-gray-600">{selectedList.games.length} games</p>
              </div>
              <div className="space-x-4">
                <button
                  onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="p-2 bg-white rounded-md shadow-sm"
                >
                  {sortDirection === 'desc' ? <SortDesc /> : <SortAsc />}
                </button>
                <button
                  onClick={() => setShowEditList(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Edit List
                </button>
                <button
                  onClick={() => setSelectedList(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md"
                >
                  Back to Lists
                </button>
              </div>
            </div>

            {showEditList ? (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <ListForm
                  initialName={selectedList.name}
                  initialBanner={selectedList.coverBanner}
                  onSubmit={handleUpdateList}
                />
              </div>
            ) : (
              <>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Add New Game</h2>
                  <AddGameForm onSubmit={handleAddGame} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedGames?.map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      onDelete={() => removeGameFromList(selectedList.id, game.id)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">My Game Lists</h1>
              <button
                onClick={() => setShowAddList(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                <ListPlus className="w-5 h-5 mr-2" />
                Create New List
              </button>
            </div>

            {showAddList && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <ListForm onSubmit={handleAddList} />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lists.map((list) => (
                <ListCard
                  key={list.id}
                  list={list}
                  onSelect={() => setSelectedList(list)}
                  onEdit={() => {
                    setSelectedList(list);
                    setShowEditList(true);
                  }}
                  onDelete={() => deleteList(list.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;