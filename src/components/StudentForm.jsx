import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const allergyOption = [
  "Pollen",
  "Pet Dander",
  "Insect Sting",
  "Medications",
  "Mold",
  "Dust",
  "Certain Food",
];

const classes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

const division = ["A", "B", "C"];

const busRoutes = ["Route 1", "Route 2", "Route 3"];

export default function StudentForm({ setStudentData }) {
  const [form, setForm] = useState({
    name: "",
    rollNumber: "",
    classDivision: "",
    allergies: [],
    photo: null,
    rackNumber: "",
    busRoute: "",
  });

  const [photoURL, setPhotoURL] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAllergyChange = (e) => {
    const { value, checked } = e.target;
    const updated = checked
      ? [...form.allergies, value]
      : form.allergies.filter((a) => a !== value);
    setForm({ ...form, allergies: updated });
  };

  const resizeImage = (
    file,
    maxWidth = 200,
    maxHeight = 200,
    quality = 0.7
  ) => {
    return new Promise((resolve) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const resizedDataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(resizedDataUrl);
      };

      reader.readAsDataURL(file);
    });
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No file attatched!");
    }

    const resizedPhoto = await resizeImage(file);
    setForm((prev) => ({ ...prev, photo: resizedPhoto }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      name,
      rollNumber,
      classDivision,
      allergies,
      photo,
      rackNumber,
      busRoute,
    } = form;

    if (
      !name ||
      !rollNumber ||
      !classDivision ||
      !rackNumber ||
      !busRoute ||
      !photo
    ) {
      toast.error("All fields are required!");
      return;
    }

    const newCard = {
      name,
      rollNumber,
      classDivision,
      allergies,
      photo,
      rackNumber,
      busRoute,
    };

    // console.log("Saving to localStorage:", newCard);

    // Get existing cards from localStorage
    const existingCards =
      JSON.parse(localStorage.getItem("studentCards")) || [];

    // Add new card to the list
    const updatedCards = [...existingCards, newCard];

    // Save updated cards to localStorage
    try {
      localStorage.setItem("studentCards", JSON.stringify(updatedCards));
      toast.success("ID Card Generated Successfully");

      setTimeout(() => {
        window.location.reload(); // Refresh the page
      }, 4000);
    } catch (error) {
      toast.error("ID Card Request Failed! Please try again");
    }

    // console.log("Saved cards:", updatedCards);
  };

  const existingCards = JSON.parse(localStorage.getItem("studentCards")) || [];

  return (
    <form
      className="bg-white p-4 rounded shadow space-y-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold">Student Form</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border rounded px-2 py-1"
        required
      />

      <input
        type="text"
        name="rollNumber"
        placeholder="Roll Number"
        value={form.rollNumber}
        onChange={handleChange}
        className="w-full border rounded px-2 py-1"
        required
      />

      <div className="flex gap-2">
        <select
          name="classDivision"
          onChange={handleChange}
          className="w-full border rounded px-2 py-1"
          required
        >
          <option value="">Select Class & Division</option>
          {classes.map((cls) =>
            division.map((div) => (
              <option key={`${cls}-${div}`}>
                {cls}-{div}
              </option>
            ))
          )}
        </select>
      </div>

      <fieldset>
        <legend className="text-sm font-medium">Allergies</legend>

        <div className="flex flex-wrap gap-2 mt-1">
          {allergyOption.map((a) => (
            <label key={a} className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                value={a}
                checked={form.allergies?.includes(a)}
                onChange={handleAllergyChange}
              />
              {a}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className="block text-sm font-medium mb-1"> Photo</label>
        <input
          className="w-full border rounded px-2 py-1"
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
        />
        {form.photo && (
          <img
            src={form.photo}
            alt="preview"
            className="mt-2 w-24 h-24 object-cover rounded"
          />
        )}
      </div>

      <input
        type="text"
        name="rackNumber"
        placeholder="Rack Number"
        value={form.rackNumber}
        onChange={handleChange}
        className="w-full border rounded px-2 py-1"
        required
      />

      <select
        name="busRoute"
        value={form.busRoute}
        onChange={handleChange}
        className="w-full border rounded px-2 py-1"
        required
      >
        <option value="">Select Bus Route</option>
        {busRoutes.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Generate ID Card
      </button>
    </form>
  );
}
