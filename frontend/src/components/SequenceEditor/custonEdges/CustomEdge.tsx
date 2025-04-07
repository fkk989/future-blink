import { useReactFlowContext } from "../../../context/ReactFlowContext";
import { BaseEdge, EdgeLabelRenderer, getStraightPath } from "@xyflow/react";
import { IoIosAdd } from "react-icons/io";

export function CustomEdge({ id, sourceX, sourceY, targetX, targetY }: any) {
  const { setOpenLeadsModal } = useReactFlowContext();
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={{ stroke: "#5040BF" }} />
      <EdgeLabelRenderer>
        <button
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className={`absolute  flex justify-center items-center text-[20px] text-[#5040BF] hover:text-[#F7F5F1] hover:font-bold bg-[#F7F5F1] hover:bg-[#5040BF] rounded-full transition-all duration-500 ease-out`}
          onClick={() => {
            setOpenLeadsModal(true);
          }}
        >
          <IoIosAdd />
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
