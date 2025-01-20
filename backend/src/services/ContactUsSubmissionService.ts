import { ContactUsSubmission } from '@prisma/client';
import { ContactUsSubmissionRepository } from '../repositories/ContactUsSubmissionRepository';
import { contactUsSubmissionSchema, ContactUsSubmissionInput } from '../schemas/contactUsSubmissionSchema';
import { ZodError } from 'zod';

/**
 * Service class for managing Contact Us form submissions.
 */
export class ContactUsSubmissionService {
  private repository: ContactUsSubmissionRepository;

  /**
   * Creates an instance of ContactUsSubmissionService.
   * @param {ContactUsSubmissionRepository} repository - The repository for Contact Us submissions.
   */
  constructor(repository: ContactUsSubmissionRepository) {
    this.repository = repository;
  }

  /**
   * Creates a new Contact Us form submission.
   * @param {ContactUsSubmissionInput} data - The input data for the submission.
   * @returns {Promise<ContactUsSubmission>} The created submission.
   * @throws {ZodError} If the input data fails validation.
   * @throws {Error} If there's an error during the creation process.
   */
  async createSubmission(data: ContactUsSubmissionInput): Promise<ContactUsSubmission> {
    try {
      /*
       * Data Validation:
       * Use Zod schema to validate the input data.
       * This ensures that the data meets the required format and constraints
       * before attempting to save it to the database.
       */
      console.log('Validating data:', data);
      const validatedData = contactUsSubmissionSchema.parse(data);
      console.log('Data validated successfully');

      /*
       * Data Persistence:
       * After validation, use the repository to create a new submission
       * in the database. This abstracts the database operations from the service.
       */
      const result = await this.repository.create(validatedData);
      console.log('Submission created:', result);
      return result;
    } catch (error) {
      console.error('Error in createSubmission:', error);

      /*
       * Error Handling:
       * Differentiate between validation errors (ZodError) and other types of errors.
       * - For ZodErrors, rethrow to allow specific handling in the controller.
       * - For other errors, throw a generic error with a message.
       *
       * This approach allows for more granular error handling and appropriate
       * responses to different types of errors.
       */
      if (error instanceof ZodError) {
        console.log('ZodError detected in service');
        throw error;
      }
      throw new Error(`Failed to create submission: ${(error as Error).message}`);
    }
  }
}
