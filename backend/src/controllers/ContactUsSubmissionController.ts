import { Request, Response, NextFunction } from 'express';
import { ContactUsSubmissionService } from '../services/ContactUsSubmissionService';

/**
 * ContactUsSubmissionController
 *
 * This controller handles HTTP requests related to contact form submissions.
 * It acts as an intermediary between the Express routes and the ContactUsSubmissionService.
 */
export class ContactUsSubmissionController {
  private service: ContactUsSubmissionService;

  /**
   * Constructor for ContactUsSubmissionController
   *
   * @param service An instance of ContactUsSubmissionService
   *
   * The service is injected, allowing for easier testing and decoupling from the service implementation.
   */
  constructor(service: ContactUsSubmissionService) {
    this.service = service;
  }

  /**
   * Handles the creation of a new contact form submission
   *
   * @param req Express Request object
   * @param res Express Response object
   * @param next Express NextFunction for error handling
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Extract submission data from the request body
      const { name, email, subject, message } = req.body;

      // Call the service method to create the submission
      const submission = await this.service.createSubmission({
        name,
        email,
        subject,
        message,
        ipAddress: req.ip, // Capture the client's IP address
        userAgent: req.get('User-Agent') || '', // Capture the client's User-Agent
      });

      // Send a successful response
      res.status(201).json({
        message: 'Submission created successfully',
        submission: {
          id: submission.id,
          name: submission.name,
          email: submission.email,
          subject: submission.subject,
          message: submission.message,
          submissionTime: submission.createdAt,
        },
      });
    } catch (error) {
      // Pass any errors to the error handling middleware
      next(error);
    }
  }
}
