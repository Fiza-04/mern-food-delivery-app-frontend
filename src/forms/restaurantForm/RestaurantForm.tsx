import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../../components/ui/form";

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
  menu: z.array(
    z.object({
      categoryName: z.string().min(1, "Category name is required"),
      categoryStatus: z.boolean(),
      menuItems: z.array(
        z.object({
          itemName: z.string().min(1, "Item name is required"),
          itemDescription: z.string().min(8, "Add a description"),
          itemPrice: z.coerce.number().min(1, "Item name is required"),
          menuItemImageFile: z.instanceof(File, {
            message: "Image is required",
          }),
        })
      ),
    })
  ),
  imageFile: z.instanceof(File, { message: "Image is required" }),
  isAcceptingOrders: z.boolean(),
});

type restaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const RestaurantForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<restaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menu: [
        {
          categoryName: "",
          categoryStatus: true,
          menuItems: [
            {
              itemName: "",
              itemDescription: "",
              itemPrice: 0,
            },
          ],
        },
      ],
    },
  });

  const onSubmit = (formDataJson: restaurantFormData) => {
    console.log(formDataJson);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}></form>
    </Form>
  );
};

export default RestaurantForm;
