import { Radio, RadioGroup } from "@headlessui/react";
import { useState } from "react";
import {
  categories, general, maintainers, contributors, technical, tokenomics
} from "../ExampleData/FAQData";
import Answers from "./Answers";

export default function FAQPc() {
  // Setting selected to the first category's ID for consistency
  const [selected, setSelected] = useState(categories[0]);

  const types = {
    General: general,
    Enterprises: maintainers,
    Contributors: contributors,
    Technical: technical,
    Tokenomics: tokenomics
  };

  // Get the data for the selected category
  const selectedData = types[selected.name] ? types[selected.name][0].data : [];

  return (
    <div className="w-full px-4">
      <div className="flex flex-row justify-center">
        <div className="categories p-2  bg-gradient-to-t from-transparent to-slate-900 h-max rounded-lg">
          <h2 className="font-semibold pb-2">Select Category</h2>
          <RadioGroup
            by="id"
            value={selected}
            onChange={setSelected}
            className="space-y-2"
          >
            {categories.map((plan) => (
              <Radio
                key={plan.id}
                value={plan} // Ensure consistent usage of "id" for the value
                className="group relative w-[200px] flex cursor-pointer rounded-lg py-2 px-2 text-white shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/5"
              >
                <div className="flex w-full items-center justify-between">
                  <div className="text-lg">
                    <p className="font-semibold text-white">{plan.name}</p>
                  </div>
                </div>
              </Radio>
            ))}
          </RadioGroup>
        </div>

        <div className="md:w-[60%] max-w-[1000px] mx-5">
          <Answers data={selectedData} />{" "}
        </div>
      </div>
    </div>
  );
}
