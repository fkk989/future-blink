import { Modal } from "../../custom/Modal";
import React, { useState } from "react";
import { useReactFlowContext } from "../../../context/ReactFlowContext";
import {
  addLeadX,
  buttonStyle,
  edgesStyle,
  inputStyle,
  SequenceStartId,
} from "../../../utils/constants";
import { SequenceNode } from "../../../utils/types";
import { useGetEmailTemplate } from "../../../hooks/email";

interface DropdownProp {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  component: React.ReactNode;
}

export const AddSequenceModal: React.FC<DropdownProp> = (prop) => {
  const [sequenceType, setSequenceType] = useState<SequenceNode["type"] | null>(
    null
  );
  const [delayData, setDelayData] = useState<SequenceNode>({
    id: "",
    type: "DELAY",
    delayTimeInMilleseconds: 0,
  });
  const {
    setSequence,
    sequenceNode,
    setSequenceNode,
    setEdges,
    setOpenSequenceModal,
  } = useReactFlowContext();

  // fetching all email template for create email sequence
  const { template } = useGetEmailTemplate();

  //
  const addSequence = (data: any) => {
    setSequence((prev) => {
      const sequenceObj = {
        type: data.type,
      };

      if (data.type === "EMAIL") {
        // @ts-ignore
        sequenceObj.emailTemplate = data._id;
      }

      if (data.type == "DEALY") {
        // @ts-ignore
        sequenceObj.delayTimeInMilleseconds = data.delayTimeInMilleseconds;
      }

      const updatedSequence = [...prev, sequenceObj];
      return updatedSequence;
    });
    const positionY =
      sequenceNode.length !== 0 ? 200 * (sequenceNode.length + 1) : 400;
    //

    setSequenceNode((pre) => [
      ...pre,
      {
        id: data.id,
        type: "sequence-node",
        position: { x: addLeadX, y: positionY },
        data: {
          id: data.id,
          type: data.type,
          template: data?.name,
          delayTimeInMilleseconds: data?.delayTimeInMilleseconds,
        },
      },
    ]);

    const lastSequenceNodeId =
      sequenceNode.length > 0 && sequenceNode[sequenceNode.length - 1].id;

    setEdges((pre) => [
      ...pre,
      {
        id: data.id,
        type: "step",
        source: lastSequenceNodeId ? lastSequenceNodeId : SequenceStartId,
        target: data.id,
        style: edgesStyle,
      },
    ]);
  };

  return (
    <Modal.Root
      isOpen={prop.open}
      setIsOpen={(value) => {
        setSequenceType(null);
        prop.setOpen(value);
      }}
      className="fixed flex flex-col justify-center cursor-pointer h-[55px] z-[2] "
    >
      <Modal.Content>
        <div className=" ">
          {!sequenceType ? (
            <ul className="flex flex-col items-center justify-center gap-[20px] w-[200px] bg-white h-[200px] rounded">
              <li
                onClick={() => {
                  setSequenceType("EMAIL");
                }}
                className="w-full flex items-center justify-center h-[50px] hover:bg-gray-300"
              >
                EMAIL
              </li>
              <li
                onClick={() => {
                  setSequenceType("DELAY");
                }}
                className="w-full flex items-center justify-center text-center h-[50px] hover:bg-gray-300 "
              >
                DELAY
              </li>
            </ul>
          ) : (
            <div>
              {sequenceType === "DELAY" ? (
                <div className="flex flex-col items-end w-[500px] h-[500px] bg-white rounded-[16px]">
                  <input
                    type="number"
                    placeholder="Enter Delays time in minutes"
                    className={`${inputStyle} w-[400px] mt-[40px]  mr-[40px]`}
                    onChange={(e) => {
                      // converting minutes to seconds
                      const delayTimeInMilleseconds =
                        Number(e.target.value) * 60 * 1000;
                      //
                      setDelayData((prev) => ({
                        ...prev,
                        delayTimeInMilleseconds,
                      }));
                    }}
                  />
                  <button
                    onClick={() => {
                      addSequence(delayData);
                      setDelayData({
                        type: "DELAY",
                        delayTimeInMilleseconds: 0,
                        id: `${Date.now()}`,
                      });
                      setSequenceType(null);
                    }}
                    className={`${buttonStyle} w-[150px]  mr-[40px] mt-[20px]`}
                  >
                    insert
                  </button>
                </div>
              ) : (
                <div className="">
                  <ul className="w-[300px] max-h-[500px] bg-white flex flex-col  overflow-x-hidden overflow-y-scroll py-[20px] px-[5px] rounded gap-[15px]">
                    {template.map((emailTemplate) => {
                      return (
                        <li
                          key={emailTemplate._id}
                          className="w-full flex items-center justify-center h-[50px] hover:bg-gray-300"
                          onClick={() => {
                            addSequence({
                              ...emailTemplate,
                              type: "EMAIL",
                              id: emailTemplate._id,
                            });
                            setOpenSequenceModal(false);
                            setSequenceType(null);
                          }}
                        >
                          {emailTemplate.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};
