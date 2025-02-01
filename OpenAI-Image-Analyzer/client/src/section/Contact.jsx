import Button from "../components/Button";
import { useState } from "react";
import { FaPaperPlane, FaSpinner, FaCheck } from "react-icons/fa";
// import useCurrentDateTime from "../utils/useDateTimeDisplay";
import stars from "/images/stars.png";
import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const Contact = () => {
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
  const [buttonState, setButtonState] = useState("initial");

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
          Sending message...
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
          Send message
          <FaPaperPlane className="mr-2" />
        </>
      );
    }
  };

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 1],
    [-300, 300]
  );

  return (
    <section id="contact" className="py-20 md:py-24"
          ref={sectionRef}>
      <div className="px-5 lg:px-12 xl:px-28 2xl:px-42">
        <motion.div
          className="border border-white/15 py-14  overflow-hidden rounded-xl relative animate-background"
          style={{
            backgroundImage: `url(${stars})`,
            backgroundPositionY,
          }}
        >
          <div
            className="absolute inset-0 bggr4 bg-blend-overlay"
            style={{
              maskImage:
                "radial-gradient(80% 90% at 100% 100%, black, transparent)",
              backgroundImage: "url('/images/grid-lines.png')",
            }}
          ></div>

          <div className="relative flex flex-col md:flex-row">
            <div className="px-5 mb-5 flex-1">
              <h1 className="text-4xl font-semibold tracking-tighter mb-3 md:text-5xl lg:text6xl">
                Contact us.
              </h1>
              <p className="text-md tracking-tight lg:text-lg">
                Have questions or need support? Contact our dedicated team today
                for personalized assistance and expert advice. We’re here to
                help you succeed.
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="flex-1">
              <div className="px-4">
                <div className="border border-white/30 rounded-lg p-5 bg-black/30">
                  {/* Name */}
                  <label
                    htmlFor="name"
                    className="block text-sm text-white/50 mb-2 "
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
                    className="w-full border border-white/45 p-2 rounded-lg focus:outline-none focus:ring-1 focus:shadow-md shadow-white"
                    required
                  />

                  {/* Username */}
                  <label
                    htmlFor="username"
                    className="block text-sm text-white/50 my-2 "
                  >
                    Email or Telegram/Twiter Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username (@username) or email..."
                    className="w-full border border-white/45 p-2 rounded-lg focus:outline-none focus:ring-1 focus:shadow-md shadow-white"
                    required
                  />

                  {/* Message */}
                  <label
                    htmlFor="username"
                    className="block text-sm text-white/50 my-2 "
                  >
                    Message
                  </label>
                  <textarea
                    type="text"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message..."
                    className="w-full border border-white/45 p-2 rounded-lg focus:outline-none focus:ring-1 focus:shadow-md shadow-white"
                    rows="4"
                    required
                  />
                  {status && <p className="text-center">{status}</p>}

                  <div className="flex justify-center mt-5">
                    <Button type="submit" className="">
                      {renderButtonContent()}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default Contact;
