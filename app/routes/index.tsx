import { Form } from "@remix-run/react";
import AddMeal from "./AddMeal";
import WellnessIndicator from "./WellnessIndicator/Index";

export default function Index() {
  return (
    <Form className="flex justify-center flex-col items-center gap-lg py-sm px-lg">
      <h1 className="flex justify-center align-middle font-pacifico text-5xl text-blue-8">
        Hälsodagboken
      </h1>
      <WellnessIndicator />
      <AddMeal />
    </Form>
  );
}
