<template>
  <footer class="footer section__footer">
    <div class="footer__content">
      <div class="footer__left">
        <span> {{ $t('copyright') }} &copy; {{ $t('copyrightYear') }} {{ $t('copyrightOwner') }} </span>
      </div>
      <div class="footer__right">
        <span>{{ $t('licenseMsg') }}</span>
        <a href="https://github.com/claudineisbezerra/kuantic-template-app" target="_blank" class="nav__link">
          <ion-icon name="logo-github" class="footer__icon"></ion-icon>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style lang="scss">
@import '@/assets/scss/components/footer.scss';
</style>
