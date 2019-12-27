export default {
  input: './dist/index.js',
  output: [
    {
      format: 'umd',
      indent: '\t',
      name: 'Laconic',
      file: './build/laconic.js'
    },
    {
      format: 'umd',
      indent: '\t',
      name: 'Laconic',
      file: './samples/laconic.js'
    }
  ],
  watch: {
    include: './dist/**/*',
  },
};
