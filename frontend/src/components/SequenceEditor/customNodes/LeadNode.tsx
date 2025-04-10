import { useCallback } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { useReactFlowContext } from "../../../context/ReactFlowContext";

export const LeadNode = ({ id: currentNodeId, data }: NodeProps) => {
  const { leadsNode, setLeadNode, setLeads } = useReactFlowContext();

  const removeLeadNode = useCallback(() => {
    setLeads((prev) => {
      const filterLeads = prev.filter((leadId) => leadId !== data?.id);
      return filterLeads;
    });

    setLeadNode((prev) => {
      const filterLeads = prev.filter(
        (leadNode) => leadNode.id !== currentNodeId
      );

      // repositioning their position X

      const finalNode = filterLeads.map((node, index) => {
        const positionX = 250 * index + 450;
        node.position.x = positionX;
        return {
          ...node,
          position: {
            ...node.position,
            x: positionX,
          },
        };
      });

      console.log("final node", finalNode);

      return finalNode;
    });
  }, [leadsNode]);

  return (
    <div className="group rounded-lg border border-gray-200 bg-white shadow-sm p-2 text-center w-[220px] h-[100px] overflow-x-hidden overflow-y-scroll">
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
      <div className="text-[20px] font-bold">{data?.name as string}</div>

      {/* Optional handles if this connects later */}
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
};
