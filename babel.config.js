/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-16 09:47:50
 * @Description: file content
 */
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'import',
      {
        libraryName: '@ant-design/react-native',
      },
    ],
    [
      'babel-plugin-root-import',
      {
        rootPathPrefix: '#',
        rootPathSuffix: 'src',
      },
    ],
  ],
};
