// @ts-nocheck
import { memo, useCallback } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { IoIosAdd } from "react-icons/io"; // Optional icon library
import { useReactFlowContext } from "../../../context/ReactFlowContext";

export const LeadNode = ({ id: currentLeadId, data }: NodeProps) => {
  const { leadsNode, setLeadNode, setLeads } = useReactFlowContext();

  const removeLeadNode = useCallback(() => {
    setLeads((prev) => {
      const filterLeads = prev.filter((lead) => lead !== currentLeadId);
      return filterLeads;
    });

    setLeadNode((prev) => {
      const filterLeads = prev.filter((lead) => lead.id !== currentLeadId);
      return filterLeads;
    });
  }, [leadsNode]);

  return (
    <div className="group rounded-lg border border-gray-200 bg-white shadow-sm p-2 text-center w-[220px]">
      {/* delete button */}
      <div className="w-full flex justify-end h-[15px]">
        <button
          onClick={() => {
            removeLeadNode();
          }}
          className="cursor-pointer mr-[5px] text-[tomato] hover:text-red-500 hidden group-hover:block"
        >
          X
        </button>
      </div>
      <div className=" font-medium text-gray-700">Getting Leads from</div>
      <div className="text-[20px] font-bold">{data?.name}</div>

      {/* Optional handles if this connects later */}
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
};
