export interface LogedUser {
  id: string;
  name: string;
  email: string;
  role: string
  isVerified: boolean;
}

export type NodeType = "EMAIL" | "DELAY";

export interface SequenceNode {
  id?:string;
  type: NodeType;
  emailTemplate?: string; // Optional for DELAY nodes
  delayTimeInMilleseconds?: number;        // Optional for EMAIL nodes
}


export interface Sequence {
  _id?: string;
  scheduledAt: Date;
  leadsList: [string];
  name: string;
  user: string;
  nodes: SequenceNode[];
  createdAt?: Date;
  updatedAt?: Date;
}