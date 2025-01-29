import { useState, useEffect } from "react";

const useCurrentDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Get the user's locale
      const userLocale = navigator.language || "en-US"; // Fallback to "en-US" if unavailable

      // Format the date
      const date = now.toLocaleDateString(userLocale, {
//         weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });

      // Format the time
      const time = now.toLocaleTimeString(userLocale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setCurrentDateTime(`${date} ${time}`);
    };

    // Update the date and time every second
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    // Clean up the interval
    return () => clearInterval(interval);
  }, []);

  return currentDateTime;
};

export default useCurrentDateTime;
