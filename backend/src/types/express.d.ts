import { Request as ExpressRequest } from 'express';

/*
 * Declaration Merging:
 * This code block uses TypeScript's declaration merging feature to extend
 * the existing Express 'Request' interface.
 *
 * The 'declare module' syntax allows us to add new members to an existing type
 * without modifying its original declaration. This is particularly useful
 * when working with third-party libraries like Express.
 */
declare module 'express' {
  /*
   * Interface Extension:
   * Here, we're extending the Express 'Request' interface to ensure
   * that the 'ip' property is always defined as a string.
   *
   * 1. 'interface Request extends ExpressRequest':
   *    This line creates a new interface named 'Request' that extends
   *    the original Express Request interface (aliased as ExpressRequest).
   *
   * 2. 'ip: string & ExpressRequest['ip']':
   *    This line redefines the 'ip' property with an intersection type.
   *    - 'string' ensures that 'ip' is always a string.
   *    - 'ExpressRequest['ip']' preserves any additional type information
   *      that the original Express definition might have included.
   *
   * The '&' operator creates an intersection type, which combines multiple types
   * into one. This ensures that 'ip' has all the properties of both types.
   */
  interface Request extends ExpressRequest {
    ip: string & ExpressRequest['ip'];
  }
}
