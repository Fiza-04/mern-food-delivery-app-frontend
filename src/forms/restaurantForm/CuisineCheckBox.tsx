import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormControl, FormItem, FormLabel } from "../../components/ui/form";
import { Checkbox } from "../../components/ui/checkbox";

type Props = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
};

const CuisineCheckBox = ({ cuisine, field }: Props) => {
  return (
    <FormItem className="flex flex-row items-center space-x-2 mt-1">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(cuisine)}
          onCheckedChange={(checked) => {
            {
              if (checked) {
                field.onChange([...field.value, cuisine]);
              } else {
                field.onChange(
                  field.value.filter((value: string) => value != cuisine)
                );
              }
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal pb-2">{cuisine}</FormLabel>
    </FormItem>
  );
};

export default CuisineCheckBox;
