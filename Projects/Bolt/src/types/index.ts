export interface Game {
  id: string;
  title: string;
  coverUrl: string;
  dateAdded: string;
}

export interface GameList {
  id: string;
  name: string;
  games: Game[];
  coverBanner: string;
}