<template>
  <b-container style="height:100vh" class="d-flex justify-content-center align-center">
    <div v-if="isNoName" class="align-self-center w-75" >
      <b-row class="h3 d-flex justify-content-center mb-3">
          TEXT YOUR NAME 
      </b-row>
      <b-row>
        <b-form @submit="onTypeName" class ="w-50 d-flex direction-row m-auto">
        <b-form-input
          v-model="name"
          type="text"
          placeholder="Your name"
          required
        ></b-form-input>
        <b-button class ="ml-3" type="submit" variant="primary">JOIN</b-button>
      </b-form>
      </b-row>
      
  
    </div>
    <div v-else class="pt-5">
      <basic-vue-chat
      style="width: 25vw"
      title="Chat with strangers"
      @newOwnMessage="sendMessage" 
      :new-message="message"
    />
    </div>
    
  </b-container>
</template>

<script>
import BasicVueChat from "basic-vue-chat";
import moment from 'moment';
import NodeRSA from "node-rsa"

export default {
  name: 'App',

  components: {
    BasicVueChat
  },

  data() {
    return {
      message: null,
      name : "",
      isNoName : true,
      key : null,
      public_key : "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0wRRqOZj2DwgJdVb6fh+\nhiygzUDnThN9k4ejtKBP70rwENjZQJXxqlxFyHyeMlb36IctpudkBwmA6Diocdfi\nYAEeYKfCuelPcFrKyPKBFVW7DP1n3sdOyZNV7uwk3EnImGuPvnp7YCL/gRbvofNQ\nEOs06HbIe73Z3TFG6Ip5ZYT89U/9lCrogzi3KMs6WeDqJdJYbieTL5QwUXRlwX8i\nAzjPt/0dg+YSoQSkZfE/Ht44oSKGAIdsHU8tZMRy0IozbhSvk1ReBUkyu7UsAMeg\nJ9rh0utqr8/fM43yn88Rafcomy7V5FvBCle8yeKu0HERtlTlzchrprjBDheESnzo\nnQIDAQAB\n-----END PUBLIC KEY-----",
      private_key : "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEA0wRRqOZj2DwgJdVb6fh+hiygzUDnThN9k4ejtKBP70rwENjZ\nQJXxqlxFyHyeMlb36IctpudkBwmA6DiocdfiYAEeYKfCuelPcFrKyPKBFVW7DP1n\n3sdOyZNV7uwk3EnImGuPvnp7YCL/gRbvofNQEOs06HbIe73Z3TFG6Ip5ZYT89U/9\nlCrogzi3KMs6WeDqJdJYbieTL5QwUXRlwX8iAzjPt/0dg+YSoQSkZfE/Ht44oSKG\nAIdsHU8tZMRy0IozbhSvk1ReBUkyu7UsAMegJ9rh0utqr8/fM43yn88Rafcomy7V\n5FvBCle8yeKu0HERtlTlzchrprjBDheESnzonQIDAQABAoIBAQC9W3DT+fq6/ilz\nCeUzLhSL3txlk8p9G6xiiSN0YS+Z8ks/Mvixplx4ndjZMkrbrYNFnJhw38+5KOQO\nf1lY33t630YdQi3RmvX4QuEaNdN0C7yQyY0+MugWpypD/pCNRYDGli8lpM+103Io\nqyZa0/aTWB3gRUdfE1y/ywpwfmK1n2HuGQc3zDGteqos8OLaxE3GPd6jaCoFkf+6\ncW3x8vB9G7snTd6CsBZlBql2Wp8KT0FdqLNwZ3mLfc8laoceL2yE3KocEGFloY/T\n6NDBedmKHXvgMIKt0jvWDU52+ZOVhhxGVk/2JyfqnQBLdh3aQdXetd2h120FUjgO\nbBm3whqZAoGBAO/2FortgwTCuc7YkIm4ZTu3MXlOBqKxs2vVp+ZU7IZIDg/TAkK6\n7F8GwNOEl9ogrv2HtuKNkHDhLDYYLGucs3mg/jQxgH2InHRtC+IEm1mmO6azqrsW\n6QY6NRnKje707QNJwytsyV6oeskvcNSF8xT91Fr4spZ/PC9oMaDid+SDAoGBAOEe\n+JUY2Kd9i4qYUay5KshokhFK6kketmywue0YqQ8ntCn7NeiDEoJLsEpk7DKf5+mm\nkhIY+b3NGCZ/cDaYSUj2HTLiU3uuHuYazjeLYlFfH9YHhvLDPC00DixiIEaVEgIX\ndBVSkQIqH46nunJC5uBl0EvoGnFseezOSNKc8bRfAoGAQGt2XdGpjMuiCk/FbdOd\nCc0CcShrS54dJuPy8Tj3To1liQYC41s/PbuYZLCB+8Mud03J4URT9Jnevp76veER\npaN82xI3Bnx4VCE6QXEvK4AfH3+4ZAWghVV3D/d65x3Fy04wISZRYSIl5IDh74wO\nWCJUsh92AkUiKS/1stVZjnUCgYA2fyHcLhScjzbNiUwUTQr/UtkxWHpY0xeEPk/0\nBok+gvUJSKfnLnu3kQ0PJVlMdAtXM5yexu8GNHUJNMZ8YOc0w2eUHtfo0+DlAU40\nggh9/FIfpNjVQc/6fWSE+AgqLgIbAYR3ePJjnMDg7teiu3FalysShRCJrqHhYpqc\naaPVbwKBgEAJC71/uYQW43b1UVJbzhhSdolWuRPqfdgzoT+V0nO+d4w7sv3xvXix\nZ/n8/TbQ3tFJk+crwRKe8l1n+aG+vlLkT5ojIQ9jCXzIl864KBZpiQ7wuu48LVFM\ncSPF4v+SG76DLB+37EiVsWA2nTEJpYc/lg0vZ3toLN5rLEKd9Ecv\n-----END RSA PRIVATE KEY-----",
    }
  },

  sockets: {
    statusRoom: function (message) {
      this.message = {
        contents: message["message"],
        author: this.name,
        date: moment(new Date()).format('h:mm'),
      }
    },

    receiveMessage: function (message) {
      this.message = {
        contents: this.key.decrypt(message["message"], 'utf8'),
        author: message["name"],
        date: moment(new Date()).format('h:mm'),
      }
    },
  },

  methods: {
    onTypeName : function(){
      this.isNoName = false
    },
  
    sendMessage(message) {
      if(this.message !== '') {
        this.$socket.emit('sendMessage', {name : this.name, message : this.key.encrypt(message, 'base64')})
      }
    }
  },
  created() {
    this.key = new NodeRSA(this.private_key)
  },

 
 
}
</script>

