import { useState } from "react";
import { useGetList, userCreateList } from "../../../hooks/List";
import { EditLogo } from "../../logos/edit";
import { useNavigate } from "react-router-dom";

export const ListPage: React.FC<{}> = () => {
  //
  const navigate = useNavigate();
  // state for creating list
  const [listName, setListName] = useState("");

  const { listData, getListData } = useGetList();
  const { createList } = userCreateList(listName, getListData);

  return (
    <div className="w-full flex flex-col items-center">
      {/* input to create new list */}
      <div></div>
      <div className="w-full flex flex-col items-end">
        <div className="mt-[20px] mr-[20px]">
          <h2 className="text-[20px] mb-[15px]">Create List</h2>
          <div className="flex items-center gap-[5px]">
            <input
              type="text"
              value={listName}
              onChange={(e) => {
                e.preventDefault();
                setListName(e.target.value);
              }}
              placeholder="Enter list name"
              className="w-[500px] border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={async (e) => {
                e.preventDefault();

                await createList();
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              New List +
            </button>
          </div>
        </div>
      </div>
      {/* list table */}
      <div className="w-full flex justify-center mt-[40px]">
        <table className="w-[80%] text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Contacts</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listData.map((list) => (
              <tr key={list._id} className="border-b hover:bg-gray-50">
                <td className="p-3 flex items-center gap-2">{list.name}</td>
                <td className="p-3">{list?.listData?.data?.length || 0}</td>
                <td className="p-3 flex items-center gap-2 cursor-pointer">
                  <EditLogo
                    onClick={() => {
                      navigate(`/list/${list._id}`);
                    }}
                    className="hover:text-blue-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
