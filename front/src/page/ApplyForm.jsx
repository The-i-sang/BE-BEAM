import React, { useEffect } from "react";

export default function ApplyForm() {
  useEffect(() => {
    // Create script element
    const script = document.createElement("script");
    script.src = "//embed.typeform.com/next/embed.js";
    script.async = true;

    // Append the script to the body
    document.body.appendChild(script);

    // Clean up script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []); // Empty array ensures effect is only run on mount and unmount

  return (
    <div className="w-full h-full">
      <div className="w-full" data-tf-live="01HGXXQCC9Z01SWZMJMQA8807V"></div>
    </div>
  );
}
