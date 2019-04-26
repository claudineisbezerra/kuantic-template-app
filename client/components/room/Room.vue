<template>
  <div class="page page--room">
    <section class="section section--room section--mmt p-0">
      <div class="section__content u-max-height p-0">
        <div class="chat">
          <Sidebar ref="userList" name="userlist">
            <template slot="header">
              <div class="userlist__actions">
                <div>
                  <ion-icon name="contacts" class="icon"></ion-icon>
                </div>
                <span class="section__title">{{ $t('online_users') }}</span>
                <div @click="toggleUserList">
                  <ion-icon name="backspace" class="icon"></ion-icon>
                </div>
              </div>
            </template>
            <template slot="body">
              <input
                v-model.trim="searchInput"
                :placeholder="$t('search_user_by_name')"
                type="text"
                class="rooms__search-input"
              />
              <ul v-if="getCurrentRoom && filteredUsers" class="chat__userlist">
                <transition-group name="slideDown">
                  <li v-for="user in filteredUsers" :key="user.lookup._id" class="chat__user">
                    <div class="chat__user-item">
                      <div class="chat__user-image">
                        <img
                          v-if="user.lookup.social.id === null"
                          :src="user.lookup.image"
                          class="chat__user-avatar"
                          alt
                        />
                        <img v-else :src="user.lookup.social.image" class="chat__user-avatar" alt />
                      </div>

                      <div class="chat__user-details">
                        <span>{{ user.lookup.handle }}</span>
                      </div>
                    </div>
                  </li>
                </transition-group>
              </ul>
            </template>
            <template slot="footer">
              <button class="btn btn--clear btn--danger center" @click="leaveRoom">
                {{ $t('leave') }}
              </button>
            </template>
          </Sidebar>
          <div :class="{ mlzero: !sidebarVisible }" class="chat__content">
            <div v-if="room" class="chat__header">
              <span class="section__title"># {{ room.name }}</span>
              <div class="chat__actions">
                <ion-icon name="return-left" class="icon" @click="leaveRoom"></ion-icon>
                <ion-icon name="create" class="icon" @click="openEditRoom"></ion-icon>
                <ion-icon name="analytics" class="icon" @click="viewRoomDetails"></ion-icon>
                <ion-icon name="people" class="icon" @click="toggleUserList"></ion-icon>
              </div>
            </div>
            <MessageList :messages="messages" />
            <transition name="slideDown">
              <div v-show="usersTyping.length > 0" class="chat__utyping">
                <span>{{ getUsersTyping }}</span>
              </div>
            </transition>
            <ChatInput />
          </div>
        </div>
      </div>
      <Modal v-if="getCurrentRoom" ref="editRoom" name="editRoom">
        <template slot="header">
          <h2 class="text-upper">{{ $t('edit') }}: {{ getCurrentRoom.name }}</h2>
        </template>
        <template slot="body">
          <form slot="body" class="form form--nbs pt-3" @submit="handleEditRoom">
            <div class="form__input-group">
              <ion-icon name="pricetags" class="form__icon"></ion-icon>
              <input
                v-model.trim="newRoomName"
                :placeholder="$t('room_placeholder_new')"
                type="text"
                name="roomName"
                class="form__control"
                pattern=".{3,20}"
                required
              />
              <label for="roomName" class="form__label">{{ $t('room_name_new') }}</label>
            </div>
            <Error :errors="errors" />
            <button type="submit" class="btn btn--clear btn--info">
              {{ $t('update') }}
            </button>
          </form>
        </template>
      </Modal>
      <Modal v-if="getCurrentRoom && messages" ref="roomDetails" name="roomDetails">
        <template slot="header">
          <h2 class="lead text-upper">{{ $t('room_details') }}: {{ getCurrentRoom.name }}</h2>
        </template>
        <template slot="body">
          <div class="infobox">
            <div class="infobox__item">
              <ion-icon name="planet" class="icon icon-lg"></ion-icon>
            </div>
            <div class="infobox__item">
              <span class="infobox__item--left">{{ $t('online_users') }}</span>
              <span class="infobox__item--right">{{ getCurrentRoom.users.length }}</span>
            </div>
            <div class="infobox__item">
              <span class="infobox__item--left">{{ $t('messages') }}</span>
              <span class="infobox__item--right">{{ messages.length }}</span>
            </div>
            <div class="infobox__item">
              <span class="infobox__item--left">{{ $t('room_admin') }}</span>
              <span class="infobox__item--right">
                {{ getCurrentRoom.user ? getCurrentRoom.user.handle : $t('unknown') + ' ' + $t('user') }}
              </span>
            </div>
            <div class="infobox__item">
              <span class="infobox__item--left">{{ $t('created') }}</span>
              <span class="infobox__item--right">
                {{ moment(getCurrentRoom.created_at).fromNow() }}
              </span>
            </div>
          </div>
        </template>
      </Modal>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import MessageList from '@/components/chat/MessageList.vue';
import ChatInput from '@/components/chat/ChatInput.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import Modal from '@/components/layout/Modal.vue';
import Error from '@/components/error/Error.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Room',
  components: {
    MessageList,
    ChatInput,
    Sidebar,
    Error,
    Modal
  },
  data: function() {
    return {
      room: [],
      users: [],
      usersTyping: [],
      messages: [],
      newRoomName: '',
      sidebarVisible: window.innerWidth < 768 ? false : true,
      searchInput: '',
      errors: [],
      roomLeft: false
    };
  },
  computed: {
    ...mapGetters(['getUserData', 'getCurrentRoom', 'getSocket']),
    filteredUsers() {
      return this.users
        .slice()
        .sort(this.sortAlphabetical)
        .filter((user) => user.lookup.username.toLowerCase().includes(this.searchInput.toLowerCase()));
    },
    getUsersTyping() {
      if (this.usersTyping.length > 0) {
        return `${this.usersTyping.join(', ')} ${this.$t('typing')}`;
      }
    }
  },
  methods: {
    ...mapActions(['saveCurrentRoom']),
    checkUserTabs(room) {
      if (room && room.users.findIndex((user) => user.lookup._id === this.getUserData._id) === -1) {
        this.$router.push({ name: 'RoomList' });
      }
    },
    sortAlphabetical(a, b) {
      let userA = a.lookup.username.toUpperCase();
      let userB = b.lookup.username.toUpperCase();
      if (userA < userB) {
        return -1;
      }
      if (userA > userB) {
        return 1;
      }
      return 0;
    },
    leaveRoom(e, newPage) {
      if (e) {
        e.preventDefault();
      }
      axios
        .post(
          '/api/room/remove/users',
          { room_name: this.getCurrentRoom.name },
          { params: { lang: this.$i18n.locale } }
        )
        .then((res) => {
          if (this.room.access || this.room.accessIds.includes(this.getUserData._id)) {
            this.getSocket.emit('exitRoom', {
              room: res.data,
              user: null,
              admin: true,
              content: `${this.getUserData.handle}
              ${this.$t('left_the_room')} ${this.getCurrentRoom.name}`
            });
          }
          this.roomLeft = true;
          if (!newPage) {
            this.$router.push({ name: 'RoomList' });
          }
        });
    },
    openEditRoom() {
      this.$refs.editRoom.open();
    },
    handleEditRoom(e) {
      e.preventDefault();
      axios
        .post(
          '/api/room/update/name',
          { room_name: this.getCurrentRoom.name, new_room_name: this.newRoomName },
          { params: { lang: this.$i18n.locale } }
        )
        .then((res) => {
          if (res.data.errors) {
            for (const error of res.data.errors) {
              const [key] = Object.keys(error);
              const [value] = Object.values(error);
              this.errors.push({ key, value });
            }
          } else {
            this.$refs.editRoom.close();
            this.getSocket.emit('roomUpdateEvent', {
              oldRoomName: this.getCurrentRoom.name,
              room: res.data
            });
            this.getSocket.emit('newMessage', {
              room: this.getCurrentRoom,
              user: this.getUserData,
              admin: true,
              content: `${this.getUserData.username}
              ${this.$t('updated_the_room_name')} ${this.getCurrentRoom.name}
              ${this.$t('to')} ${this.newRoomName}`
            });
            this.newRoomName = '';
          }

          setTimeout(() => {
            this.errors = [];
          }, 1500);
        })
        .catch((err) => console.log(err));
    },
    viewRoomDetails() {
      this.$refs.roomDetails.open();
    },
    toggleUserList() {
      this.$refs.userList.toggle();
      this.sidebarVisible = !this.sidebarVisible;
    }
  },
  created() {
    axios
      .get(`/api/room/${this.$route.params.id}`)
      .then((res) => {
        this.room = res.data;
        this.users = res.data.users;
        this.$store.dispatch('saveCurrentRoom', res.data);

        /** Check for private access and access Id */
        if (!res.data.access) {
          if (!res.data.accessIds.includes(this.getUserData._id) && this.getUserData._id !== res.data.user.lookup._id) {
            return this.$router.push({
              name: 'RoomList',
              params: { message: this.$t('no_room_access') }
            });
          }
        }
        /** Socket IO: User join event, get latest messages from room */
        this.getSocket.emit('userJoined', {
          room: this.getCurrentRoom,
          user: this.getUserData,
          content: `${this.getUserData.handle} ${this.$t('no_room_access')} ${this.getCurrentRoom.name}`,
          admin: true
        });

        /** Socket IO: Received New User Event */
        this.getSocket.on('updateRoomData', (data) => {
          data = JSON.parse(data);
          if (data.messages) {
            this.messages = data.messages;
          }

          if (data.room) {
            this.room = data.room;
            this.users = data.room.users;
            this.$store.dispatch('saveCurrentRoom', data.room);
          }
        });

        /** Socket IO: Reconnect User Event */
        this.getSocket.on('reconnect', () => {
          this.usersTyping = [];
          this.getSocket.emit('reconnectUser', {
            room: this.getCurrentRoom,
            user: this.getUserData
          });
        });

        this.getSocket.on('reconnected', () => {
          console.warn('Reconnected');
        });

        this.getSocket.on('disconnect', () => {
          console.warn('Disconnected');
        });

        /** Socket IO: User Exit Event - Update User List */
        this.getSocket.on('updateUserList', (data) => {
          this.users = JSON.parse(data).users;
        });

        /** Socket IO: User Exit Event - Check other tabs of the same room and redirect */
        this.getSocket.on('receivedUserExit', (room) => {
          this.checkUserTabs(room);
        });

        /** Socket IO: New Messaage Event - Append the new message to the messages array */
        this.getSocket.on('receivedNewMessage', (message) => {
          this.messages.push(JSON.parse(message));
        });

        /** Socket IO: User Typing Event  */
        this.getSocket.on('receivedUserTyping', (data) => {
          this.usersTyping = JSON.parse(data).filter((user) => user !== this.getUserData.handle);
        });

        /** Socket IO: Room Deleted Event - Redirect all users */
        this.getSocket.on('roomDeleted', () => {
          this.$store.dispatch('saveCurrentRoom', null);
          setTimeout(() => {
            this.$router.push({ name: 'RoomList' });
          }, 2000);
        });

        /** Socket IO: Room Updated Event */
        this.getSocket.on('roomUpdated', (data) => {
          this.room = JSON.parse(data).room;
          this.$store.dispatch('saveCurrentRoom', JSON.parse(data).room);
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          this.$router.push({
            name: 'RoomList',
            params: { message: this.$t('room_not_found') }
          });
        }
      });
  },
  beforeDestroy() {
    if (this.getCurrentRoom && !this.roomLeft) {
      this.leaveRoom(null, true);
    }
    this.getSocket.removeListener('userJoined');
  },
  mounted() {}
};
</script>

<style lang="scss">
@import '@/assets/scss/views/chat.scss';
@import '@/assets/scss/components/infobox.scss';
</style>
