// Standardizing the error message.
// Error is predefined class in JS.
class ApiError extends Error {
  // Values are required in constructor - Dena hi padegi values
  constructor(statusCode, message = "Something went wrong", errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;
  }
}
export { ApiError };

// Similarly right Response class by itself. Node doesnt provide any class for responses.
