module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          src: './src',
        },
      },
    ],
    ['module:react-native-dotenv'],
    'react-native-reanimated/plugin', // 여기에 추가
  ],
};
