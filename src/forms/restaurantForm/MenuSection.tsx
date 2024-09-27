import { useFieldArray, useFormContext } from "react-hook-form";
import { FormField, FormItem } from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "extras",
  });

  console.log("Current fields in MenuSection:", fields);

  return (
    <div className="space-y-2">
      <FormField
        control={control}
        name="extras"
        render={() => (
          <FormItem className="flex flex-col gap-2 pb-5">
            {fields.map((_, index) => (
              <MenuItemInput
                key={index}
                index={index}
                removeMenuItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />
      <Button
        type="button"
        onClick={() => append({ name: "", price: 0 })}
        className="bg-green-600 hover:bg-green-700 mt-10"
      >
        Add a extras
      </Button>
    </div>
  );
};

export default MenuSection;
