<template>
  <div class="hello">
    <div v-if="showModel">
      请先输入你的昵称：
      <input type="text" placeholder="请输入你的昵称" v-model="userName">
      <button @click="colseModel">确认</button>
    </div>
    <ul v-if="!showModel" class="list-message">
      <li v-for="(item,index) in listMsg" :key="index">
        <div>{{item.time}}</div>
        <div>{{item.author}}：{{item.content}}</div>
      </li>
    </ul>
    <div v-if="!showModel" class="input-msg">
      <input type="text" placeholder="请输入消息" v-model="inputValue">
      <button @click="send">发送</button>
    </div>
  </div>
</template>

<script>
import { subscribe, sendMsg } from '../lib/socket.js'
export default {
  name: 'Hellowebsocket',
  data() {
    return {
      showModel: true,
      userName: '',
      listMsg: [],
      inputValue: ''
    }
  },
  methods: {
    colseModel() {
      //先输入姓名
      if (this.userName) {
        this.showModel = false
        subscribe(this.userName, (err, list) => {
          this.listMsg = list
        })
      }
    },
    send() {
      if (this.inputValue) {
        let time = new Date()
        let params = {
          id: time.getTime(),
          type: 'message',
          isRead: false,
          time: time.toLocaleString(),
          author: this.userName,
          content: this.inputValue
        }
        sendMsg(params, function() {})
        this.inputValue = ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-message {
  list-style: none;
  text-align: right;
  margin: 0;
  padding: 0;
}
.list-message li {
  padding: 5px 15px;
  border-radius: 20px;
  margin-bottom: 10px;
  width: auto;
}
.input-msg {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-msg input {
  height: 40px;
  line-height: 40px;
  flex: 1;
  border: solid 1px lightblue;
  padding-left: 5px;
}
.input-msg button {
  height: 44px;
  line-height: 44px;
  background: lightblue;
  border: solid 1px lightblue;
}
</style>
