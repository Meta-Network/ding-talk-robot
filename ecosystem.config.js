module.exports = {
  apps: [
    {
      name: 'DingTalkRobot',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: 'dist/main.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
