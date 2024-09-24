import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Menu } from "../../../types";
import LoadingBtn from "../../../components/LoadingBtn";
import { Button } from "../../../components/ui/button";

const formSchema = z.object({
  menuName: z.string().min(2, {
    message: "Menu title must be at least 2 characters.",
  }),
  menuActive: z.boolean(),
});

type MenuFormData = z.infer<typeof formSchema>;

type Props = {
  menu?: {
    menuName: string;
    menuActive: boolean;
  };
  onSave: (MenuFormData: MenuFormData) => void;
  isLoading: boolean;
};

const MenuForm = ({ onSave, isLoading, menu }: Props) => {
  const menuForm = useForm<MenuFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      menuName: menu?.menuName || "",
      menuActive: menu?.menuActive ?? true,
    },
  });

  const onSubmit = (formDataJson: MenuFormData) => {
    try {
      onSave({ ...formDataJson, _id: menu?._id, restaurantId });
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <Form {...menuForm}>
        <form onSubmit={menuForm.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={menuForm.control}
            name="menuName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Menu Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="CheeseCakes" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={menuForm.control}
            name="menuActive"
            render={({ field }) => (
              <FormItem className="w-[20%]">
                <FormLabel className="whitespace-nowrap">
                  Is this menu active?
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value === "true")} // Convert string to boolean
                    value={field.value ? "true" : "false"} // Convert boolean to string
                  >
                    <SelectTrigger className="w-[180px] bg-white">
                      <SelectValue placeholder="Yes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isLoading ? <LoadingBtn /> : <Button type="submit">Submit</Button>}
        </form>
      </Form>
    </div>
  );
};

export default MenuForm;
