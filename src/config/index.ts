import local from './config.local';
import prod from './config.prod';

const configs = {
  development: local,
  production: prod,
};
const env = process.env.NODE_ENV || 'development';

export default () => configs[env];
