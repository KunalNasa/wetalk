const Status: Record<string, number> = {
    "OK": 200,             // Successful request
    "CREATED": 201,        // Resource successfully created
    "BAD_REQUEST": 400,    // Invalid request from client
    "UNAUTHORIZED": 401,   // Client must authenticate
    "NOT_FOUND": 404,      // Resource not found
    "INTERNAL_SERVER_ERROR": 500, // Server error
  };
  
  export default Status;

