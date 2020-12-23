//全局色值
const color = {
  brandColor: 'white',
};
//全局字体大小
const fontSize = {};
//全局样式
const styles = {};
// G(全局样式)->pages（页面样式）->components（页面组件样式）
// G（全局样式）->components（基础组件和业务组件样式）
export default {
  color,
  fontSize,
  ...styles,
};
