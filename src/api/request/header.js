const isPost = (config) => config.method === 'POST';
export default async (config) => {
  return isPost(config)
    ? {
        ...config,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      }
    : config;
};
