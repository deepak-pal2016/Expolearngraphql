/* eslint-disable @typescript-eslint/no-unused-vars */
import { io, Socket as SocketType } from "socket.io-client";
const Socket = io("https://unenvied-purge-freight.ngrok-free.dev", {
  transports: ["websocket"],
  autoConnect: true,
});
export default Socket;
