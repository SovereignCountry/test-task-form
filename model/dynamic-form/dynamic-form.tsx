"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FormField } from "@/types/form-fields";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { formFields } from "@/constants/form-fields";

export default function DynamicForm({
  dynamicFormFields,
}: {
  dynamicFormFields: FormField[];
}) {
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());
    setFormValues(values);
  };

  const renderField = (field: FormField, index: number) => {
    const {
      type,

      default_value,
      options,
      value,
      min_value,
      max_value,
      validation,
    } = field;
    const fieldName = `field-${index}`;
    if (typeof value === "boolean" || typeof default_value === "boolean") {
      return (
        <input
          name={fieldName}
          key={fieldName}
          type="checkbox"
          defaultChecked={(value as boolean) || (default_value as boolean)}
        />
      );
    }
    switch (type) {
      case "text":
        return (
          <Input
            name={fieldName}
            key={fieldName}
            type="text"
            defaultValue={(value as string) || (default_value as string)}
            pattern={validation}
            title={
              validation
                ? `Invalid format, need to be ${validation}`
                : undefined
            }
          />
        );
      case "longtext":
        return (
          <Input
            className="h-[100px]"
            title={validation ? "Invalid format" : undefined}
            pattern={validation}
            defaultValue={(value as string) || (default_value as string)}
            name={fieldName}
            key={fieldName}
          />
        );
      case "dropdown":
        return (
          <Select key={fieldName} name={fieldName}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option, idx) => (
                <SelectItem key={idx} value={option as string}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "number":
        return (
          <Input
            name={fieldName}
            key={fieldName}
            type="number"
            defaultValue={(value as number) || (default_value as number)}
            min={min_value}
            max={max_value}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-8 items-center w-full mt-[160px]">
      <Card className="w-[400px]  ">
        <form className="" onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Dynamic Form for test task</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 items-start">
            {dynamicFormFields.map(renderField)}
          </CardContent>

          <CardFooter>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Card>

      {Object.keys(formValues).length > 0 && (
        <Card className="w-full p-4">
          <pre>{JSON.stringify(formValues, null, 2)}</pre>
        </Card>
      )}
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className=" text-black">
            Show data
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <pre>{JSON.stringify(formFields, null, 2)}</pre>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
