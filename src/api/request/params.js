export default async (config) => {
  return {
    ...config.params,
    withCredentials: true,
  };
};
