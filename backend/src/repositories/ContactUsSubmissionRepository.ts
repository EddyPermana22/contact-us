import { PrismaClient, ContactUsSubmission, Prisma } from '@prisma/client';

/**
 * Repository class for Contact Us Submissions
 *
 * This class encapsulates all database operations related to contact form submissions.
 * It uses Prisma ORM to interact with the database.
 */
export class ContactUsSubmissionRepository {
  private prisma: PrismaClient;

  /**
   * Constructor for ContactUsSubmissionRepository
   *
   * @param prisma - An instance of PrismaClient
   *
   * The Prisma client is injected into the repository, allowing for
   * dependency injection and easier testing.
   */
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Creates a new contact form submission in the database
   *
   * @param data - The data for creating a new submission
   * @returns A promise that resolves to the created ContactUsSubmission
   *
   * This method uses Prisma's create operation to insert a new record
   * into the database.
   */
  async create(data: Prisma.ContactUsSubmissionCreateInput): Promise<ContactUsSubmission> {
    return this.prisma.contactUsSubmission.create({ data });
  }
}
