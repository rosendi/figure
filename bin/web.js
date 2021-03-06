'use strict';

const http = require('http');
const os = require('os');
const throng = require('throng');

function start(id) {
  // Setup

  require('../dist/server/app/server/config/objection');

  const server = require('../dist/server/app/server/server');

  // Start

  const httpServer = http.createServer(server.app);
  const PORT = process.env.PORT || 7070;

  httpServer.listen(PORT, () => {
    console.log(`Server ${id} is listening on: http://0.0.0.0:${PORT}`);
  });
}

// Clustering

const WORKERS = process.env.NODE_ENV === 'production' ? process.env.WEB_CONCURRENCY || os.cpus().length : 1;

throng({ start, workers: WORKERS, lifetime: Infinity });
