import {  useRef, useState } from "react";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import toast from "react-hot-toast";
import { updateTemplate } from "../hooks/email";
import { useNavigate } from "react-router-dom";

export const EmailEditorComponent = ({
  templateId,
}: {
  templateId: string;
}) => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("");

  const emailEditorRef = useRef<EditorRef>(null);

  //
  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { html: htmlBody } = data;
      setHtml(htmlBody);
    });
  };

  const onReady: EmailEditorProps["onReady"] = () => {
    // editor is ready
    // you can load your template here;
    // the design json can be obtained by calling
    // unlayer.loadDesign(callback) or unlayer.exportHtml(callback)
    // const templateJson = { DESIGN JSON GOES HERE };
    // unlayer.loadDesign(templateJson);
  };

  return (
    <div className="fixed bottom-0 w-full h-[70%]">
      <div className="w-full flex flex-col items-end justify-center gap-[10px] ">
        <div className="flex flex-col  gap-[5px] mr-[80px]">
          <label htmlFor="">* Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            placeholder="Subject"
            className="w-[500px] border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors mr-[80px]"
          onClick={(e) => {
            e.preventDefault();
            if (subject.length === 0) {
              return toast.error("Please give a subject", {
                id: "update-template",
              });
            }

            updateTemplate(templateId, { subject, html }, () => {
              navigate("/email-template");
            });
          }}
        >
          Save Template
        </button>
      </div>
      <div>
        <button
          className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          onClick={exportHtml}
        >
          Export HTML
        </button>
      </div>
      <EmailEditor ref={emailEditorRef} onReady={onReady} />
    </div>
  );
};
