const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  pages: {
    index: {
      entry:'src/main.js',
      title: process.env.VUE_APP_TITLE,
    }
  }
})
