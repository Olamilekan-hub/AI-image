import SurpriseButton from "./SurpriseButton";

const QuestionPrompt = ({ surprise, response, loading }) => (
  <p className="text-gray-600 text-left flex gap-2">
    What do you want to know about the image?
    <SurpriseButton surprise={surprise} response={response} loading={loading} />
  </p>
);

export default QuestionPrompt;
