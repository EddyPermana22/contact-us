import { PrismaClient } from '@prisma/client';

/**
 * PrismaInstance Class
 *
 * This class implements the Singleton pattern for the PrismaClient.
 * It ensures that only one instance of PrismaClient is created and used throughout the application.
 */
class PrismaInstance {
  // Private static field to hold the single instance of PrismaClient
  private static instance: PrismaClient;

  /**
   * Private constructor to prevent direct construction calls with the `new` operator.
   * This enforces the use of the getInstance() method to get the singleton instance.
   */
  private constructor() {}

  /**
   * Static method to get the singleton instance of PrismaClient
   *
   * If an instance doesn't exist, it creates one.
   * If an instance already exists, it returns the existing instance.
   *
   * @returns The singleton instance of PrismaClient
   */
  public static getInstance(): PrismaClient {
    if (!PrismaInstance.instance) {
      // Create a new PrismaClient instance if one doesn't exist
      PrismaInstance.instance = new PrismaClient();
    }
    // Return the existing (or newly created) instance
    return PrismaInstance.instance;
  }
}

// Create and export the singleton instance
const prisma = PrismaInstance.getInstance();
export { prisma };
