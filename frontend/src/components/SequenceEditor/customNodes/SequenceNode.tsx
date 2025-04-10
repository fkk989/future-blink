import { useCallback } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { useReactFlowContext } from "../../../context/ReactFlowContext";

export const SequenceNode = ({ id: currentNodeId, data }: NodeProps) => {
  const { setSequence, setSequenceNode, sequenceNode, setEdges } =
    useReactFlowContext();

  const delayInMinutes =
    // @ts-ignore
    data?.delayTimeInMilleseconds && data.delayTimeInMilleseconds / (1000 * 60);

  const removeSequence = useCallback(() => {
    //
    setSequence((prev) => {
      const filteredSequence = prev.filter((sequence) => {
        if (data.type === "DELAY") return sequence.id !== data.id;
        if (data.type === "EMAIL")
          return sequence.emailTemplate !== data?.templateId;
      });
      return filteredSequence;
    });

    setSequenceNode((prev) => {
      // saving previous node to connect to the
      const filteredSequenceNode = prev.filter(
        (sequence) => sequence.id !== data.id
      );

      const finalSequence = filteredSequenceNode.map((node, index) => {
        // setting node height
        const positionY = 180 * index + 350;
        return { ...node, position: { ...node.position, y: positionY } };
      });
      console.log("filteredd sequence", finalSequence);

      return finalSequence;
    });

    setEdges((prevEdges) => {
      const incoming = prevEdges.find((edge) => edge.target === currentNodeId);
      const outgoing = prevEdges.find((edge) => edge.source === currentNodeId);

      const newEdges = prevEdges.filter(
        (edge) =>
          (edge.source !== currentNodeId && edge.target !== currentNodeId) ||
          edge.id !== currentNodeId
      );

      if (incoming && outgoing) {
        newEdges.push({
          id: `${Date.now()}`,
          source: incoming.source,
          target: outgoing.target,
          type: "step",
        });
      }

      return newEdges;
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
        <>
          <div className=" font-medium text-gray-700">Email template:</div>
          <div>{data?.template as string}</div>
        </>
      )}
      {data?.type === "DELAY" && (
        <div className=" font-medium text-gray-700">
          Delay of {delayInMinutes as string} Minutes
        </div>
      )}

      {/* Optional handles if this connects later */}
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
};
