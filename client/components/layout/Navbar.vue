<template>
  <header>
    <nav class="nav">
      <div class="navbar__brand">
        <ion-icon name="rocket" class="navbar__icon navbar__icon--logo"></ion-icon>
        <router-link to="/" class="navbar__textbrand">{{ $t('appName') }}</router-link>
      </div>
      <span class="navbar__toggle">
        <ion-icon
          name="menu"
          class="navbar__icon navbar__toggle--icon"
          @click="navToggleState = !navToggleState"
        ></ion-icon>
      </span>
      <ul v-if="!isAuthorized" class="navbar__nav">
        <li class="nav__item">
          <router-link to="/" class="nav__link">
            {{ $t('home') }}
          </router-link>
        </li>
        <li class="nav__item">
          <router-link to="/about" class="nav__link">
            {{ $t('about') }}
          </router-link>
        </li>
      </ul>
      <ul v-if="!isAuthorized" class="navbar__nav navbar__nav--right">
        <li class="nav__item">
          <router-link to="/login" class="nav__link nav__link--rounded">
            {{ $t('login') }}
          </router-link>
        </li>
        <li class="nav__item">
          <router-link to="/register" class="nav__link nav__link--rounded">
            {{ $t('signUp') }}
          </router-link>
        </li>
        <li class="nav__item">
          <button v-for="entry in languages" :key="entry.flag" class="nav__btn" @click="changeLocale(entry.language)">
            <flag :iso="entry.flag" :squared="false" />
          </button>
        </li>
        <li class="nav__item">
          <a href="https://github.com/claudineisbezerra/kuantic-template-app" target="_blank" class="nav__link">
            <ion-icon name="logo-github" class="navbar__icon"></ion-icon>
          </a>
        </li>
      </ul>
      <SignedInLinks v-if="isAuthorized" :logout="logout" :user="user" />
    </nav>

    <nav :class="{ 'snav--shown': navToggleState }" class="snav">
      <Particle name="particlejs-nav" />
      <ul v-if="!isAuthorized" class="snav__nav">
        <li class="snav__item" @click="closeSideNav">
          <router-link to="/" class="nav__link">
            {{ $t('home') }}
          </router-link>
        </li>
        <li class="snav__item" @click="closeSideNav">
          <router-link to="/about" class="nav__link">
            {{ $t('about') }}
          </router-link>
        </li>
        <li class="snav__item" @click="closeSideNav">
          <router-link to="/login" class="nav__link nav__link--rounded">
            {{ $t('login') }}
          </router-link>
        </li>
        <li class="snav__item" @click="closeSideNav">
          <router-link to="/register" class="nav__link nav__link--rounded">
            {{ $t('signUp') }}
          </router-link>
        </li>
        <li class="snav__item">
          <button v-for="entry in languages" :key="entry.flag" class="nav__btn" @click="changeLocale(entry.language)">
            <flag :iso="entry.flag" :squared="false" />
          </button>
        </li>
        <li class="snav__item">
          <a href="https://github.com/claudineisbezerra/kuantic-template-app" target="_blank" class="nav__link">
            <ion-icon name="logo-github" class="navbar__icon"></ion-icon>
          </a>
        </li>
      </ul>

      <ul v-if="isAuthorized" class="snav__nav">
        <li class="snav__item" @click="closeSideNav">
          <router-link
            v-if="Object.keys(user).length > 0"
            :to="{ name: 'UserProfile', params: { handle: user.handle } }"
            class="nav__link nav__link--rounded"
          >
            {{ user.handle }}
          </router-link>
        </li>
        <li class="snav__item" @click="closeSideNav">
          <button class="nav__link nav__link--btn nav__link--rounded" @click.prevent="logout">
            {{ $t('logout') }}
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Particle from '@/components/layout/Particle.vue';
import SignedInLinks from '@/components/layout/SignedInLinks.vue';
import i18n from '../../plugins/i18n';

export default {
  name: 'Navbar',
  components: {
    Particle: Particle,
    SignedInLinks
  },
  data: function() {
    return {
      navToggleState: false,
      languages: [{ flag: 'us', language: 'en', title: 'English' }, { flag: 'br', language: 'pt', title: 'Português' }]
    };
  },
  computed: {
    ...mapGetters(['getUserData', 'isAuthorized']),
    user() {
      return this.getUserData;
    }
  },
  methods: {
    changeLocale(locale) {
      i18n.locale = locale;
      this.moment.locale(locale);
    },
    ...mapActions(['toggleAuthState']),
    closeSideNav() {
      this.navToggleState = false;
    },
    logout() {
      if (localStorage.getItem('authToken')) {
        localStorage.clear();
        this.$store.dispatch('toggleAuthState', false);
        this.$router.push({ name: 'Login' });
      }
    }
  },
  created() {
    if (localStorage.getItem('authToken')) {
      this.$store.dispatch('toggleAuthState', true);
    } else {
      localStorage.clear();
      this.$store.dispatch('toggleAuthState', false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/navbar.scss';
</style>
