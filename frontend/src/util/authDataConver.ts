import toast from "react-hot-toast";
import { AuthData } from "../models/AuthData";

// Utility function to save data to localStorage
export function saveToLocalStorage(data: AuthData): void {
  try {
    localStorage.setItem("mypos_auth", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving data to localStorage", error);
  }
}

// Utility function to retrieve data from localStorage
export function getFromLocalStorage(): AuthData | null {
  try {
    const data = localStorage.getItem("mypos_auth");
    return data ? (JSON.parse(data) as AuthData) : null;
  } catch (error) {
    console.log(error);
    toast.error("Login Expireed Please Login Again");
    return null;
  }
}
