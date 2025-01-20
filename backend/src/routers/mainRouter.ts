import { Router } from 'express';

import { contactSubmissionRouter } from './contactUsRoutes';

/*
 * Main Router Creation:
 * Initialize a new Express Router instance to serve as the main router for the application.
 * This router will act as a central point to organize and manage all route modules.
 */
const mainRouter = Router();

/*
 * Route Module Integration:
 * Here, we mount the contactSubmissionRouter as a sub-router on the main router.
 *
 * '/contact-us' is the base path for all routes defined in contactSubmissionRouter.
 * This means that if contactSubmissionRouter has a route '/', it will be accessible at '/contact-us/'.
 *
 * This modular approach allows for:
 * 1. Better organization of routes by feature or domain
 * 2. Easier maintenance and scalability
 * 3. Cleaner, more readable main application file
 */
mainRouter.use('/contact-us', contactSubmissionRouter);

/*
 * Router Export:
 * Export the configured main router to be used in the main application setup.
 * This allows the main app file to simply import and use this router,
 * keeping the main file clean and the routing logic encapsulated.
 */
export { mainRouter };
