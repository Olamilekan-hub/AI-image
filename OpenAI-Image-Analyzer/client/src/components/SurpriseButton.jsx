import Button from "./Button1";

const SurpriseButton = ({ surprise, response, loading, upLoading }) => {
  return (
    <Button
      id="surprise"
      onClick={surprise}
      className="w-1/2"
      disabled={response || loading || upLoading}
    >
      Prompt Suggestion
    </Button>
  );
};

export default SurpriseButton;
