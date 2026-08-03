/* eslint-disable @typescript-eslint/no-unused-vars */
import { io, Socket as SocketType } from 'socket.io-client';
const Socket = io('https://nannie-unfenestral-preculturally.ngrok-free.dev', {
  transports: ['websocket'],
  autoConnect: true,
});
export default Socket;
