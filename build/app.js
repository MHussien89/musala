import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as hpp from 'hpp';
import * as mongoose from 'mongoose';
import * as logger from 'morgan';
import errorMiddleware from './middlewares/error.middleware';
import requestLoggingMiddleware from './logger/request-logging-middleware';
import correlationIdMiddleware from './logger/express-correlation-id-mw';
class App {
    constructor(routes, cronJobs) {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.env = process.env.NODE_ENV === 'production' ? true : false;
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
        this.initializeCronJobs(cronJobs);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 App listening on the port ${this.port}`);
        });
    }
    getServer() {
        return this.app;
    }
    initializeCronJobs(jobs) {
        if (jobs) {
            jobs.forEach((job) => {
                job.job();
            });
        }
    }
    initializeMiddlewares() {
        this.app.use(correlationIdMiddleware);
        this.app.use(requestLoggingMiddleware);
        if (this.env) {
            this.app.use(hpp());
            this.app.use(helmet());
            this.app.use(logger('combined'));
            this.app.use(cors({ origin: 'birdnestlife.com', credentials: true }));
        }
        else {
            this.app.use(logger('dev'));
            this.app.use(cors({ origin: true, credentials: true }));
        }
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }
    initializeRoutes(routes) {
        routes.forEach((route) => {
            this.app.use('/', route.router);
        });
    }
    initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }
    connectToDatabase() {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, MONGO_DATABASE } = process.env;
        const options = {
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            connectTimeoutMS: 10000,
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        };
        mongoose.connect(`mongodb://${MONGO_PATH}/${MONGO_DATABASE}`, options);
        // mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}/${MONGO_DATABASE}?authSource=admin`, { ...options });
    }
}
export default App;
//# sourceMappingURL=app.js.map