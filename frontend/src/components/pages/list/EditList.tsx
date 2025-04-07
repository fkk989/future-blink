import { useEffect, useState } from "react";
import CsvUploader from "../../CsvUploader";
import DynamicTable from "../../DynamicTable";
import { createOrUpdateListData, useGetListbyId } from "../../../hooks/List";
import { useNavigate, useParams } from "react-router-dom";
export const EditListPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { id: listId } = useParams();
  const { listData: existingData } = useGetListbyId(id!);

  const [listData, setListData] = useState<any[]>([]);

  useEffect(() => {
    if (existingData) {
      setListData(existingData.listData.data);
    }
  }, [existingData]);
  return (
    <div>
      <CsvUploader setListData={setListData} />
      <div className="w-full flex justify-center">
        <div className="w-[80%] flex flex-col items-center justify-center gap-[10px]">
          <h3 className="text-[20px]">Data Preview of {existingData?.name}</h3>
          <DynamicTable data={listData.slice(0, 11)} />
          <div className="w-[70%] flex justify-end items-center mt-[20px]">
            <button
              onClick={() => {
                createOrUpdateListData(listId!, listData, () => {
                  navigate("/list");
                });
              }}
              className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
