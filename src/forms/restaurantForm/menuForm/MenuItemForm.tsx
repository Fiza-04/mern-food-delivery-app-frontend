import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import z from "zod";
import { useCreateMenuItem } from "../../../api/menuItem.api";
import LoadingBtn from "../../../components/LoadingBtn";
import { Button } from "../../../components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import MenuSection from "../MenuSection";

const menuItemSchema = z.object({
  itemName: z.string().min(1, "Item Name is required"),
  itemDescription: z.string().min(1, "Description is required"),
  itemPrice: z.string().min(0, "Price must be greater than zero"),
  extras: z
    .array(
      z.object({
        name: z.string().min(1, "Extra name is required"),
        price: z.number().min(0, "Extra price must be greater than zero"),
      })
    )
    .optional(),
  menuItemImageUrl: z.string().optional(),
  menuItemImageFile: z.instanceof(File).optional(),
  menuItemActive: z.boolean(),
});

type MenuItemFormData = z.infer<typeof menuItemSchema>;

type Props = {
  isLoading: boolean;
};

const MenuItemForm = ({ isLoading }: Props) => {
  // const existimgMenuItemImageUrl = watch(`menuItemImageFile`);

  const methods = useForm<MenuItemFormData>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      extras: [],
      menuItemActive: true,
    },
  });

  const { createMenuItem } = useCreateMenuItem();

  const onSubmit = async (formDataJson: MenuItemFormData) => {
    try {
      console.log("onsubmitting menuItem data: ", formDataJson);
      const formData = new FormData();

      formData.append("itemName", formDataJson.itemName);
      formData.append("itemDescription", formDataJson.itemDescription);
      formData.append("itemPrice", (formDataJson.itemPrice * 100).toString());
      formData.append("extras", JSON.stringify(formDataJson.extras || []));
      formData.append("menuItemActive", formDataJson.menuItemActive.toString());

      if (formDataJson.menuItemImageFile instanceof File) {
        formData.append("menuItemImageFile", formDataJson.menuItemImageFile);
      } else if (formDataJson.menuItemImageUrl) {
        formData.append("menuItemImageUrl", formDataJson.menuItemImageUrl);
      }

      console.log("before saving the form data => ", formData);
      await createMenuItem(formData);
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormField
          control={methods.control}
          name="itemName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dish Name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="itemDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name="itemPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cost (in &pound;)</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" placeholder="12.40" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <MenuSection />
        <FormField
          control={methods.control}
          name={`menuItemImageFile`}
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
        {methods.watch("menuItemImageUrl") && (
          <div className="h-36 w-48">
            <img
              src={methods.watch("menuItemImageUrl")}
              className="rounded-md object-cover h-full w-full "
            />
          </div>
        )}

        {isLoading ? <LoadingBtn /> : <Button type="submit">Submit</Button>}
      </form>
    </FormProvider>
  );
};

export default MenuItemForm;
