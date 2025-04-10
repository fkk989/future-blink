export const BACKEND_URL = "https://future-blink.onrender.com/api"

import { Node } from "@xyflow/react";

export const addLeadX = 200
export const addSequenceX = 290;

export const defaultNodes: Node[] = [
  {
    id: "add-lead",
    type: "add-lead",
    position: { x: 200, y: 0 },
    data: { label: "Leads from\nvery new List" },
  },

  {
    id: "sequence-start-point",
    type: "sequence-start-point",
    position: { x: 200, y: 200 },
    data: { label: "Leads from\nvery new List" },
  },

];

export const SequenceStartId = "sequence-start-point"

export const edgesStyle = {
  strokeWidth: 2,
  stroke: "#cecccc",

}

export const inputStyle = "border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
export const buttonStyle = "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"

//