import { useState } from "react";
import { FaPaperPlane, FaSpinner, FaCheck } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ContactForm = () => {
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    message: "",
  });
  const [buttonState, setButtonState] = useState("initial");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonState("loading");

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
        setTimeout(() => setStatus(""), 5000);

        setFormData({ name: "", username: "", message: "" }); // Reset the form
        setButtonState("sent");

        // Reset the button state after 5 seconds
        setTimeout(() => setButtonState("initial"), 5000);
      } else {
        setStatus("Failed to send message.");
        setButtonState("initial");
      }
    } catch (error) {
      console.log(error);
      setStatus(`${error}: An error occurred. Please try again.`);
      setButtonState("initial");
    }
  };

  // Render button content dynamically based on the buttonState
  const renderButtonContent = () => {
    if (buttonState === "loading") {
      return (
        <>
          Sending...
          <FaSpinner className="animate-spin mr-2" />
        </>
      );
    } else if (buttonState === "sent") {
      return (
        <>
          Sent
          <FaCheck className="mr-2" />
        </>
      );
    } else {
      return (
        <>
          Send
          <FaPaperPlane className="mr-2" />
        </>
      );
    }
  };

  return (
    <div id="contact" className="py-12 bg-gray-900 items-center">
      <h2 className="font-bold mb-2 text-gray-200 text-center cf  lg:text-7xl  md:text-6xl  text-5xl">
        Contact Us
      </h2>
      <hr className="border-1 border-gray-700 mb-6" />

      <div className="flex flex-col lg:flex-row justify-between items-center px-8 gap-10 lg:gap-0">
        {/* Contact Image */}
        <div className="order-2 lg:order-0 w-[95%] lg:w-[45%] lg:ml-8 flex justify-center items-center">
          <img
            src="/images/contact-img.svg"
            className="w-[98%] hover:w-full transition duration-700 ease-out-out"
            alt="contact_svg"
          />
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:w-[40%] w-full lg:mx-auto p-6 bg-gray-100 shadow-md shadow-gray-400 rounded-2xl"
        >
          {status && <p className="text-md text-green-600">{status}</p>}

          {/* name */}
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-2xl font-medium text-gray-900 mb-2 "
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name..."
              className="text-gray-900 w-full border border-gray-700 py-2 px-4 rounded-full placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-900 shadow-sm shadow-gray-500 "
              required
            />
          </div>

          {/* username */}
          <div className="mb-5">
            <label
              htmlFor="username"
              className="flex text-xl font-medium text-gray-900 mb-2 items-center"
            >
              Email or Telegram/Twitter({<FaXTwitter />}) Username
            </label>
            <input
              type="name"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username (eg. @username) or email..."
              className="text-gray-900 w-full border border-gray-700 py-2 px-4 rounded-full placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-900 shadow-sm shadow-gray-500 "
              required
            />
          </div>

          {/* message */}
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-2xl font-medium text-gray-900 mb-2 "
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message..."
              className="text-gray-900 w-full border border-gray-700 py-2 px-4 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-900 shadow-sm shadow-gray-500 "
              rows="4"
              required
            />
          </div>

          {/* submit */}
          <button
            type="submit"
            className="bg-gray-500 font-semibold text-gray-900 py-1 px-6 rounded-2xl transition duration-700 ease-in-out hover:bg-gray-700 hover:text-gray-100 text-lg hover:text-xl flex items-center justify-center gap-2 hover:py-2 mb-4 mt-2"
          >
            {renderButtonContent()}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
