import { useState } from "react";
import "./App.css";
import StudentForm from "./components/StudentForm";
import IDCardPreview from "./components/IDCardPreview";
import SavedCards from "./components/SavedCard";

function App() {
  const [showSaved, setShowSaved] = useState(false);

  const [studentData, setStudentData] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold text-center mb-3">
        Student ID Generator
      </h1>

      {showSaved ? (
        <SavedCards />
      ) : (
        <div className="flex flex-col gap-6 ">
          <div className="w-full justify-center flex mt-10">
            <StudentForm setStudentData={setStudentData} />
          </div>

          <div className="w-full">
            {studentData && <IDCardPreview data={studentData} />}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          className=" bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowSaved(!showSaved)}
        >
          {showSaved ? "Back to Form " : "Show Saved Cards"}
        </button>
      </div>
    </div>
  );
}

export default App;
