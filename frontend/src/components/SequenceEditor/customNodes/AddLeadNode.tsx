import { Handle, Position } from "@xyflow/react";
import { IoIosAdd } from "react-icons/io"; // Optional icon library
import { useReactFlowContext } from "../../../context/ReactFlowContext";

export const AddLeadSourceNode = () => {
  const { setOpenLeadsModal } = useReactFlowContext();

  return (
    <div
      onClick={() => {
        setOpenLeadsModal(true);
      }}
      className="rounded-lg border border-gray-200 bg-white shadow-sm p-2 text-center w-[220px]"
    >
      <IoIosAdd className="mx-auto text-green-600 mb-1" size={40} />
      <div className=" font-medium text-gray-700">Add Lead Source</div>
      <div className="text-[14px] text-gray-500">
        Click to add leads from List or CRM
      </div>

      {/* Optional handles if this connects later */}
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
};
