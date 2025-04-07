import { useState } from "react";
import { EditLogo } from "../../logos/edit";
import { useNavigate } from "react-router-dom";
import { userCreateTemplate, useGetEmailTemplate } from "../../../hooks/email";

export const EmailPage: React.FC<{}> = () => {
  //
  const navigate = useNavigate();
  // state for creating list
  const [templateName, setTemplateName] = useState("");

  const { template, getTemplate } = useGetEmailTemplate();

  const { createTemplate } = userCreateTemplate(templateName, getTemplate);

  return (
    <div className="w-full flex flex-col items-center">
      {/* input to create new list */}
      <div></div>
      <div className="w-full flex flex-col items-end">
        <div className="mt-[20px] mr-[20px]">
          <h2 className="text-[20px] mb-[15px]">Create Email</h2>
          <div className="flex items-center gap-[5px]">
            <input
              type="text"
              value={templateName}
              onChange={(e) => {
                setTemplateName(e.target.value);
              }}
              placeholder="Enter list name"
              className="w-[500px] border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={async (e) => {
                e.preventDefault();

                await createTemplate();
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              New List +
            </button>
          </div>
        </div>
      </div>
      {/* list table */}
      <div className="w-full flex justify-center mt-[40px]">
        <table className="w-[80%] text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {template.map((email) => (
              <tr key={email._id} className="border-b hover:bg-gray-50">
                <td className="p-3 w-[40%] items-center gap-2">{email.name}</td>
                <td className=" p-3 w-[40%] items-center gap-2 cursor-pointer">
                  <EditLogo
                    onClick={() => {
                      navigate(`/email-template/${email._id}`);
                    }}
                    className="hover:text-blue-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
