<template>
  <!-- Breadcrumb menu-->
  <el-breadcrumb>
    <el-breadcrumb-item :to="{ path: '../' }">Homepage</el-breadcrumb-item>
    <el-breadcrumb-item>Agent</el-breadcrumb-item>
    <el-breadcrumb-item>News agent</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- chat area -->
  <el-card style="height: 100%;">
    <div id="chatbot" style="overflow:auto;">
      <!-- Chat header -->
      <div class="chat-header">
        <div class="chat-logo">Chat</div>
      </div>
      <!-- Chat body -->
      <div class="chat-body" ref="chatBody">
        <div class="chat-message" v-for="(message, index) in renderedMessages" :key="index">
          <div class="chat-message-avatar">
            <img :src="message.avatar" alt="avatar">
          </div>
          <div class="chat-message-content" :style="{ backgroundColor: message.bgcolor }">
            <div v-html="message.renderedText"></div>
            <div class="chat-message-time">{{ message.time }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- Chat input -->
    <div class="chat-input">
      <el-input type="textarea" v-model="newMessage" @keyup.enter="startChatStream" placeholder="Type your message..."></el-input>
      <el-button style="margin-left: 5px;" type="info" size="small" @click="startChatStream">Send</el-button>
      <el-button style="margin-left: 5px;" type="info" size="small" @click="cleanMessages">Clean</el-button>
    </div>
  </el-card>
</template>

<script>
import { marked } from 'marked'

export default {
    name: "databaseAgent",
    data() {
        return {
            userAvatar: "/src/assets/user.png",
            botAvatar: "/src/assets/chatbot.png",
            messages: [],
            newMessage: ""
        };
    },
    methods: {
        // send message
        async startChatStream() {
          // push user message to message lists
          this.messages.push({
            text: this.newMessage,
            avatar: this.userAvatar,
            time: new Date().toLocaleTimeString(),
            role: "user",
            fromBot: false,
            bgcolor : "#DFF6F0"
          });
          // push bot message to message lists
          this.messages.push({
            text: "Waiting for response...",
            avatar: this.botAvatar,
            time: new Date().toLocaleTimeString(),
            role: "assistant",
            fromBot: true,
            bgcolor : "#F6F6F6"
          });
          // call API          
          this.$axios.get('/agent/news/query/' + this.newMessage).then(response => {
            // clear input
            this.newMessage = "";
            // hanlde data
            const response_chat = JSON.parse(JSON.stringify(response.data))
            // get content
            const contents = response_chat.data.content.split('')
            // clean message
            this.messages[this.messages.length - 1].text = ""
            // loop contents append to message last text (simulate typing)
            contents.forEach((content, index) => {
              setTimeout(() => {
                this.messages[this.messages.length - 1].text += content
              }, 10 * index)
            })
          })
          .catch(error => {
            console.log(error)
           })
        },
        cleanMessages () {
          this.messages = []
        }
    },
    computed: {
        contextFromMessages() {
            // only retrieve latest 10 messages
            const latestMessages = this.messages.slice(-10);
            return latestMessages.map(message => {
                return {
                    "role": message.role,
                    "content": message.text,
                };
            });
        },
        renderedMessages() {
            return this.messages.map(message => {
                return {
                    ...message,
                    renderedText: message.text ? marked(message.text) : ""
                };
            });
        }
    }
}
</script>

<style>
.chat-header {
  background-color: #f5f5f5;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
}

.chat-logo {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ddd;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin-right: 10px;
}

.chat-body {
  height: 100%;
  overflow-y: auto;
  padding: 10px;
}

.chat-message {
  display: flex;
  margin-bottom: 10px;
}

.chat-message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.chat-message-avatar img {
  width: 100%;
  height: 100%;
}

.chat-message-content {
  flex: 1;
  background-color: #ddd;
  border-radius: 10px;
  padding: 10px;
}

.chat-message-content .chat-message-text {
  font-size: 16px;
  margin-bottom: 5px;
}

.chat-message-content .chat-message-time {
  font-size: 12px;
  color: #999;
  text-align: right;
}

.chat-input {
  position: relative;
  bottom: 0;
  width: 95%;
  padding: 10px;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>