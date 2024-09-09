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
    <div className="space-y-4">
      <div className="flex flex-row items-end space-x-10 ">
        <FormField
          control={control}
          name={`menuItems.${index}.itemName`}
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
        <FormField
          control={control}
          name={`menuItems.${index}.itemDescription`}
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 w-[60%]">
              <FormLabel className="whitespace-nowrap">
                Desicription <FormMessage className="pt-1" />
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Waffles, Milk Chocolate, Strawberry"
                  className="bg-white"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div className="flex flex-row items-end space-x-10 ">
        <FormField
          control={control}
          name={`menuItems.${index}.itemPrice`}
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 w-[25%]">
              <FormLabel className="whitespace-nowrap">
                Price (£) <FormMessage className="pt-1" />
              </FormLabel>
              <FormControl className="pt-1">
                <Input {...field} placeholder="13.20" className="bg-white" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`menuItems.${index}.menuItemImageFile`} // detects file path only when kept like this
          render={({ field }) => (
            <FormItem className="flex items-center gap-2 w-[30%]">
              <FormLabel className="whitespace-nowrap">
                Image (max 5mb) <FormMessage className="pt-1" />
              </FormLabel>
              <FormControl>
                <Input
                  className="bg-white"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={
                    (e) =>
                      field.onChange(e.target.files ? e.target.files[0] : null) // Properly set the file
                  }
                />
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
