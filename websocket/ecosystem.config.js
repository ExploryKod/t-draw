// PM2 ecosystem file for WebSocket server
// Install PM2: npm install -g pm2
// Start: pm2 start ecosystem.config.js
// Save: pm2 save
// Enable startup: pm2 startup

module.exports = {
  apps: [{
    name: 't-draw-websocket',
    script: './websocket/index.js',
    cwd: '/path/to/t-draw', // Update this path
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      WS_PORT: 8001
    },
    error_file: './storage/logs/websocket-error.log',
    out_file: './storage/logs/websocket-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
}

