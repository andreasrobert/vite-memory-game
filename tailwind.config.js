module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html','./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors:{
      transparent:'transparent',
      orange: '#FDA214',
      lgrey:'#BCCED9',
      gdblue:'#304859',
      dblue:'#152938',
      grey:'#F2F2F2',
      gblue:'#7191A5',
      blue:'#6395B8',
      white:'#FCFCFC',

      green:'green',
      red:'red'

    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
