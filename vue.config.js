module.exports = {
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/styles/variables.scss`
        data: `@import "@/styles/variables.scss";`
      }
    }
  }
}