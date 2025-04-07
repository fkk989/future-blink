// @ts-nocheck

import { memo, useCallback } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { IoIosAdd } from "react-icons/io"; // Optional icon library
import { useReactFlowContext } from "../../../context/ReactFlowContext";

export const SequenceNode = ({ id: currentLeadId, data }: NodeProps) => {
  const { sequence, setSequence, setSequenceNode, sequenceNode } =
    useReactFlowContext();

  const delayInMinutes =
    // @ts-ignore
    data?.delayTimeInMilleseconds && data.delayTimeInMilleseconds / (1000 * 60);

  const removeSequence = useCallback(() => {
    setSequence((prev) => {
      const filterLeads = prev.filter((lead) => lead.id !== currentLeadId);
      return filterLeads;
    });

    setSequenceNode((prev) => {
      const filterLeads = prev.filter((lead) => lead.id !== currentLeadId);
      return filterLeads;
    });
  }, [sequenceNode]);

  return (
    <div className="group rounded-lg border border-gray-200 bg-white shadow-sm p-2 text-center w-[220px]">
      {/* delete button */}
      <div className="w-full flex justify-end h-[15px]">
        <button
          onClick={() => {
            removeSequence();
          }}
          className="cursor-pointer mr-[5px] text-[tomato] hover:text-red-500 hidden group-hover:block"
        >
          X
        </button>
      </div>
      {data?.type === "EMAIL" && (
        <div className=" font-medium text-gray-700">
          Email template {data?.template}
        </div>
      )}
      {data?.type === "DELAY" && (
        <div className=" font-medium text-gray-700">
          Delay of {delayInMinutes} Minutes
        </div>
      )}

      {/* Optional handles if this connects later */}
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
};
