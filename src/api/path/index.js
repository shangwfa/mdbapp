import user from './user';
import remoteAccount from './remoteAccount';
import secSetting from './secSetting'
export default {
  ...user,
  ...remoteAccount,
  ...secSetting,
};
