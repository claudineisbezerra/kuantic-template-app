<template>
  <div class="page appHome">
    <section class="section section__landing">
      <div class="section__heading"></div>

      <div class="section__content">
        <a href="https://coreui.io/vue/demo/#/dashboard" target="_blank" class="btn btn--anim btn--white">
          CoreUI for Vue.js | Bootstrap 4.x
          <br />
          Free Vue.js | Bootstrap 4.x Admin Template
        </a>
        <a
          href="https://panjiachen.github.io/vue-element-admin/#/dashboard"
          target="_blank"
          class="btn btn--anim btn--info"
        >
          UI Toolkit element-ui for Vue.js
          <br />
          Free Vue.js | element-ui Admin Template
        </a>
        <a href="https://vuestic.epicmax.co/#/admin/dashboard" target="_blank" class="btn btn--anim btn--info">
          Vuestic Admin Dashboard for Vue.js | Bootstrap 4.x
          <br />
          Free Vue.js | Bootstrap 4.x Admin Template
        </a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AppHome',
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
  mounted() {},
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
