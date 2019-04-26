<template>
  <transition name="fade">
    <div v-show="visible" class="modal">
      <transition name="slideDown">
        <div v-show="visible" class="modal__content">
          <div class="modal__header">
            <slot name="header">
              <h4>{{ $t('header_default') }}</h4>
            </slot>
          </div>
          <div class="modal__body">
            <slot name="body">
              <h4>{{ $t('body_content_default') }}</h4>
            </slot>
          </div>
          <div class="modal__footer">
            <slot name="footer">
              <a slot="footer" class="btn btn--modal" @click="close">{{ $t('close') }}</a>
            </slot>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: ['name'],
  data: function() {
    return {
      visible: false
    };
  },
  computed: {
    modalData() {
      return this.$data;
    }
  },
  methods: {
    close() {
      this.visible = false;
    },
    open() {
      this.visible = true;
    },
    setData(key, value) {
      this.$data[key] = value;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/modal.scss';
</style>
