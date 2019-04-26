<template>
  <ul class="navbar__nav navbar__nav--right">
    <li class="nav__item">
      <router-link
        v-if="Object.keys(user).length > 0"
        :to="{ name: 'UserProfile', params: { handle: user.handle } }"
        class="nav__link nav__link--rounded"
      >
        {{ user.handle }}
      </router-link>
    </li>
    <li class="nav__item">
      <button class="nav__link nav__link--btn nav__link--rounded" @click.prevent="logout">
        {{ $t('logout') }}
      </button>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SignedInLinks',
  props: ['logout', 'user'],
  data: function() {
    return {};
  },
  computed: {
    ...mapGetters(['getUserData', 'isAuthorized'])
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/navbar.scss';
</style>
