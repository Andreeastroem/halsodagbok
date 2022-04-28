import { useState } from "react";
import AddIcon from "./icons/AddIcon";
import RemoveIcon from "./icons/RemoveIcon";
import { MealContentList } from "./MealContentList";
import { MealTimeDropdown } from "./MealTimeDropdown";

export default function AddMeal() {
  const [active, setActive] = useState(true);
  return (
    <div className="w-full flex justify-center bg-red-4 p-xs rounded-md text-red-8 max-w-lg">
      {active ? (
        <div className="flex justify-between flex-col items-center w-full">
          <div className="flex gap-sm flex-col w-full">
            <MealTimeDropdown />
            <MealContentList />
          </div>
          <RemoveIcon onClick={() => setActive(false)} />
        </div>
      ) : (
        <AddIcon onClick={() => setActive(true)} />
      )}
    </div>
  );
}
