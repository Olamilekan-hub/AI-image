
const SurpriseButton = ({ surprise, response, loading }) => {
  return (
    <button
      id="surprise"
      onClick={surprise}
      className="bg-gray-200 text-black px-3 py- rounded-lg font-semibold hover:bg-gray-400 hover:text-gray-800"
      disabled={response || loading}
    >
      Surprise me
    </button>
  );
};

export default SurpriseButton;
