module.exports = {
  plugins: [
    require('postcss-nested'),
    require('postcss-cssnext')({
      browsers: ['> 5%'],
      features: {
        customProperties: {
          variables: {
            brandPrimary: '#0072ad',
          },
        },
      }
    }),
  ]
};