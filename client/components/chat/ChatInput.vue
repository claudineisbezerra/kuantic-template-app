<template>
  <div class="chat__input">
    <textarea
      v-model.trim="content"
      :placeholder="$t('message_placeholder')"
      class="chat__input-control"
      data-gramm_editor="false"
      @keyup="triggerMessageSend"
    >
    </textarea>
    <button class="btn btn--clear btn--info m-0 u-border-rad-0" @click="sendMessage">
      {{ $t('send') }}
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ChatInput',
  data: function() {
    return {
      content: ''
    };
  },
  computed: {
    ...mapGetters(['getUserData', 'getCurrentRoom', 'getSocket'])
  },
  methods: {
    sendUserTyping() {
      this.getSocket.emit('userTyping', {
        room: this.getCurrentRoom,
        user: this.getUserData
      });
    },
    sendUserNotTyping() {
      this.getSocket.emit('removeUserTyping', {
        room: this.getCurrentRoom,
        user: this.getUserData
      });
    },
    triggerMessageSend(e) {
      e.preventDefault();
      if (e.keyCode === 13 && !e.shiftKey) {
        this.sendMessage();
      } else {
        if (this.content !== '') {
          this.sendUserTyping();
        } else {
          this.sendUserNotTyping();
        }
      }
    },
    sendMessage() {
      this.getSocket.emit('newMessage', {
        room: this.getCurrentRoom,
        user: this.getUserData,
        content: this.content
      });
      this.content = '';
      this.sendUserNotTyping();
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
