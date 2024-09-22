import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { categories, react, java, python } from "../Example Data/FAQData";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";
import Answers from "./Answers";

export default function FAQPhone() {
  const [selected, setSelected] = useState(categories[0]);

  const types = {
    React: react,
    Java: java,
    Python: python,
  };

  // Get the data for the selected category
  const selectedData = types[selected.name] ? types[selected.name][0].data : [];

  return (
    <>
      <div className="mx-auto w-52 ">
        <Listbox value={selected} onChange={setSelected}>
          <ListboxButton
            className={clsx(
              "relative block w-full rounded-lg bg-white/20 py-1.5 pr-8 pl-3 text-left text-[20px] text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          >
            {selected.name}
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
              aria-hidden="true"
            />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            transition
            className={clsx(
              "w-[var(--button-width)] rounded-xl border border-black bg-slate-900 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
              "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
            )}
          >
            {categories.map((catgs) => (
              <ListboxOption
                key={catgs.id}
                value={catgs}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
              >
                <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                <div className="text-[20px] text-white">{catgs.name}</div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>

      <div className="w-[90%]">
        <Answers data={selectedData} />{" "}
      </div>
    </>
  );
}
