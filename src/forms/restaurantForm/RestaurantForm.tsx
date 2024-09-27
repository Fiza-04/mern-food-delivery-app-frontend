import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../../components/ui/form";
import DetailsSection from "./DetailsSection";
import { Separator } from "../../components/ui/separator";
import CuisinesSection from "./CuisinesSection";
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
    openingTime: z.string({ required_error: "Opening Time is required" }),
    closingTime: z.string({ required_error: "Closing Time is required" }),
    isAcceptingOrders: z.boolean(),
    status: z.boolean(),
    imageUrl: z.string().optional(),
    imageFile: z.union([z.instanceof(File), z.string()]).optional(),
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
      imageFile: undefined,
      isAcceptingOrders: true,
      status: true,
    },
  });

  useEffect(() => {
    if (!restaurant) {
      return;
    }

    const deliveryPriceFormatted = parseFloat(
      (restaurant.deliveryPrice / 100).toFixed(2)
    );

    const upadatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
    };
    console.log("upadatedRestaurant => ", upadatedRestaurant);

    form.reset(upadatedRestaurant);
  }, [form, restaurant]);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    try {
      console.log("onsubmitting form data: ", formDataJson);
      const formData = new FormData();

      formData.append("restaurantName", formDataJson.restaurantName);
      console.log("restaurantNAme => ", formDataJson.restaurantAddress);
      console.log("restaurantNAme formData=> ", formData);
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
      formData.append("openingTime", formDataJson.openingTime.toString());
      formData.append("closingTime", formDataJson.closingTime.toString());
      formData.append(
        "isAcceptingOrders",
        formDataJson.isAcceptingOrders.toString()
      );
      formData.append("status", formDataJson.status.toString());
      formDataJson.cuisines.forEach((cuisine, index) => {
        formData.append(`cuisines[${index}]`, cuisine);
      });

      console.log("restaurantform => ", formData);

      if (formDataJson.imageFile instanceof File) {
        formData.append("imageFile", formDataJson.imageFile);
        console.log("imageFile appended => ", formData);
      } else if (formDataJson.imageUrl) {
        formData.append("imageUrl", formDataJson.imageUrl);
        console.log("imageUrl appended => ", formData);
      }

      console.log("before saving the form data => ", formData);
      onSave(formData);
    } catch (error) {
      console.error("Error in form submission:", error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 bg-slate-50 p-5 rounded-[10px]"
        >
          <DetailsSection />
          <Separator />
          <CuisinesSection />
          <Separator />
          <ImageSection
            imageFieldName="imageFile"
            description="Add your restaurant's image that will be visible to your clients."
          />

          {isLoading ? <LoadingBtn /> : <Button type="submit">Submit</Button>}
        </form>
      </Form>
      <div className="pt-5 text-slate-400 pl-5">
        <p>If you want to delete your restaurant</p>
        <Button className="bg-red-600  hover:bg-red-700 tracking-wide p-5 mt-2">
          Delete
        </Button>
      </div>
    </>
  );
};

export default RestaurantForm;
