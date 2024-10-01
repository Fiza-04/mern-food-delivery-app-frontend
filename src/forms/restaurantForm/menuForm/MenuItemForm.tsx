import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import LoadingBtn from "../../../components/LoadingBtn";
import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import MenuSection from "../MenuSection";
import ImageSection from "../ImageSection";
import { useParams } from "react-router-dom";
import { MenuItem } from "../../../types";
import { useEffect } from "react";

const menuItemSchema = z
  .object({
    itemName: z.string().min(1, "Item Name is required"),
    itemDescription: z.string().min(1, "Description is required"),
    itemPrice: z.coerce.number({
      required_error: "Price is required",
      invalid_type_error: "Must be a valid number",
    }),
    extras: z
      .array(
        z.object({
          name: z.string().min(1, "Extra name is required"),
          price: z.coerce.number({
            required_error: "Price is required",
            invalid_type_error: "Must be a valid number",
          }),
        })
      )
      .optional(),
    menuItemImageUrl: z.string().optional(),
    menuItemImageFile: z.union([z.instanceof(File), z.string()]).optional(),
    menuItemActive: z.boolean(),
  })
  .refine((data) => data.menuItemImageUrl || data.menuItemImageFile, {
    message: "Either image URL or image File must be provided",
    path: ["menuItemImageFile"],
  });

type MenuItemFormData = z.infer<typeof menuItemSchema>;

type Props = {
  onSave: (formData: FormData, menuItemId?: string) => void;
  isLoading: boolean;
  data?: MenuItem | null;
};

const MenuItemForm = ({ onSave, isLoading, data }: Props) => {
  const form = useForm<MenuItemFormData>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      extras: [],
      menuItemImageFile: undefined,
      menuItemActive: true,
    },
  });

  const menuId = useParams<{ menuId: string }>();

  const onSubmit = (formDataJson: MenuItemFormData) => {
    const formData = new FormData();
    formData.append("itemName", formDataJson.itemName);
    formData.append("itemDescription", formDataJson.itemDescription);
    formData.append("itemPrice", formDataJson.itemPrice.toString());
    formData.append("extras", JSON.stringify(formDataJson.extras || []));
    formData.append("menuItemActive", formDataJson.menuItemActive.toString());

    if (formDataJson.menuItemImageFile instanceof File) {
      formData.append("menuItemImageFile", formDataJson.menuItemImageFile);
    } else if (formDataJson.menuItemImageUrl) {
      formData.append("menuItemImageUrl", formDataJson.menuItemImageUrl);
    }

    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }

    formData.append("menuId", menuId.menuId || "");

    if (data?._id) {
      console.log(data?._id);
      // If editing an existing item, send the ID
      formData.append("menuItemId", data._id);
      // Call the onSave function with the formData and ID
      onSave(formData, data._id);
    } else {
      console.log("here");
      // If creating a new item, just call onSave with the formData
      onSave(formData);
    }
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    const updatedMenuItem = {
      ...data,
      itemPrice: parseFloat(data.itemPrice),
      extras: data.extras?.map((extra) => ({
        ...extra,
        price: parseFloat(extra.price),
      })),
    };
    console.log("updatedMenuItem => ", updatedMenuItem);

    form.reset(updatedMenuItem);
  }, [form, data]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
        <ImageSection
          imageFieldName="menuItemImageFile"
          description="Add your dish's image that will be visible to your clients."
        />
        {isLoading ? <LoadingBtn /> : <Button type="submit">Submit</Button>}
        <FormMessage>{form.formState.errors.itemName?.message}</FormMessage>
      </form>
    </Form>
  );
};

export default MenuItemForm;
