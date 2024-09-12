import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const DetailsSection = () => {
  const { control } = useFormContext();
  return (
    <div className="space-y-5">
      <div className="">
        <h2>Details</h2>
        <FormDescription>Enter your Restaurant details</FormDescription>
      </div>
      <FormField
        control={control}
        name="restaurantName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Restaurant Name</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="restaurantAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex gap-6">
        <FormField
          control={control}
          name="restaurantPinCode"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Pin Code</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="restaurantCity"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="restaurantCountry"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex flex-row gap-6">
        <FormField
          control={control}
          name="deliveryPrice"
          render={({ field }) => (
            <FormItem className="w-[20%]">
              <FormLabel>Delivery Price (£)</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" placeholder="12.40" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="estimatedDeliveryTime"
          render={({ field }) => (
            <FormItem className="w-[20%]">
              <FormLabel>Estimated Delivery Time (minutes)</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" placeholder="30" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex flex-row gap-6">
        <FormField
          control={control}
          name="openingTime"
          render={({ field }) => (
            <FormItem className="w-[20%]">
              <FormLabel>Opening Time</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" placeholder="08:00" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="closingTime"
          render={({ field }) => (
            <FormItem className="w-[20%]">
              <FormLabel>Closing Time</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" placeholder="17:30" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex flex-row gap-6">
        <FormField
          control={control}
          name="isAccepting"
          render={({ field }) => (
            <FormItem className="w-[20%]">
              <FormLabel>Are you accepting orders?</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="Yes" />
                  </SelectTrigger>
                  <SelectContent {...field}>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="status"
          render={({ field }) => (
            <FormItem className="w-[20%]">
              <FormLabel className="whitespace-nowrap">
                Do you want to deactivate your restaurant?
              </FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="w-[180px] bg-white">
                    <SelectValue placeholder="No" />
                  </SelectTrigger>
                  <SelectContent {...field}>
                    <SelectItem value="false">Yes</SelectItem>
                    <SelectItem value="true">No</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default DetailsSection;
