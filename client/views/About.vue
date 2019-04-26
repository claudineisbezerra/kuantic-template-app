<template>
  <div class="page home">
    <section class="section section__landing">
      <div class="section__heading">
        <span class="section__title">{{ $t('about') }} {{ $t('appName') }}</span>
      </div>
      <div class="section__content">
        <p class="section__lead">
          {{ $t('about_lead') }}
        </p>
        <div class="section__graphic">
          <img src="@/assets/img/undraw_programmer_imem.svg" alt />
        </div>
        <span class="heading-lg center">{{ $t('about_features') }}</span>
        <div class="features">
          <div class="features__item">
            <span>
              <a href="https://expressjs.com/" target="_blank" class="btn btn--info">{{ $t('about_expressjs') }}</a>
              {{ $t('about_expressjsMsg') }}
            </span>
          </div>
          <div class="features__item">
            <span>
              {{ $t('about_jwtMsg') }}
              <a href="https://jwt.io/" target="_blank" class="btn btn--info">{{ $t('about_jwt') }}</a>
              {{ $t('about_jwtMsgTokens') }}
            </span>
          </div>
          <div class="features__item">
            <span>
              {{ $t('about_jwtMsgAuthenticates') }}
              <a href="https://jwt.io/" target="_blank" class="btn btn--info">{{ $t('about_jwt') }}</a>
              {{ $t('about_passportMsg') }}
              <a href="http://www.passportjs.org/" target="_blank" class="btn btn--danger">
                {{ $t('about_passport') }}
              </a>
            </span>
          </div>
          <div class="features__item">
            <span>
              {{ $t('about_bcryptjsMsg') }} {{ $t('about_package') }}
              <a href="https://www.npmjs.com/package/bcryptjs" target="_blank" class="btn btn--success">
                {{ $t('about_bcryptjs') }}
              </a>
            </span>
          </div>
          <div class="features__item">
            <span>
              {{ $t('about_socketIoMsg') }}
              <a href="https://socket.io/" target="_blank" class="btn btn--info">{{ $t('about_socketIo') }}</a>
            </span>
          </div>
          <div class="features__item">
            <span>
              <a href="https://www.mongodb.com/" target="_blank" class="btn btn--info">{{ $t('about_mongoDB') }}</a>
              {{ $t('about_and') }}
              <a href="https://www.mongodb.com/cloud/atlas" target="_blank" class="btn btn--coral">
                {{ $t('about_mongoDBAtlas') }}
              </a>
              {{ $t('about_mongoAtlasMsg') }}
            </span>
          </div>
          <div class="features__item">
            <span>
              {{ $t('about_loggingMsg') }}
              <a href="https://github.com/winstonjs/winston/#readme" target="_blank" class="btn btn--info">
                {{ $t('about_winston') }}
              </a>
              {{ $t('about_and') }}
              <a href="https://github.com/expressjs/morgan#readme" target="_blank" class="btn btn--coral">
                {{ $t('about_morgan') }}
              </a>
            </span>
          </div>
          <div class="features__item">
            <span>
              <a href="https://github.com/kimmobrunfeldt/concurrently#readme" target="_blank" class="btn btn--danger">
                {{ $t('about_concurrently') }}
              </a>
              {{ $t('about_concurrentlyMsg') }}
            </span>
          </div>
          <div class="features__item">
            <span>
              <a href="https://github.com/kimmobrunfeldt/concurrently#readme" target="_blank" class="btn btn--danger">
                {{ $t('about_crossEnv') }}
              </a>
              {{ $t('about_crossEnvMsg') }}
            </span>
          </div>
          <div class="features__item">
            <span>
              <a href="https://vuejs.org/" target="_blank" class="btn btn--success">{{ $t('about_vuejs') }}</a>
              {{ $t('about_vuejsMsg') }}
            </span>
          </div>
          <div class="features__item">
            <span>
              <a href="https://mattboldt.com/demos/typed-js/" target="_blank" class="btn btn--success">
                {{ $t('about_vueTypedjs') }}
              </a>
              {{ $t('about_vueTypedjsMsg') }}
            </span>
          </div>
          <div class="features__item">
            <span>
              <a href="https://mattboldt.com/demos/typed-js/" target="_blank" class="btn btn--success">
                {{ $t('about_vueI18n') }}
              </a>
              {{ $t('about_vueI18nMsg') }}
            </span>
          </div>
          <div class="features__item">
            <span>
              <a href="https://travis-ci.org/" target="_blank" class="btn btn--info">
                {{ $t('about_travisCI') }}
              </a>
              {{ $t('about_travisCIMsg') }}
            </span>
          </div>
          <div class="features__item">
            <span>
              <a href="https://www.heroku.com/" target="_blank" class="btn btn--purple">
                {{ $t('about_heroku') }}
              </a>
              {{ $t('about_herokuMsg') }}
            </span>
          </div>
        </div>
        <div class="features__item">
          <span>
            <a href="https://icons8.com/" target="_blank" class="btn btn--info">
              {{ $t('about_icons8') }}
            </a>
            {{ $t('about_icons8Msg') }}
          </span>
        </div>
        <div class="features__item">
          <span>
            <a href="https://github.com/vikkio88/vue-flag-icon#readme" target="_blank" class="btn btn--info">
              {{ $t('about_vueFlagIcon') }}
            </a>
            {{ $t('about_vueFlagIconMsg') }}
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /client
export default {
  name: 'About',
  props: [],
  components: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/feature.scss';
</style>
