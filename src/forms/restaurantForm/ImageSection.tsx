import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { AspectRatio } from "../../components/ui/aspect-ratio";
import React, { useState } from "react";

type Props = {
  imageFieldName: string; // Field name to bind to the form
  description: string; // Description for the image upload section
};

const ImageSection = ({ imageFieldName, description }: Props) => {
  const { control, watch } = useFormContext();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const existingImageUrl = watch(imageFieldName); // Watch for changes in the specified field

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <div className="space-y-7 pb-3">
      <div>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>{description}</FormDescription>
      </div>
      <div className="flex flex-col gap-8 w-[50%]">
        {imagePreview || existingImageUrl ? (
          <AspectRatio ratio={20 / 7}>
            <img
              src={imagePreview || existingImageUrl}
              className="rounded-md object-cover h-full w-full"
              alt="Preview"
            />
          </AspectRatio>
        ) : (
          <AspectRatio ratio={20 / 7}>
            <div className="rounded-md object-cover h-full w-full bg-gray-200 flex items-center justify-center">
              No image selected
            </div>
          </AspectRatio>
        )}
        <FormField
          control={control}
          name={imageFieldName} // Use dynamic field name
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-white"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => {
                    handleImageChange(e);
                    field.onChange(e.target.files ? e.target.files[0] : null);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ImageSection;
