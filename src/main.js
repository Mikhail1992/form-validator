const app = require('./app');
const form = require('./components/form');

const bootstrap = function () {
  app(form()).init();
};

bootstrap();
