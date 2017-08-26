import socket from 'socket.io';
import Dice from './utils/dice';

const io = socket();

io.on('connection', (client) => {
  client.on('dice', (data) => {
    const dice = new Dice(data.dices, data.sides, data.add, data.item);
    io.emit('message', `玩家${dice.result()}`)
  });
});

console.log('server start: 20000')

io.listen(20000);
