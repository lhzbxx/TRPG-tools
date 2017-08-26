import socket from 'socket.io';
import Format from './utils/format';
import Dice from './utils/dice';
import User from './store/user';

// socket.io
const io = socket();
// user store
const userStore = new User();

io.on('connection', (client) => {
  const clientID = client.id;
  const inChannel = channel => client.rooms.indexOf(channel) > -1;
  // 初始化
  client.on('init', ({ nickname }) => {
    userStore.join(clientID, nickname);
  });
  // 加入频道
  client.on('joinChannel', ({ channel }) => {
    const nickname = userStore.exists(clientID);
    if (nickname) {
      client.join(channel);
      io.in(channel).clients((error, clients) => {
        client.emit('clients', userStore.wrapper(clients));
      });
      io.to(channel).emit('channel', Format.channelDTO(clientID, 'JOIN', nickname));
    }
  });
  // 离开频道
  client.on('leaveChannel', (channel) => {
    client.leave(channel);
    io.to(channel).emit('channel', Format.channelDTO(clientID, 'LEAVE'));
  });
  // 掷骰子
  client.on('dice', ({ channel, dices, sides, add, item, isPrivate }) => {
    if (inChannel(channel)) {
      const dice = new Dice(dices, sides, add, item);
      if (isPrivate) {
        client.emit('message', Format.messageDTO(clientID, 'TOOL:DICE', dice.result()));
      } else {
        io.in(channel).emit('message', Format.messageDTO(clientID, 'TOOL:DICE', dice.result()));
      }
    }
  });
  // 发送消息
  client.on('message', ({ channel, message }) => {
    if (inChannel(channel)) {
      io.in(channel).emit('message', Format.messageDTO(clientID, 'MESSAGE', message));
    }
  });
  // 断开链接
  client.on('disconnect', () => {
    userStore.leave(clientID);
  });
});

console.log('server start: 20000');

io.listen(20000);
