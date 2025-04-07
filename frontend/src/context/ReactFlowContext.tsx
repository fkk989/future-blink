import {
  addEdge,
  Edge,
  Node,
  OnEdgesChange,
  OnNodesChange,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { createContext, useCallback, useContext, useState } from "react";
import { SequenceNode } from "../utils/types";

//
interface ReactFlowContext {
  openLeadsModal: boolean;
  setOpenLeadsModal: React.Dispatch<React.SetStateAction<boolean>>;
  openSequenceModal: boolean;
  setOpenSequenceModal: React.Dispatch<React.SetStateAction<boolean>>;
  leadsNode: Node[];
  setLeadNode: React.Dispatch<React.SetStateAction<Node[]>>;
  onChangeLeadNode: OnNodesChange<Node>;
  sequenceNode: Node[];
  setSequenceNode: React.Dispatch<React.SetStateAction<Node[]>>;
  onChangeSequenceNode: OnNodesChange<Node>;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onEdgesChange: OnEdgesChange<Edge>;
  onConnect: (params: any) => void;
  scheduledAt: string;
  setScheduledAt: React.Dispatch<React.SetStateAction<string>>;
  sequence: SequenceNode[];
  setSequence: React.Dispatch<React.SetStateAction<SequenceNode[]>>;
  leads: string[];
  setLeads: React.Dispatch<React.SetStateAction<string[]>>;
}

const ReactFlowContext = createContext<ReactFlowContext | null>(null);

export const ReactFlowContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // sequence states
  const [leads, setLeads] = useState<string[]>([]);
  const [sequence, setSequence] = useState<SequenceNode[]>([]);
  const [scheduledAt, setScheduledAt] = useState<string>("");

  const [openLeadsModal, setOpenLeadsModal] = useState(false);
  const [openSequenceModal, setOpenSequenceModal] = useState(false);
  const [leadsNode, setLeadNode, onChangeLeadNode] = useNodesState<Node>([]);

  const [sequenceNode, setSequenceNode, onChangeSequenceNode] =
    useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlowContext.Provider
      value={{
        setOpenLeadsModal,
        openLeadsModal,
        openSequenceModal,
        setOpenSequenceModal,
        leadsNode,
        setLeadNode,
        onChangeLeadNode,
        sequenceNode,
        setSequenceNode,
        onChangeSequenceNode,
        edges,
        setEdges,
        onEdgesChange,
        onConnect,
        scheduledAt,
        setScheduledAt,
        sequence,
        setSequence,
        leads,
        setLeads,
      }}
    >
      {children}
    </ReactFlowContext.Provider>
  );
};

export const useReactFlowContext = () => {
  const context = useContext(ReactFlowContext)!;
  return context;
};
