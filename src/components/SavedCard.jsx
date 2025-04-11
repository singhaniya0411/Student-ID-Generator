import { useEffect, useState } from "react";

import IDCardPreview from "./IDCardPreview";

export default function SavedCards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("studentCards")) || [];
    setCards(saved);
  }, []);

  const filterCards = cards.filter((card) => {
    return (
      card.name &&
      card.rollNumber &&
      card.classDivision &&
      card.rackNumber &&
      card.busRoute
    );
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold m-2">Saved ID Cards</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filterCards.map((card, index) => (
          <div key={index} className="bg-white shadow p-4 rounded-xl">
            <IDCardPreview
              data={card}
              template={1}
              studentCards={filterCards}
              setStudentCards={setCards}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
