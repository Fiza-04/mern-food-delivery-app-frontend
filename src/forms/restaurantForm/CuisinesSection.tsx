import { useFormContext } from "react-hook-form";
import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { cuisineList } from "../../config/restaurantOptions.config";
import CuisineCheckBox from "./CuisineCheckBox";

const CuisinesSection = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-3">
      <div>
        <h2 className="font-bold text-[20px]">Cuisines</h2>
        <FormDescription>
          Select cuisines you serve at your restaurant
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className="grid sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-1">
              {cuisineList.map((item) => (
                <CuisineCheckBox cuisine={item} field={field} key={item} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CuisinesSection;
