<template>
  <div class="chat__c-messagelist">
    <ul v-if="messages" ref="messages" class="chat__messages">
      <transition-group name="slideDown">
        <li v-for="message in messages" :key="message._id" class="chat__message">
          <!-- Message belongs to the user -->
          <div
            v-if="!message.admin && message.user && message.user._id === user._id"
            class="chat__message-item u-flex-right"
          >
            <div class="chat__message-body">
              <div class="chat__message-content chat__message-content--right">
                <span>{{ message.content }}</span>
              </div>
              <div class="chat__message-details">
                <span>{{ message.user.handle }}</span>
                <span>{{ moment(message.created_at).fromNow() }}</span>
              </div>
            </div>
            <img v-if="!message.user.social.id" :src="message.user.image" class="chat__user-avatar" alt />
            <img v-else :src="message.user.social.image" class="chat__user-avatar" alt />
          </div>
          <!-- Message belongs to the admin -->
          <div v-else-if="message.admin" class="chat__message-item u-flex-center">
            <img src="@/assets/img/icons8-businessman.svg" class="chat__user-avatar" alt />
            <div class="chat__message-body">
              <div class="chat__message-content">
                <span>{{ message.content }}</span>
              </div>
              <div class="chat__message-details">
                <span>{{ $t('admin') }}</span>
                <span>{{ moment(message.created_at).fromNow() }}</span>
              </div>
            </div>
          </div>

          <!-- Message has been deleted -->
          <div v-else-if="!message.user" class="chat__message-item">
            <img src="@/assets/img/icons8-account-64.png" class="chat__user-avatar" alt />

            <div class="chat__message-body">
              <div class="chat__message-content chat__message-content--left">
                <span>{{ message.content }}</span>
              </div>
              <div class="chat__message-details">
                <span>{{ $t('unknown') }} {{ $t('user') }}</span>
                <span>{{ moment(message.created_at).fromNow() }}</span>
              </div>
            </div>
          </div>

          <!-- Message belongs to another user -->
          <div v-else class="chat__message-item">
            <img v-if="!message.user.social.id" :src="message.user.image" class="chat__user-avatar" alt />
            <img v-else :src="message.user.social.image" class="chat__user-avatar" alt />
            <div class="chat__message-body">
              <div class="chat__message-content chat__message-content--left">
                <span>{{ message.content }}</span>
              </div>
              <div class="chat__message-details">
                <span>{{ message.user.handle }}</span>
                <span>{{ moment(message.created_at).fromNow() }}</span>
              </div>
            </div>
          </div>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MessageList',
  props: ['messages'],
  computed: {
    ...mapGetters(['getUserData'])
  },
  data: function() {
    return {
      user: null
    };
  },
  created() {
    this.user = this.getUserData;
  },
  methods: {
    scrollMessages() {
      var container = this.$refs.messages;
      container.scrollTop = container.scrollHeight;
    }
  },
  mounted() {
    this.scrollMessages();
  },
  updated() {
    this.scrollMessages();
  }
};
</script>

<style lang="scss" scoped></style>
