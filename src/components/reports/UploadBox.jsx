import { useState } from "react";
import { FaCloudUploadAlt, FaFileImage, FaFilePdf } from "react-icons/fa";

function UploadBox() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="border-2 border-dashed border-slate-600 rounded-2xl p-8 bg-slate-900/40 hover:border-cyan-400 transition">

      <div className="flex flex-col items-center">

        <FaCloudUploadAlt className="text-6xl text-cyan-400 mb-4" />

        <h3 className="text-white text-xl font-semibold">
          Upload Evidence
        </h3>

        <p className="text-slate-400 text-center mt-2">
          Upload Image or PDF
        </p>

        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileChange}
          className="mt-5 text-white"
        />

        {file && (
          <div className="mt-6 w-full rounded-xl bg-slate-800 p-4 flex items-center gap-4">

            {file.type.includes("image") ? (
              <FaFileImage className="text-green-400 text-2xl" />
            ) : (
              <FaFilePdf className="text-red-400 text-2xl" />
            )}

            <div>
              <p className="text-white font-medium">
                {file.name}
              </p>

              <p className="text-slate-400 text-sm">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default UploadBox;