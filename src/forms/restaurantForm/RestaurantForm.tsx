import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../../components/ui/form";
import DetailsSection from "./DetailsSection";
import { Separator } from "../../components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingBtn from "../../components/LoadingBtn";
import { Button } from "../../components/ui/button";

const formSchema = z.object({
  restaurantName: z.string({
    required_error: "Your Restaurant's Name is required",
  }),
  restaurantAddress: z.string({
    required_error: "Your Restaurant's Address is required",
  }),
  restaurantPinCode: z.string({ required_error: "Enter valid Pin Code" }),
  restaurantCity: z.string({ required_error: "City is required" }),
  restaurantCountry: z.string({ required_error: "Country is required" }),
  deliveryPrice: z.coerce.number({
    required_error: "Delivery Price is required",
    invalid_type_error: "Must be a valid number",
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "Delivery Time Duration is required",
    invalid_type_error: "Must be a valid number",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "Please select atleast one item",
  }),
  // menu: z.array(
  //   z.object({
  //     categoryName: z.string().min(1, "Category name is required"),
  //     categoryStatus: z.boolean(),
  menuItems: z.array(
    z.object({
      itemName: z.string().min(1, "Item name is required"),
      itemDescription: z.string().min(8, "Add a description"),
      itemPrice: z.coerce.number().min(1, "Item name is required"),
      menuItemImageFile: z.instanceof(File, {
        message: "Image is required",
      }),
    })
    //   ),
    // })
  ),
  imageFile: z.instanceof(File, { message: "Image is required" }),
  isAcceptingOrders: z.boolean(),
});

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const RestaurantForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      // menu: [
      //   {
      //     categoryName: "",
      //     categoryStatus: true,
      menuItems: [
        {
          itemName: "",
          itemDescription: "",
          itemPrice: 0,
          menuItemImageFile: undefined,
        },
      ],
      imageFile: undefined,
      isAcceptingOrders: true,
      // },
      // ],
    },
  });

  const onSubmit = (formDataJson: RestaurantFormData) => {
    try {
      console.log("onsubmitting form data: ", formDataJson);
      const formData = new FormData();

      formData.append("restaurantName", formDataJson.restaurantName);
      console.log("restaurantNAme => ", formData);
      formData.append("restaurantAddress", formDataJson.restaurantAddress);
      formData.append("restaurantPinCode", formDataJson.restaurantPinCode);
      formData.append("restaurantCity", formDataJson.restaurantCity);
      formData.append("restaurantCountry", formDataJson.restaurantCountry);
      formData.append(
        "deliveryPrice",
        (formDataJson.deliveryPrice * 100).toString()
      );
      formData.append(
        "estimatedDeliveryTime",
        formDataJson.estimatedDeliveryTime.toString()
      );
      formDataJson.cuisines.forEach((cuisine, index) => {
        formData.append(`cuisines[${index}]`, cuisine);
      });
      formDataJson.menuItems.forEach((menuItem, index) => {
        formData.append(`menuItems[${index}][itemName]`, menuItem.itemName);
        formData.append(
          `menuItems[${index}][itemDescription]`,
          menuItem.itemDescription
        );
        formData.append(
          `menuItems[${index}][itemPrice]`,
          menuItem.itemPrice.toString()
        );
        if (menuItem.menuItemImageFile) {
          formData.append(`menuItemImageFile`, menuItem.menuItemImageFile);
        }
      });

      if (formDataJson.imageFile) {
        formData.append("imageFile", formDataJson.imageFile);
      }

      console.log("before saving the form data => ", formData);
      onSave(formData);
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 bg-slate-50 p-5 rounded-[10px]"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingBtn /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default RestaurantForm;
