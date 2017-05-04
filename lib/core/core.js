export const env = (name) => {
  if (!process.env[name]) {
    throw `Missing environment variable. name=${name}`;
  }

  return process.env[name];
};