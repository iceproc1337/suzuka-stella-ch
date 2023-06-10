let { defineStore } = Pinia;

export const useI18nStore = defineStore('i18n', {
  state: () => ({
    currentLang: null,
    i18nMap: {}
  }),
  actions: {
    async setLang(lang) {
      console.info("setLang=", lang);
      if (!this.isLangLoaded(lang)) {
        let messages = (await import(`@/assets/i18n/${lang}.js`)).default;
        console.debug("messages loaded=", messages)
        let i18n = VueI18n.createI18n({
          locale: lang, // set locale
          messages, // set locale messages
        })

        this.addI18n(lang, i18n);
        this.currentLang = lang
      } else {
        console.info(`lang ${lang} is already loaded`);
      }
    },
    isLangLoaded(lang) {
      return typeof this.i18nMap[lang] !== "undefined"
    },
    addI18n(lang, i18n) {
      this.i18nMap[lang] = i18n
    }
  },
  getters: {
    currentI18n: (state) => state.i18nMap[state.currentLang],
    t: (state) => state.currentI18n ? state.currentI18n.global.t : () => { },
  }
})
