import toast from "react-hot-toast";
export const extractErrorMessage = (error: unknown) => {
  console.log("Raw Error:", error); // Debugging

  let errorMessage = "Request Failed"; // Default message

  if (
    error &&
    typeof error === "object" &&
    "data" in error &&
    error.data &&
    typeof error.data === "object"
  ) {
    const data = error.data as { [key: string]: unknown };
    const firstKey = Object.keys(error.data)[0]; // Get the first key dynamically
    if (firstKey) {
      const value = data[firstKey];

      if (Array.isArray(value)) {
        // ✅ If it's an array, join all messages into one string
        errorMessage = value.join(", ");
      } else if (typeof value === "string") {
        // ✅ If it's a string, use it directly
        errorMessage = value;
      }
    }
  }

  toast.error(errorMessage);
};
