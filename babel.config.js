module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'nativewind/babel',
    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        root: ['.'],
        alias: {
          '@/api': './src/api',
          '@assets': './src/assets',
          '@constants': './src/constants/index.ts',
          '@hooks': './src/hooks',
          '@context': './src/context',
          '@components': './src/components',
          '@features': './src/features',
          '@redux': './src/redux',
          '@navigation': './src/navigation',
          '@lib': './src/lib',
          '@utils': './src/utils',
          '@/types': './src/types',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
