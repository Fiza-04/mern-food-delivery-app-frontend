import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-row items-end space-x-5">
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem className="flex items-center gap-2 w-[25%]">
            <FormLabel>
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Waffle Bytes"
                className="bg-white w-[100%]"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem className="flex items-center gap-2 w-[25%]">
            <FormLabel className="whitespace-nowrap">
              Price (£) <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="13.20" className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        type="button"
        onClick={removeMenuItem}
        className="bg-red-600 max-h-fit font-normal"
      >
        Remove
      </Button>
    </div>
  );
};

export default MenuItemInput;
