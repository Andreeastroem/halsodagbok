import { useState } from "react";

import type { State } from "xstate";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import AddIcon from "../icons/AddIcon";

import { useCombobox } from "downshift";

const inputToggleMachine = createMachine({
  id: "input-toggle",
  initial: "button",
  states: {
    button: {
      on: { TOGGLE: "input" },
    },
    input: {
      on: { TOGGLE: "button" },
    },
  },
});

export function MealContentList() {
  const [meals, setMeals] = useState<Array<string>>(["majonnaise", "Sandwich"]);
  return (
    <div className="flex gap-sm items-center flex-wrap">
      {meals.map((meal, idx) => {
        return <MealContent key={`${meal}${idx}`} meal={meal} />;
      })}
      <AddMealContent meals={meals} addMealContent={setMeals} />
    </div>
  );
}

export function MealContent({ meal }: { meal: string }) {
  return (
    <div className="px-sm py-xs bg-red-2 w-fit rounded-sm capitalize ">
      {meal}
    </div>
  );
}

export function AddMealContent({
  meals,
  addMealContent,
}: {
  meals: Array<string>;
  addMealContent: (meal: Array<string>) => void;
}) {
  const [state, send] = useMachine(inputToggleMachine);
  return (
    <div>
      {state.matches("button") ? (
        <div
          className="w-30 h-30 text-red-8 bg-red-2 rounded-sm flex justify-center items-center"
          onClick={() => send("TOGGLE")}
        >
          <AddIcon strokeWidth={2} width={16} height={16} />
        </div>
      ) : (
        <MealContentCombobox
          items={meals}
          setItems={addMealContent}
          toggle={() => {
            send("TOGGLE");
          }}
        />
      )}
    </div>
  );
}

export function MealContentCombobox({
  items,
  setItems,
  toggle,
}: {
  items: Array<string>;
  setItems: (item: Array<string>) => void;
  toggle: () => void;
}) {
  const [comboboxItems, setComboboxItems] = useState(items);
  const {
    isOpen,
    selectedItem,
    getComboboxProps,
    getInputProps,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items: comboboxItems,
    onInputValueChange: ({ inputValue }) => {
      const filteredItems = items.filter((item) => {
        return stringHasAllChars(item, inputValue);
      });
      setComboboxItems(filteredItems);
    },
  });

  return (
    <div
      className="relative"
      onBlur={() => {
        toggle();
        console.log("on blur toggle");
      }}
    >
      <div
        {...getComboboxProps({
          onSubmit: () => {
            console.log("submit");
          },
        })}
      >
        <input
          {...getInputProps({
            // onKeyUp: (e) => {
            //   if (e.key === "Enter") {
            //     // setItems([...items, e.currentTarget.value]);
            //     console.log(e.currentTarget.value);
            //   }
            // },
          })}
          onKeyDown={() => {}}
          onSubmit={(e) => {
            //   setItems([...items, e.currentTarget.value]);
            console.log("submit");
            console.log(e.currentTarget.value);
          }}
          className={`bg-red-2 px-sm py-xs rounded-sm ${
            isOpen && `rounded-bl-none rounded-br-none `
          }`}
        />
        <button
          {...getToggleButtonProps()}
          type="button"
          aria-label="toggle menu"
        ></button>
      </div>
      <ul
        {...getMenuProps()}
        className={`bg-red-2 absolute left-0 right-0 ${
          isOpen &&
          "px-sm py-xs rounded-bl-sm rounded-br-sm border-t border-t-blue-10"
        }`}
      >
        {isOpen &&
          comboboxItems.map((item, idx) => {
            return (
              <li
                {...getItemProps({ item, index: idx })}
                key={`${item}${idx}`}
                className={`capitalize ${
                  idx === highlightedIndex ? "text-red-5" : ""
                }`}
              >
                {item}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

function stringHasAllChars(string: string, chars: string | undefined) {
  //Early out
  if (!chars) return true;

  const lowerCasedString = string.toLowerCase();
  const charArray = chars.toLowerCase().split("");

  const isFound = charArray.reduce((acc, char) => {
    if (!acc) return acc;
    const charIndex = lowerCasedString.indexOf(char);
    acc = charIndex >= 0 ? true : false;
    return acc;
  }, true);

  return isFound;
}
