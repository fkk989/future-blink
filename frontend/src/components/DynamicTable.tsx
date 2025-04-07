import React from "react";

type Props = {
  data: Record<string, any>[];
};

const DynamicTable: React.FC<Props> = ({ data }) => {
  if (!data.length) return <p></p>;

  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-auto border rounded-md">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {headers.map((key) => (
              <th key={key} className="p-3 border-b">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {headers.map((key) => (
                <td key={key} className="p-3 border-b">
                  {row[key] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
