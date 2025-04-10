import React from "react";
import Papa from "papaparse";

type CsvData = Record<string, string>; // Or define a more specific type if you know the headers

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const UploadButton: React.FC<Props> = ({ onChange }) => {
  return (
    <div className="p-4">
      <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors">
        📁 Upload CSV
        <input
          type="file"
          accept=".csv"
          onChange={onChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

const CsvUploader = ({ setListData }: { setListData: any }) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<CsvData>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        console.log("Parsed CSV Data:", result.data);
        setListData(result.data);
      },
      error: (err) => {
        console.error("CSV parsing error:", err.message);
      },
    });
  };

  return (
    <div className="p-4">
      <UploadButton onChange={handleFileUpload} />
    </div>
  );
};

export default CsvUploader;
