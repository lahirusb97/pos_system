import { AxiosError } from "axios";

export const extractErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError && error.response?.data) {
    const errorData = error.response.data;

    console.log("Full error data:", errorData); // Debugging log

    return Object.entries(errorData) // Get both keys and values
      .map(([field, messages]) => {
        // Ensure messages are formatted correctly
        const messageString = Array.isArray(messages)
          ? messages.join(", ")
          : messages;
        return `${field}: ${messageString}`; // Format with field name
      })
      .join(" | "); // Separate errors with a pipe
  }

  return "An unexpected error occurred";
};
