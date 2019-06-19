import io from 'socket.io-client'


const socket = io.connect('http://192.168.103.109:8000/my-room')


//开始订阅聊天消息
function subscribe(userName, cb) {
  let list = []
  socket.on('message', msg => {
    if (msg.isRead) {
      list.forEach((item, index) => {
        if (item.id == msg.id) {
          list[index].isRead = true;
          return;
        }
      })
    } else {
      list.push(msg)
    }
    cb(null, list)
  });
  socket.emit('subscribeToMsg', userName);
}

// 发送消息
function sendMsg(data, cb) {
  socket.emit('clientSendMsg', data);
}

export {
  sendMsg,
  subscribe
}