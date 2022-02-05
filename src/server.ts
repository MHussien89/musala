import App from './app';
import IndexRoute from './routes/index.route';
import GatewayRoute from './routes/gateway.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App(
  [
    new IndexRoute(),
    new GatewayRoute()
  ]
);

app.listen();
