<template>
  <div class="page profile">
    <section class="section section--profile mt-6 profile__content">
      <div class="section__heading mt-6 mb-3">
        <span class="section__title">{{ $t('userProfile_title') }}</span>
      </div>
      <div class="section__content">
        <router-link :to="{ name: 'RoomList' }" class="btn btn--info mt-3 center">
          {{ $t('userProfile_sectionMsg') }}
        </router-link>
        <div v-if="user" class="infobox__container">
          <span class="lead">{{ $t('userProfile_leadMsg') }}</span>
          <div v-if="user.social.id === null" class="infobox__item">
            <img :src="user.image" alt class="profile__image" />
          </div>
          <div v-else class="infobox__item">
            <img :src="user.social.image" alt class="profile__image" />
          </div>
          <div class="infobox__item">
            <span class="infobox__item--left">{{ $t('handle') }}</span>
            <span class="infobox__item--right">{{ user.handle }}</span>
          </div>
          <div class="infobox__item">
            <span class="infobox__item--left">{{ $t('email') }}</span>
            <span v-if="user.social.email === null" class="infobox__item--right">
              {{ user.email }}
            </span>
            <span v-else class="infobox__item--right">{{ user.social.email }}</span>
          </div>
          <div class="infobox__item">
            <span class="infobox__item--left">{{ $t('username') }}</span>
            <span class="infobox__item--right">{{ user.username }}</span>
          </div>
          <div class="infobox__item">
            <span class="infobox__item--left">{{ $t('location') }}</span>
            <span class="infobox__item--right">{{ user.location || $t('unknown') }}</span>
          </div>
          <div v-if="user" class="infobox__actions mt-3">
            <router-link :to="{ name: 'EditUserProfile', params: { handle: user.handle } }" class="btn btn--info">
              {{ $t('edit') }}
            </router-link>
            <a href="#" class="btn btn--danger" @click.prevent="handleDeleteModal">
              {{ $t('delete') }}
            </a>
          </div>
        </div>
        <Modal ref="deleteUser" name="deleteUser">
          <template slot="header">
            <h2 class="text-upper">{{ $t('delete') }}</h2>
          </template>
          <template slot="body">
            <p class="lead">{{ $t('undone_warning') }}</p>
            <p class="lead mt-6">{{ $t('deleteAccountQuestion') }}</p>
            <div class="actions mt-6">
              <a href="#" class="btn btn--danger" @click.prevent="handleDelete">
                {{ $t('deleteAccountConfirmation') }}
              </a>
            </div>
          </template>
        </Modal>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import { mapActions, mapGetters } from 'vuex';
import Modal from '@/components/layout/Modal.vue';

export default {
  name: 'UserProfile',
  components: {
    Modal
  },
  data: function() {
    return {
      user: null
    };
  },
  computed: {
    ...mapGetters(['getUserData', 'isAuthorized'])
  },
  methods: {
    ...mapActions(['saveUserData', 'toggleAuthState', 'deleteUserAccount']),
    handleDeleteModal() {
      this.$refs.deleteUser.open();
    },
    handleDelete() {
      this.$refs.deleteUser.close();
      this.$store.dispatch('deleteUserAccount');
    }
  },
  created() {
    if (localStorage.getItem('authToken') && _.isEmpty(this.getUserData)) {
      axios
        .get(`/api/user/current`)
        .then((res) => {
          this.$store.dispatch('saveUserData', res.data);
          this.$store.dispatch('toggleAuthState', true);
          this.user = res.data;
        })
        .catch((err) => err);
    } else {
      this.user = this.getUserData;
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/views/profile.scss';
@import '@/assets/scss/components/infobox.scss';
</style>
