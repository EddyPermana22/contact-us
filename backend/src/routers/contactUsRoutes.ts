import { Router } from 'express';
import { ContactUsSubmissionRepository } from '../repositories/ContactUsSubmissionRepository';
import { ContactUsSubmissionService } from '../services/ContactUsSubmissionService';
import { ContactUsSubmissionController } from '../controllers/ContactUsSubmissionController';
import { prisma } from '../libs/prisma';

/*
 * Router Creation:
 * Initialize a new Express Router instance for handling contact form submission routes.
 */
const contactSubmissionRouter = Router();

/*
 * Dependency Injection Setup:
 * This section demonstrates the use of dependency injection to create a chain of
 * dependencies from the data layer up to the controller.
 */

/*
 * Repository Instantiation:
 * Create an instance of ContactUsSubmissionRepository, injecting the Prisma client.
 * The repository is responsible for database operations related to contact submissions.
 */
const repository = new ContactUsSubmissionRepository(prisma);

/*
 * Service Instantiation:
 * Create an instance of ContactUsSubmissionService, injecting the repository.
 * The service handles business logic and acts as an intermediary between the controller and repository.
 */
const service = new ContactUsSubmissionService(repository);

/*
 * Controller Instantiation:
 * Create an instance of ContactUsSubmissionController, injecting the service.
 * The controller is responsible for handling HTTP requests and responses.
 */
const controller = new ContactUsSubmissionController(service);

/*
 * Route Definition:
 * Define a POST route for creating new contact submissions.
 * When a POST request is made to the root path of this router:
 * 1. The request is received
 * 2. It's passed to the controller's create method
 * 3. The controller handles the request, interacts with the service, and sends a response
 *
 * The `next` function is passed to allow error handling middleware to catch any errors.
 */
contactSubmissionRouter.post('/', (req, res, next) => controller.create(req, res, next));

/*
 * Router Export:
 * Export the configured router to be used in the main application setup.
 */
export { contactSubmissionRouter };
