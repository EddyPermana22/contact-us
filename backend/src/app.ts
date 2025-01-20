import express from 'express';
import cors from 'cors';
import { mainRouter } from './routers/mainRouter';
import { errorHandler } from './middlewares/errorHandler';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();

app.set('trust proxy', true);

/*
 * Middleware Setup:
 * 1. helmet(): Enhances application security by setting various HTTP headers.
 *    It helps protect against common web vulnerabilities.
 *
 * 2. cors(): Enables Cross-Origin Resource Sharing.
 *    This allows the server to specify which origins can access its resources,
 *    which is crucial for web applications serving content to different domains.
 */
app.use(helmet());
app.use(cors());

/**
 * Rate limiting middleware configuration
 * Limits each IP to 15 requests per 15-minute window
 *
 * This helps prevent abuse and potential DoS attacks by limiting
 * the number of requests a single IP can make in a given time frame.
 */
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15, // limit each IP to 15 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
      return req.ip;
    },
  }),
);

/*
 * Body Parsing Middleware:
 * 1. express.json(): Parses incoming requests with JSON payloads.
 *    It allows you to access the parsed data via req.body in your route handlers.
 *
 * 2. express.urlencoded(): Parses incoming requests with URL-encoded payloads.
 *    The 'extended: true' option allows for rich objects and arrays to be encoded into the URL-encoded format,
 *    allowing for a JSON-like experience with URL-encoded.
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router setup: Mounts the main router to handle application routes
app.use(mainRouter);

/*
 * Error Handling Middleware:
 * This should be the last piece of middleware added to the app.
 * It catches any errors that occur during the request-response cycle
 * and handles them appropriately, preventing the app from crashing
 * and providing meaningful error responses to clients.
 */
app.use(errorHandler);

export { app };
