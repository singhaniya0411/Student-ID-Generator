import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";

export default function IDCardPreview({ data, studentCards, setStudentCards }) {
  const cardRef = useRef();
  const [template, setTemplate] = useState("classic"); // local state

  const handleDelete = (rollNumber) => {
    const updatedCards = studentCards.filter(
      (card) => card.rollNumber !== rollNumber
    );
    setStudentCards(updatedCards);
    localStorage.setItem("studentCards", JSON.stringify(updatedCards));
  };

  const downloadImage = () => {
    if (cardRef.current) {
      toPng(cardRef.current).then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${data.name}_id_card.png`;
        link.href = dataUrl;
        link.click();
      });
    }
  };

  const toggleTemplate = () => {
    setTemplate((prev) => (prev === "classic" ? "modern" : "classic"));
  };

  const templateStyles =
    template === "modern"
      ? "bg-gradient-to-br from-indigo-600 via-blue-500 to-indigo-700 text-white border border-white shadow-xl"
      : "border border-gray-400 p-6 bg-white text-gray-900";

  return (
    <div className="mt-4">
      <div
        ref={cardRef}
        className={`w-full max-w-sm mx-auto p-5 rounded-2xl shadow-xl ${templateStyles}`}
      >
        <h2 className="text-2xl font-bold text-center mb-3 drop-shadow">
          Student ID Card
        </h2>

        <div className="flex items-center gap-4">
          {data.photo && (
            <img
              src={data.photo}
              alt="Photo"
              className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-md"
            />
          )}
          <div className="text-sm space-y-1">
            <p>
              <strong>Name:</strong> {data.name}
            </p>
            <p>
              <strong>Roll No:</strong> {data.rollNumber}
            </p>
            <p>
              <strong>Class:</strong> {data.classDivision}
            </p>
          </div>
        </div>

        <div className="text-sm mt-3 space-y-1">
          <p>
            <strong>Rack No:</strong> {data.rackNumber}
          </p>
          <p>
            <strong>Bus Route:</strong> {data.busRoute}
          </p>
          {Array.isArray(data.allergies) && data.allergies.length > 0 && (
            <p>
              <strong>Allergies:</strong> {data.allergies.join(", ")}
            </p>
          )}
        </div>

        <div className="flex justify-center mt-4">
          <div className="bg-white p-2 rounded shadow">
            <QRCode
              value={JSON.stringify({
                name: data.name,
                rollNumber: data.rollNumber,
                classDivision: data.classDivision,
                allergies: data.allergies,
                rackNumber: data.rackNumber,
                busRoute: data.busRoute,
              })}
              size={80}
              bgColor="transparent"
            />
          </div>
        </div>
      </div>

      <div className=" flex h-8 mt-4 gap-4 text-sm justify-around">
        <button
          onClick={downloadImage}
          className="bg-green-400 text-white rounded hover:bg-green-700 w-[30%]"
        >
          Download
        </button>

        <button
          onClick={() => handleDelete(data.rollNumber)}
          className="bg-red-500 text-white rounded hover:bg-red-700 w-[25%]"
        >
          Delete
        </button>

        <button
          onClick={toggleTemplate}
          className="bg-blue-500 text-white rounded hover:bg-blue-700 w-[33%]"
        >
          Switch Template
        </button>
      </div>
    </div>
  );
}
