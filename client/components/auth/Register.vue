<template>
  <div class="page login">
    <section class="section section__landing">
      <div class="section__heading">
        <span class="section__title">{{ $t('register_title') }}</span>
      </div>
      <div class="section__content">
        <p class="section__lead">{{ $t('register_welcomeLead') }}</p>
        <div class="social">
          <OAuth provider="facebook" icon="logo-facebook" classes="social__item--facebook" />
          <OAuth provider="google" icon="logo-googleplus" classes="social__item--google" />
        </div>
        <form class="form" @submit.prevent="handleSubmit">
          <span class="form__lead">
            <ion-icon name="person-add" class="icon"></ion-icon>{{ $t('register_welcomeMsg') }}
          </span>
          <br />
          <div class="form__input-group">
            <ion-icon name="pricetags" class="form__icon"></ion-icon>
            <input
              v-model.trim="username"
              :placeholder="$t('username_placeholder')"
              type="text"
              name="username"
              class="form__control"
              required
            />
            <label for="username" class="form__label">{{ $t('username') }}</label>
          </div>
          <div class="form__input-group">
            <ion-icon name="person" class="form__icon"></ion-icon>
            <input
              v-model.trim="email"
              :placeholder="$t('email_placeholder')"
              type="email"
              name="email"
              class="form__control"
              required
            />
            <label for="email" class="form__label">{{ $t('email') }}</label>
          </div>
          <div class="form__input-group">
            <ion-icon name="lock" class="form__icon"></ion-icon>
            <input
              v-model.trim="password"
              :placeholder="$t('password_placeholder')"
              :title="$t('password_title')"
              type="password"
              name="password"
              class="form__control"
              pattern=".{5,15}"
              required
            />
            <label for="password" class="form__label">{{ $t('password') }}</label>
          </div>
          <div class="form__info-group">
            <span>{{ $t('register_accountMsg') }}</span>
            <router-link to="/login" class="form__link btn btn--rounded">
              {{ $t('login') }}
            </router-link>
          </div>
          <Error :errors="errors" />
          <button type="submit" class="form__submit">{{ $t('register') }}</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
import slugify from 'slugify';
import Error from '../error/Error.vue';
import OAuth from '../social/OAuth.vue';
import setAuthToken from '../../utils/authToken';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Register',
  components: {
    Error,
    OAuth
  },
  data: function() {
    return {
      username: '',
      email: '',
      password: '',
      errors: []
    };
  },
  computed: {
    ...mapGetters(['getSocket'])
  },
  methods: {
    ...mapActions(['saveUserData', 'toggleAuthState']),
    handleSubmit() {
      this.errors = [];

      if (this.username && this.email && this.password) {
        axios
          .post(
            '/api/auth/register',
            {
              handle: slugify(this.username.toLowerCase()),
              username: this.username,
              email: this.email,
              password: this.password
            },
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
              localStorage.setItem('authToken', res.data.token);
              this.$store.dispatch('toggleAuthState', true);
              this.$store.dispatch('saveUserData', true);

              setAuthToken(res.data.token);

              this.$router.push({
                name: 'UserProfile',
                params: {
                  handle: res.data.user.handle,
                  lang: this.$i18n.locale
                }
              });
            }
          });
      }

      setTimeout(() => {
        this.errors = [];
      }, 1500);
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
@import '@/assets/scss/components/form.scss';
</style>
