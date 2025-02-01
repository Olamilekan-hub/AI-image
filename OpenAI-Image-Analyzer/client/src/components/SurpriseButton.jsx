import Button from "./Button1";

const SurpriseButton = ({ surprise, response, loading }) => {
  return (
    <Button
      id="surprise"
      onClick={surprise}
      className="w-1/2"
      disabled={response || loading}
    >
      Prompt Suggestion
    </Button>
  );
};

export default SurpriseButton;
