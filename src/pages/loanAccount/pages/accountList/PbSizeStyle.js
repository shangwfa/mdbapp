import {Dimensions, Platform} from 'react-native';
export const {width, height} = Dimensions.get('window');
const defaultPixel = 1; //iphone6的像素密度
//px转换成dp
const w2 = 750 / defaultPixel;
const h2 = 1334 / defaultPixel;
const scale = Math.min(height / h2, width / w2); //获取缩放比例
export const widthHeight = width / height; //获取缩放比例
/**
 * 设置text为sp
 * @param size sp
 * return number dp
 */
export function setSpText(size) {
  // size = Math.round((size * scale + 0.5) * pixelRatio / fontScale);
  size = Math.round(size * scale + 6);
  return size / defaultPixel;
}
export function scaleSize(size) {
  size = Math.round(size * scale + 0.5);
  return size / defaultPixel;
}
export const homeFontColor = '#666666'; //主页字体颜色
export const iconFontFamily = 'iconfont'; //字体图标
export const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue' : 'PingFang'; //普通字体
export const inputFontFamily =
  Platform.OS === 'ios' ? 'HelveticaNeue' : 'PingFang'; //普通字体
export const fontFamilyBold = 'Helvetica Bold'; //加粗字体
export const homeAccountListTitleTopColor = [
  'rgba(189,200,249,1)',
  'rgba(189,205,249,0.95)',
  'rgba(189,210,249,0.9)',
  'rgba(189,215,249,0.85)',
  'rgba(189,220,249,0.8)',
  'rgba(189,225,249,0.75)',
  'rgba(189,233,243,0.7)',
  'rgba(189,233,243,0.65)',
  'rgba(189,233,243,0.6)',
  'rgba(189,233,243,0.55)',
];
export const transferAmountColor = '#FF9500'; //input颜色
// export const transferPickerTitleColor = '#215AB8';
export const transferPickerTitleColor = '#000000';
export const transferPickerValueColor = '#7E7E7E';
export const homeBackDefaultColor = '#F6F6F6';
export const homeBackONFirstColor = '#E7F0F5';
export const proDefaultBlackColor = '#000000';
export const proDefaultWhiteColor = '#FFFFFF';
export const proOLLabelGrayColor = '#878787';
export const proOLinputGrayColor = '#C7C5C5';
export const proOLSpaceGrayColor = '#EBE8E8';
export const proComModalGrayBackground = 'rgba(60,63,65,0.7)';
export const proComModalButtonBackground = '#093393';
export const proOLSelectButtonBackground = '#25B3EE';
export const proOLErrorTextColor = '#FF0000';
export const proBlueTextColor = '#108AFF';
export const proBlueInputBackground = '#F5F9FC';
export const loanTextColor = '#DE6C51';

export const fontSizeXXXXS = setSpText(8);
export const fontSize10 = setSpText(10);
export const fontSizeXXXS = setSpText(11); //added By MaiBH
export const fontSizeXXS = setSpText(12); //字号
export const fontSizeXS = setSpText(14);
export const fontSizeS = setSpText(16);
export const fontSizeM = setSpText(18);
export const fontSizeX = setSpText(20);
export const fontSizeXL = setSpText(22);
export const fontSize24 = setSpText(24);
export const fontSize30 = setSpText(30);
export const fontSizeXLL = setSpText(34);
export const fontSizeX40 = setSpText(40);
export const fontSizeXXL = setSpText(50);
export const fontSizeXXXL = setSpText(60);
export const fontSize80 = setSpText(70);
export const iconSizeXSSS = width * 0.03;
export const iconSizeXSShalf = width * 0.02; //图标大小
export const iconSizeXSS = width * 0.04; //图标大小
export const iconSizeXS = width * 0.05; //图标大小
export const iconSizeS = width * 0.07; /* //setSpText(30);*/
export const iconSizeSM = width * 0.08;
export const iconSizeM = width * 0.1;
export const iconSizeX = width * 0.2;
export const iconSizeXL = width * 0.3;
export const bodyPaddingSide = 30; //页边距
export const bodyPaddingTop = 20;
export const textPaddingSide = 5; //文本框边距
export const textPaddingTop = 3;

export const listHeight = setSpText(110); //listItem Height
export const listHeightIn = setSpText(75); //listItem listHeightIn
export const listHeightLimit = setSpText(65); //listItem listHeightIn
export const listHeightOLTwo = setSpText(55); //listItem listHeightIn
export const size1 = setSpText(1);
export const size2 = setSpText(2);
export const size3 = setSpText(3);
export const size4 = setSpText(4);
export const size5 = setSpText(5);
export const size6 = setSpText(6);
export const size8 = setSpText(8);
export const size10 = setSpText(10);
export const size12 = setSpText(12);
export const size15 = setSpText(15);
export const size18 = setSpText(18);
export const size20 = setSpText(20);
export const size25 = setSpText(25);
export const size30 = setSpText(30);
export const size32 = setSpText(32);
export const size35 = setSpText(35);
export const size38 = setSpText(38);
export const size40 = setSpText(40);
export const size45 = setSpText(45);
export const size55 = setSpText(55);
export const size60 = setSpText(60);
export const size75 = setSpText(75);
export const size80 = setSpText(80);
export const size83 = setSpText(83);
export const size90 = setSpText(90);
export const size300 = setSpText(300);
export const size100 = setSpText(100);
export const size110 = setSpText(110);
export const size120 = setSpText(120);
export const size125 = setSpText(125);
export const size135 = setSpText(135);
export const size150 = setSpText(150);
export const size160 = setSpText(160);
export const size180 = setSpText(180);
export const size200 = setSpText(200);
export const size220 = setSpText(220);
export const size270 = setSpText(270);
export const size320 = setSpText(320);
export const size340 = setSpText(340);
export const size360 = setSpText(360);
export const size380 = setSpText(380);
export const size400 = setSpText(400);
export const size500 = setSpText(500);
export const size70 = setSpText(70);
