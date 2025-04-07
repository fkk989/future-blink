import { EmailEditorComponent } from "../../EmailEditor";
import { useParams } from "react-router-dom";

export const EditEmailPage = () => {
  const { id: templateId } = useParams();
  return (
    <div>
      <EmailEditorComponent templateId={templateId!} />
    </div>
  );
};
