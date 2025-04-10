"use client";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { LeadsModal } from "./modals/LeadsModal";
import { useReactFlowContext } from "../../context/ReactFlowContext";
import { CustomEdge } from "./custonEdges/CustomEdge";

import { AddLeadSourceNode } from "./customNodes/AddLeadNode";
import { SequenceStartNode } from "./customNodes/SequenceStartNode";
import AddSequenceNode from "./customNodes/AddSequenceNode";
import { AddSequenceModal } from "./modals/AddSequenceModal";
import {
  addSequenceX,
  defaultNodes,
  edgesStyle,
  SequenceStartId,
} from "../../utils/constants";
import { LeadNode } from "./customNodes/LeadNode";
import { SequenceNode } from "./customNodes/SequenceNode";
import { useEffect } from "react";

export const edgeTypes = {
  "custom-edge": CustomEdge,
};
//
export const nodesTypes = {
  "add-lead": AddLeadSourceNode,
  "sequence-start-point": SequenceStartNode,
  "add-sequence-end": AddSequenceNode,
  "lead-node": LeadNode,
  "sequence-node": SequenceNode,
};

export function SequenceEditor() {
  const {
    openLeadsModal,
    setOpenLeadsModal,
    openSequenceModal,
    setOpenSequenceModal,
    leadsNode,
    sequenceNode,
    edges,
    onConnect,
    setEdges,
    addSequenceNode,
    setAddSequenceNode,
  } = useReactFlowContext();

  // setting Add sequence node edge
  useEffect(() => {
    if (sequenceNode.length === 0) {
      //
      setEdges((prev) => [
        ...prev,
        {
          id: "add-sequence-end",
          type: "step",
          source: SequenceStartId,
          target: "add-sequence-end",
          style: edgesStyle,
        },
      ]);
      //
      setAddSequenceNode([
        {
          id: "add-sequence-end",
          type: "add-sequence-end",
          position: { x: addSequenceX, y: 400 },
          data: {},
        },
      ]);
      //
    } else {
      const lastSequence = sequenceNode[sequenceNode.length - 1];
      //

      setEdges((prev) => {
        const getAddEdge = prev.filter(
          (edge) => edge.id !== "add-sequence-end"
        );

        const newAddEdge = {
          id: "add-sequence-end",
          type: "step",
          source: lastSequence.id,
          target: "add-sequence-end",
          style: edgesStyle,
        };

        return [...getAddEdge, newAddEdge];
      });

      setAddSequenceNode(() => [
        {
          id: "add-sequence-end",
          type: "add-sequence-end",
          position: { x: addSequenceX, y: lastSequence.position.y + 200 },
          data: {},
        },
      ]);
    }
  }, [sequenceNode]);

  return (
    <div className="relative w-[90%] h-[75vh] flex justify-center items-center bg-[#F7F5F1]">
      {/* add lead Modal */}
      <LeadsModal
        open={openLeadsModal}
        setOpen={setOpenLeadsModal}
        component={
          <div className="w-[400px] h-[500px] bg-[#F7F5F1] rounded-md"></div>
        }
      />
      {/* add sequence Modal */}
      <AddSequenceModal
        open={openSequenceModal}
        setOpen={setOpenSequenceModal}
        component={
          <div className="w-[400px] h-[500px] bg-[black] rounded-md"></div>
        }
      />
      <ReactFlow
        className="w-full h-full flex justify-center items-center"
        nodes={[
          ...defaultNodes,
          ...leadsNode,
          ...sequenceNode,
          ...addSequenceNode,
        ]}
        edges={edges}
        onConnect={onConnect}
        nodeTypes={nodesTypes}
        edgeTypes={edgeTypes}
        minZoom={0.5}
        maxZoom={1.2}
        fitView
        nodesDraggable={false}
        panOnDrag={true}
        panOnScroll={true}
      >
        <MiniMap
          position="bottom-right"
          style={{ height: 120 }}
          nodeColor={() => "black"}
          zoomable
          pannable
        />
        <Background
          id="1"
          gap={10}
          size={1}
          variant={BackgroundVariant.Dots}
          color="#DDDBD7"
        />
      </ReactFlow>
    </div>
  );
}
