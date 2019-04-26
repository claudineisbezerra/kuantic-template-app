<template>
  <div class="page home">
    <section class="section section__landing">
      <div class="section__heading">
        <span class="section__title">
          <vue-typed-js
            v-if="languageActive"
            :strings="[$t('typedOption_1'), $t('typedOption_2'), $t('typedOption_3')]"
            :loop="true"
            :backSpeed="100"
            :typeSpeed="100"
            :backDelay="1000"
          >
            <span class="typing"></span>
          </vue-typed-js>
        </span>
      </div>

      <div class="section__content">
        <p class="section__lead">
          {{ $t('homeLead') }}
        </p>
        <router-link to="/about" class="btn btn--anim btn--white">{{ $t('learnMore') }}</router-link>
        <router-link to="/register" class="btn btn--anim btn--info">
          {{ $t('registerNow') }}
        </router-link>
        <div class="section__graphic">
          <img src="@/assets/img/undraw_group_chat_v059.svg" alt />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /client
import Typed from 'typed.js';

export default {
  name: 'Home',
  components: {},
  props: [],
  data: function() {
    return {
      languageActive: true
    };
  },
  created() {
    let self = this;
    // Watch global self.$i18n.locale change
    self.$watch(
      function() {
        return self.$i18n.locale;
      },
      function(newVal, oldVal) {
        if (newVal) {
          self.switchLocale();
        }
      }
    );
  },
  methods: {
    // Work around to trigger Vue event and refresh browser objects
    switchLocale() {
      this.languageActive = false;
      setTimeout(() => {
        this.languageActive = true;
      }, 1);
    }
  }
};
</script>
