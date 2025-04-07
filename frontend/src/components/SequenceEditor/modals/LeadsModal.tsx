import { Modal } from "../../custom/Modal";
import React, { useCallback } from "react";
import { useGetList } from "../../../hooks/List";
import { useReactFlowContext } from "../../../context/ReactFlowContext";
import { edgesStyle, SequenceStartId } from "../../../utils/constants";

interface DropdownProp {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  component: React.ReactNode;
}

export const LeadsModal: React.FC<DropdownProp> = (prop) => {
  //
  const { setLeadNode, leadsNode, setEdges, setOpenLeadsModal, setLeads } =
    useReactFlowContext();
  const { listData } = useGetList();

  const addLeadNodes = useCallback(
    (list: any) => {
      // increasing
      setLeads((prev) => [...prev, list._id]);
      const positionX =
        leadsNode.length !== 0 ? 350 * (leadsNode.length + 1) : 450;
      //

      setLeadNode((pre) => [
        ...pre,
        {
          id: list._id,
          type: "lead-node",
          position: { x: positionX, y: 0 },
          data: { name: list.name },
        },
      ]);

      setEdges((pre) => [
        ...pre,
        {
          id: list._id,
          type: "step",
          source: list._id,
          target: SequenceStartId,
          style: edgesStyle,
        },
      ]);
    },
    [leadsNode]
  );

  return (
    <Modal.Root
      isOpen={prop.open}
      setIsOpen={prop.setOpen}
      className="fixed flex flex-col justify-center cursor-pointer h-[55px] z-[2] "
    >
      <Modal.Content>
        <div>
          <ul className="w-[300px] max-h-[500px] bg-white flex flex-col  overflow-x-hidden overflow-y-scroll py-[20px] px-[5px] rounded gap-[15px]">
            {listData.map((list) => {
              return (
                <li
                  key={list._id}
                  className="rounded text-[20px] hover:bg-gray-300 py-[3px]"
                  onClick={() => {
                    addLeadNodes(list);
                    setOpenLeadsModal(false);
                  }}
                >
                  {list.name}
                </li>
              );
            })}
          </ul>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
