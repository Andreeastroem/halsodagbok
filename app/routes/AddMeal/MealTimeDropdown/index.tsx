import DropdownTriangle from "../icons/DropdownTriangle";
import { useSelect } from "downshift";
export function MealTimeDropdown() {
  const options = ["Breakfast", "Brunch", "Lunch", "Dinner", "Snack"];
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
  } = useSelect({ items: options, circularNavigation: true });
  return (
    <div className="flex flex-col bg-red-1 p-2xs rounded-sm items-center text-center">
      <button
        type="button"
        {...getToggleButtonProps()}
        className="w-full flex justify-center"
      >
        <span>{selectedItem || "Mealtime"}</span>
        {/* <DropdownTriangle className={isOpen ? `` : `rotate-180`} /> */}
      </button>
      <ul {...getMenuProps()} className="flex flex-col bg-red-1 gap-2xs w-full">
        {isOpen &&
          options.map((item, idx) => {
            return (
              <li
                {...getItemProps({ item, index: idx })}
                key={`${item}${idx}`}
                className="w-full"
              >
                {item}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
