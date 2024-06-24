import { Server } from "socket.io";

interface Game {
  id: string;
  player0: string;
  player1: string | null;
}

interface IStore {
  games: Game[];
}

const Store: IStore = {
  games: [],
};

export default Store;
