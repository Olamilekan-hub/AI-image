import { useState } from "react";

const ContactForm = () => {
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    message: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
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
      console.log(error);
      setStatus(`${error}: An error occurred. Please try again.`);
    }
  };

  return (
    <div id="contact" className="py-12 bg-gray-900 items-center">
      <h2 className="text-7xl font-bold mb-2 text-gray-200 text-center">       
        Contact Us
      </h2> 
      <hr className="border-1 border-gray-700 mb-6" />

      <div className="flex flex-col lg:flex-row justify-between items-center px-8">
       {/* Contact Image */}
          <div className="order-2 lg:order-0 w-[95%] lg:w-[45%] lg:ml-8 flex justify-center items-center">
            <img src="/images/contact-img.svg" className="w-[98%] hover:w-full transition duration-700 ease-out-out" alt="contact_svg" />
          </div>

          {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="w-[40%] mx-auto p-6 bg-gray-100 shadow-md shadow-gray-400 rounded-2xl"
        >
          {status && <p className="text-sm text-green-600">{status}</p>}

          {/* name */}
          <div className="mb-5">
            <label htmlFor="name" className="block text-2xl font-medium text-gray-900 mb-2 ">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name..."
              className="text-gray-900 w-full border border-gray-700 p-2 rounded-full placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-900 shadow-sm shadow-gray-500 "
              required
            />
          </div>

          {/* username */}
          <div className="mb-5">
            <label htmlFor="username" className="block text-xl font-medium text-gray-900 mb-2 ">
              Email or Telegram/Twitter(X) Username
            </label>
            <input
              type="name"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username (eg. @username) or email..."
              className="text-gray-900 w-full border border-gray-700 p-2 rounded-full placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-900 shadow-sm shadow-gray-500 "
              required
            />
          </div>

          {/* message */}
          <div className="mb-4">
            <label htmlFor="message" className="block text-2xl font-medium text-gray-900 mb-2 ">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message..."
              className="text-gray-900 w-full border border-gray-700 p-2 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-900 shadow-sm shadow-gray-500 "
              rows="5"
              required
            />
          </div>

          {/* submit */}
          <button
            type="submit"
            className="bg-blue-500 text-gray-900 py-2 px-4 rounded-full transition duration-700 ease-in-out"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
