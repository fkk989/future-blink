// PlusNode.tsx
import { Handle, Position } from "@xyflow/react";
import { useReactFlowContext } from "../../../context/ReactFlowContext";

export default function AddSequenceNode() {
  const { setOpenSequenceModal } = useReactFlowContext();
  return (
    <div
      onClick={() => {
        setOpenSequenceModal(true);
      }}
      className="w-[40px] h-[40px] bg-white border-2 border-blue-500 rounded-md flex items-center justify-center text-blue-500 text-xl font-bold cursor-pointer shadow-sm"
    >
      +{/* Top handle (gray) */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 bg-gray-300"
        style={{ top: -6 }}
        isConnectable={false}
      />
    </div>
  );
}
