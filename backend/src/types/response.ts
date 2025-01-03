// types/apiResponse.ts

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T; // Optional data for successful responses
  }
  
  export interface ErrorResponse {
    success: false;
    message: string;
  }
  
  export interface SuccessResponse<T> {
    success: true;
    message: string;
    data: T;
  }
  