import DynamicForm from "@/model/dynamic-form/dynamic-form";

async function fetchFormFields() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/get-form-interfaces`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data;
}

export default async function Home() {
  const formFields = await fetchFormFields();
  console.log(formFields);
  return (
    <div className="flex items-center justify-center flex-col min-h-screen w-screen">
      <DynamicForm dynamicFormFields={formFields} />
    </div>
  );
}
