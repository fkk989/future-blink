import { Handle, Position } from "@xyflow/react";

export const SequenceStartNode = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-4 text-center w-[220px]">
      <div className="text-base font-medium text-gray-700">
        Sequence Start Point
      </div>

      {/* Optional handles if this connects later */}
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
};
