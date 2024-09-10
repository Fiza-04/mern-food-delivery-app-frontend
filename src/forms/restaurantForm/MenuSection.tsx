import { useFieldArray, useFormContext } from "react-hook-form";
import { FormDescription, FormField, FormItem } from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });

  return (
    <div className="space-y-2">
      <div>
        <h2 className="font-bold">Menu</h2>
        <FormDescription>Create your Menu</FormDescription>
      </div>
      <FormField
        control={control}
        name="menuItems"
        render={() => (
          <FormItem className="flex flex-col gap-2 pb-5">
            {fields.map((_, index) => (
              <MenuItemInput
                index={index}
                removeMenuItem={() => remove(index)}
              />
            ))}
          </FormItem>
        )}
      />
      <Button
        type="button"
        onClick={() => append({ name: "", price: "", image: "" })}
        className="bg-green-600 hover:bg-green-700 mt-10"
      >
        Add a Menu Item
      </Button>
    </div>
  );
};

export default MenuSection;
