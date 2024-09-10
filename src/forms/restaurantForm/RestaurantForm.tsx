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
import { Restaurant } from "../../types";
import { useEffect } from "react";

const formSchema = z
  .object({
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
        menuItemImageFile: z
          .union([
            z.instanceof(File, { message: "Image is required" }),
            z.string(),
          ])
          .optional(),
        menuItemImageUrl: z.string().optional(),
      })
      //   ),
      // })
    ),
    imageUrl: z.string().optional(),
    imageFile: z
      .union([z.instanceof(File, { message: "Image is required" }), z.string()])
      .optional(),
    isAcceptingOrders: z.boolean(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  restaurant?: Restaurant;
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const RestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
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

  useEffect(() => {
    if (!restaurant) {
      return;
    }

    const deliveryPriceFormatted = parseFloat(
      (restaurant.deliveryPrice / 100).toFixed(2)
    );
    const menuItemsFormatted = restaurant.menuItems.map((item) => ({
      ...item,
      itemPrice: parseFloat((parseFloat(item.itemPrice) / 100).toFixed(2)),
      menuItemImageFile: item.menuItemImageFile || "",
    }));

    const upadatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };
    console.log("upadatedRestaurant => ", upadatedRestaurant);

    form.reset(upadatedRestaurant);
  }, [form, restaurant]);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    try {
      console.log("onsubmitting form data: ", formDataJson);
      const formData = new FormData();

      formData.append("restaurantName", formDataJson.restaurantName);
      console.log("restaurantNAme => ", formDataJson.restaurantName);
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
          (menuItem.itemPrice * 100).toString()
        );
        if (menuItem.menuItemImageFile) {
          formData.append(`menuItemImageFile`, menuItem.menuItemImageFile);
        }
      });
      console.log("restaurantform => ", formData);

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
