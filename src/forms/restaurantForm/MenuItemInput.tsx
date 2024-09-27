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
// import { AspectRatio } from "../../components/ui/aspect-ratio";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-row space-x-4">
      <FormField
        control={control}
        name={`extras.${index}.itemName`}
        render={({ field }) => (
          <FormItem className="flex items-center gap-2 w-[30%]">
            <FormLabel>
              Name <FormMessage className="pt-1" />
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

      <div className="flex flex-row items-end space-x-10 ">
        <FormField
          control={control}
          name={`extras.${index}.itemPrice`}
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 w-[50%]">
              <FormLabel className="whitespace-nowrap">
                Price (£) <FormMessage className="pt-1" />
              </FormLabel>
              <FormControl className="pt-1">
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
    </div>
  );
};

export default MenuItemInput;
