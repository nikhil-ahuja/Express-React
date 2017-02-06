var config = {
  development: {
    server: {
      port: 3000
    },
    "log": {
      "level": "debug"
    },
    database: {
      url: 'mongodb://localhost/generator_dev'
    }
  },
  testing: {
    server: {
      port: 3001
    },
    "log": {
      "level": "info"
    },
    database: {
      url: 'mongodb://localhost/generator_test'
    }
  },
  production: {
    server: {
      port: 8080
    },
    "log": {
      "level": "error"
    },
    database: {
      url: 'mongodb://localhost/generator'
    }
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
