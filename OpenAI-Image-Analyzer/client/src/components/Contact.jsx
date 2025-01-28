import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://ai-image-production.up.railway.app/send-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset the form
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      setStatus("An error occurred. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-gray-900 shadow-md rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      {status && <p className="text-sm text-green-600">{status}</p>}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          rows="5"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-gray-900 py-2 px-4 rounded"
      >
        Send
      </button>
    </form>
  );
};

export default ContactForm;
