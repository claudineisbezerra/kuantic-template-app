<template>
  <div class="page profile">
    <div class="section section--mmt">
      <div class="section__heading mt-10">
        <span class="section__title">{{ user.username }}</span>
      </div>
      <div class="section__content">
        <div class="userProfile__container">
          <span class="lead">{{ user.username }} {{ $t('profile') }}</span>
          <div class="userProfile__item">
            <ion-icon name="contact" class="icon icon-lg"></ion-icon>
          </div>
          <div class="userProfile__item">
            <span class="userProfile__item--left">{{ $t('email') }}</span>
            <span class="userProfile__item--right">{{ user.email }}</span>
          </div>
          <div class="userProfile__item">
            <span class="userProfile__item--left">{{ $t('username') }}</span>
            <span class="userProfile__item--right">{{ user.username }}</span>
          </div>
          <div class="userProfile__item">
            <span class="userProfile__item--left">Location</span>
            <span class="userProfile__item--right">{{ user.location || $t('unknown') }}</span>
          </div>
          <div class="userProfile__actions mt-3">
            <a class="btn btn--info" @click="$router.go(-1)">{{ $t('back') }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'UserProfile',
  data: function() {
    return {
      user: {}
    };
  },
  computed: {
    ...mapGetters(['getUserData', 'isAuthorized'])
  },
  methods: {
    ...mapActions(['saveUserData', 'toggleAuthState'])
  },
  created() {
    if (localStorage.getItem('authToken')) {
      axios
        .get(`/api/profile/${this.$route.params.username}`)
        .then((res) => (this.user = res.data))
        .catch((err) => err);
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
@import '@/assets/scss/views/profile.scss';
</style>
