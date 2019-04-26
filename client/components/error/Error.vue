<template>
  <transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
    <div v-if="errors" v-show="errors.length !== 0" class="form__error">
      <transition-group
        name="fade"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
      >
        <span v-for="error in errors" :key="error.key">
          {{ error.value }}
        </span>
      </transition-group>
    </div>
    <div v-else v-show="errorMessage" class="mb-6 form__error">
      <transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
        <span>{{ errorMessage }}</span>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Error',
  props: ['errors', 'errorMessage'],
  data: function() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.error {
}
</style>
