import { useNavigate, useParams } from "react-router-dom";
import {
  createOrUpdateSequence,
  useGetSequenceById,
} from "../../../hooks/sequence";
import { SequenceEditor } from "../../SequenceEditor/Editor";
import { useReactFlowContext } from "../../../context/ReactFlowContext";
import toast from "react-hot-toast";

export const SequenceDetails = () => {
  const navigate = useNavigate();
  //
  const { id: sequencId } = useParams();
  const { sequence } = useGetSequenceById(sequencId!);
  const {
    scheduledAt,
    setScheduledAt,
    leads,
    sequence: inputSequence,
  } = useReactFlowContext();

  

  return (
    <div>
      <div className="flex items-center justify-between mt-[50px] mb-[20px]">
        <h2 className=" ml-[20px] text-[20px] font-[600] ">
          Editing: {sequence?.name}
        </h2>
        {/* save button */}
        <div className="flex items-center gap-[5px]">
          <input
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => {
              e.preventDefault();
              setScheduledAt(e.target.value);
            }}
            className="w-[500px] border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={async (e) => {
              e.preventDefault();
              if (!scheduledAt) {
                return toast.error("plase select a schedule date", {
                  id: "update-sequence",
                });
              }
              if (new Date(scheduledAt).getTime() < Date.now()) {
                return toast.error("plase select a future date", {
                  id: "update-sequence",
                });
              }
              if (leads.length === 0) {
                return toast.error("Add a lead source", {
                  id: "update-sequence",
                });
              }
              if (inputSequence.length === 0) {
                console.log("inputSequence : ", inputSequence);
                return toast.error("Aleast add one sequence", {
                  id: "update-sequence",
                });
              }
              createOrUpdateSequence(
                sequencId!,
                {
                  scheduledAt,
                  leadsList: leads,
                  nodes: inputSequence,
                },
                () => {
                  navigate("/sequence");
                }
              );
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mr-[20px] cursor-pointer"
          >
            Save & Schedule
          </button>
        </div>
      </div>
      <div className="w-full  flex justify-center items-center mb-[20px]">
        <SequenceEditor />
      </div>
    </div>
  );
};
