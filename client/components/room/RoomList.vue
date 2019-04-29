<template>
  <div class="page roomList">
    <section class="section section--mmt mb-3">
      <div class="section__heading mt-6">
        <span class="section__title">{{ $t('roomList_title') }}</span>
      </div>
      <div class="section__content">
        <Error :errorMessage="errorMessage" />
        <p class="section__lead">{{ $t('roomList_leadMsg') }}</p>
        <div v-if="rooms" class="rooms">
          <div class="rooms__header">
            <div class="rooms__details">
              <div class="rooms__details-item">
                {{ $t('roomList_total') }}:
                <span class="badge badge--info">{{ rooms.length }}</span>
              </div>
              <div class="rooms__details-item">
                {{ $t('roomList_private') }}:
                <span class="badge badge--danger">{{ getPrivateRooms.length }}</span>
              </div>
              <div class="rooms__details-item">
                {{ $t('roomList_public') }}:
                <span class="badge badge--success">{{ getPublicRooms.length }}</span>
              </div>
            </div>
            <input
              v-model.trim="searchInput"
              :placeholder="$t('search') + ' | ' + $t('enter') + ' ' + $t('search_arg1') + ' ' + $t('search_arg2')"
              type="text"
              class="rooms__search-input"
            />
          </div>
          <transition name="slideDown">
            <ul class="rooms__list">
              <transition-group v-if="filteredRooms.length > 0" name="slideUp">
                <li v-for="room in filteredRooms" :key="room._id" class="rooms__list-item">
                  <a :href="`room/${room._id}`" class="rooms__list-item-link" @click.prevent="handleRoomClick(room)">
                    <div class="rooms__item-container">
                      <div class="rooms__item-details">
                        <p>{{ room.name }}</p>
                        <p :class="{ public: room.access, private: !room.access }">
                          {{ room.access === true ? $t('public') : $t('private') }}
                        </p>
                        <p>
                          <strong>{{ $t('users') }}:</strong>
                          {{ room.users.length }}
                        </p>
                        <p>
                          <strong>{{ $t('room_admin') }}:</strong>
                          {{ room.user ? room.user.username : $t('unknown') + ' ' + $t('user') }}
                        </p>
                      </div>
                      <div class="rooms__item-actions">
                        <div v-show="room.user && getUserData._id === room.user._id" class="rooms__item-action">
                          <a :name="room.name" class="btn btn--danger" @click.stop="handleDelete">
                            {{ $t('delete') }}
                          </a>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              </transition-group>
              <transition-group v-else>
                <span :key="0">{{ $t('no_rooms') }}</span>
              </transition-group>
            </ul>
          </transition>
          <!-- Private Room Enter Modal -->
          <Modal ref="privateRoom" name="private-room">
            <template slot="header">
              <h2 class="text-upper">{{ $t('enter') }} {{ privateRoomName || $t('private') + ' ' + $t('room') }}</h2>
            </template>
            <template slot="body">
              <form slot="body" class="form form--nbs pt-3" @submit="handlePrivateRoomCheck">
                <div class="form__input-group">
                  <ion-icon name="key" class="form__icon"></ion-icon>
                  <input
                    v-model.trim="privateRoomPassword"
                    :placeholder="$t('password_placeholder')"
                    type="password"
                    name="password"
                    class="form__control"
                  />
                  <label for="password" class="form__label">{{ $t('password') }}</label>
                </div>
                <Error :errors="errors" />
                <button type="submit" class="btn btn--clear btn--info">
                  {{ $t('room_placeholder') }}
                </button>
              </form>
            </template>
          </Modal>
          <!-- Create Room Modal -->
          <Modal ref="createRoom" name="create-room">
            <template slot="header">
              <h2 class="text-upper">{{ $t('create') }}</h2>
            </template>
            <template slot="body">
              <form slot="body" class="form form--nbs pt-3" @submit="handleCreateRoom">
                <div class="form__input-group">
                  <ion-icon name="list-box" class="form__icon"></ion-icon>
                  <input
                    v-model.trim="room_name"
                    :placeholder="$t('room_placeholder_name')"
                    type="text"
                    name="room_name"
                    class="form__control"
                  />
                  <label for="room_name" class="form__label">{{ $t('room_name') }}</label>
                </div>
                <div class="form__input-group">
                  <ion-icon name="key" class="form__icon"></ion-icon>
                  <input
                    v-model.trim="password"
                    :placeholder="$t('password_placeholder')"
                    :title="$t('password_title')"
                    type="password"
                    name="password"
                    class="form__control"
                    pattern=".{5,10}"
                  />
                  <label for="password" class="form__label"> {{ $t('password') }} ({{ $t('optional') }}) </label>
                </div>
                <Error :errors="errors" />
                <button type="submit" class="btn btn--clear btn--danger">{{ $t('create') }}</button>
              </form>
            </template>
          </Modal>
          <div class="rooms__actions">
            <a class="btn btn--info" @click="openModal">{{ $t('create') }}</a>
            <a class="btn btn--info" @click="fetchRoomData">{{ $t('refresh') }}</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import Modal from '@/components/layout/Modal';
import { mapActions, mapGetters } from 'vuex';
import Error from '@/components/error/Error.vue';

export default {
  name: 'RoomList',
  props: ['message'],
  components: {
    Modal: Modal,
    Error
  },
  data: function() {
    return {
      rooms: [],
      room_name: null,
      privateRoomName: null,
      password: null,
      privateRoomPassword: null,
      searchInput: '',
      errorMessage: this.message,
      errors: []
    };
  },
  computed: {
    ...mapGetters(['getUserData', 'getRoomData', 'getSocket']),
    getPrivateRooms() {
      return this.rooms.filter((room) => room.access === false);
    },
    getPublicRooms() {
      return this.rooms.filter((room) => room.access === true);
    },
    filteredRooms() {
      if (this.searchInput.toLowerCase() === 'my_rooms') {
        return this.rooms.filter((room) => room.user._id === this.getUserData._id);
      } else {
        return this.rooms
          .slice()
          .sort(this.sortAlphabetical)
          .filter((room) => room.name.toLowerCase().includes(this.searchInput.toLowerCase()));
      }
    }
  },
  methods: {
    ...mapActions(['updateRoomData', 'addRoom', 'deleteRoom', 'saveCurrentRoom']),
    sortAlphabetical(a, b) {
      let roomA = a.name.toUpperCase();
      let roomB = b.name.toUpperCase();
      if (roomA < roomB) {
        return -1;
      }
      if (roomA > roomB) {
        return 1;
      }
      return 0;
    },
    checkLingeringUser(data) {
      for (const room of data) {
        if (room.users.some((room) => room._id === this.getUserData._id)) {
          return true;
        }
      }
      return false;
    },
    fetchRoomData() {
      axios
        .get('/api/room')
        .then((res) => {
          if (this.checkLingeringUser(res.data)) {
            return axios.put(`/api/room/remove/users/all`, {
              user_id: this.getUserData._id
            });
          } else {
            this.$store.dispatch('updateRoomData', res.data);
            this.rooms = res.data;
          }
        })
        .then((res) => {
          if (res && res.data) {
            this.rooms = res.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openModal() {
      this.$refs.createRoom.open();
    },
    enterRoom(room) {
      this.$router.push({ name: 'Room', params: { id: room._id } });
    },
    handleCreateRoom(e) {
      e.preventDefault();
      axios
        .post(
          '/api/room',
          { room_name: this.room_name, password: this.password },
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
            this.$store.dispatch('addRoom', res.data);
            this.room_name = null;
            this.password = null;
            this.$refs.createRoom.close();
            this.getSocket.emit('roomAdded', res.data);
          }
        })
        .catch((err) => err);

      setTimeout(() => {
        this.errors = [];
      }, 1500);
    },
    handleDelete(e) {
      e.preventDefault();
      axios
        .delete(`/api/room/${e.target.name}`)
        .then((res) => {
          this.$store.dispatch('deleteRoom', res.data);
          this.getSocket.emit('roomDeleted', {
            room: res.data,
            user: this.getUserData,
            admin: true,
            content: `${res.data.user.username} deleted room ${res.data.name}`
          });
        })
        .catch((err) => err);
    },
    handleRoomClick(room) {
      if (room.access || this.getUserData._id === room.user._id || room.accessIds.includes(this.getUserData._id)) {
        this.enterRoom(room);
      } else {
        this.privateRoomName = room.name;
        this.$refs.privateRoom.setData('room', room);
        this.$refs.privateRoom.open();
      }
    },
    handlePrivateRoomCheck(e) {
      e.preventDefault();
      axios
        .post(
          '/api/room/verify',
          {
            room_name: this.$refs.privateRoom.modalData.room.name,
            password: this.privateRoomPassword
          },
          { params: { lang: this.$i18n.locale } }
        )
        .then((res) => {
          if (res.data.errors) {
            for (const error of res.data.errors) {
              const [key] = Object.keys(error);
              const [value] = Object.values(error);
              this.errors.push({
                key,
                value
              });
            }
            this.privateRoomPassword = null;
          } else {
            if (res.data.success) {
              this.enterRoom(this.$refs.privateRoom.modalData.room);
            }
          }

          setTimeout(() => {
            this.errors = [];
          }, 1500);
        })
        .catch((err) => err);
    }
  },
  created() {
    this.getSocket.on('roomAdded', (data) => {
      this.rooms.unshift(JSON.parse(data));
    });

    this.getSocket.on('roomListUpdated', (data) => {
      this.rooms = this.rooms.filter((room) => room._id !== JSON.parse(data).room._id);
    });

    this.getSocket.on('updateRooms', (data) => {
      this.rooms = JSON.parse(data).room;
    });

    this.getSocket.on('roomNameUpdated', (data) => {
      let updateIndex = 0;
      this.rooms.forEach((room, index) => {
        if (room._id === JSON.parse(data).room._id) {
          updateIndex = index;
        }
      });
      this.rooms.splice(updateIndex, 1, JSON.parse(data).room);
    });
  },
  mounted() {
    this.fetchRoomData();
    if (this.errorMessage) {
      setTimeout(() => {
        this.errorMessage = '';
      }, 1500);
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/views/rooms.scss';
</style>
