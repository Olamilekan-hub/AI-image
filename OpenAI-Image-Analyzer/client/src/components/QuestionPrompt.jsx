import SurpriseButton from "./SurpriseButton";

const QuestionPrompt = ({ surprise, response, loading, upLoading }) => (
  <div className="flex gap-2 flex-col">
    <p className="text-white text-left">
      What do you want to know about the image?
    </p>
    <div className="text-center">
      <SurpriseButton
        surprise={surprise}
        response={response}
        loading={loading}
        upLoading={upLoading}
      />
    </div>
  </div>
);

export default QuestionPrompt;
