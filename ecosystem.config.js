module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'yarn',
      args: 'start',
      cwd: './',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
    {
      name: 'backend',
      script: 'yarn',
      args: 'start',
      cwd: './',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
        DATABASE_URL: 'postgresql://saude_user:Saude123!@localhost:5432/saude_conectada',
        REDIS_URL: 'redis://localhost:6379',
      },
    },
  ],
}; 