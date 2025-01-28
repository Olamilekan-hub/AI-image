import { useState } from "react";

const ContactForm = () => {

  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    message: "",
  });

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
        setFormData({ name: "", username: "", message: "" }); // Reset the form
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      console.log(error)
      setStatus(`${error}: An error occurred. Please try again.`);
    }
  };

  return (
    <div id="contact" className="flex flex-col md:flex-row justify-around items-center p-8 bg-gray-900">
      <div>
        <img src="/images/contact-img.svg" alt="contact_svg" />
      </div>
    <form
      onSubmit={handleSubmit}
      className="max-w- mx-auto p-4 bg-gray-900 shadow-md rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      {status && <p className="text-sm text-green-600">{status}</p>}

      {/* name */}
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

      {/* username */}
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium">
          Email or Telegram/Twitter(X) Username
        </label>
        <input
          type="name"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>

      {/* message */}
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

      {/* submit */}
      <button
        type="submit"
        className="bg-blue-500 text-gray-900 py-2 px-4 rounded"
      >
        Send
      </button>
    </form>
    </div>
  );
};

export default ContactForm;
