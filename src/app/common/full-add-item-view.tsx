"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Item } from "@/types/item";
import { addItemHandler } from "@/lib/addItemHandler";
import { UploadButton } from "../utils/uploadthing";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Product name is required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  boughtAt: z.string().min(1, {
    message: "Bought date is required.",
  }),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
  originalPrice: z
    .string()
    .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) >= 0, {
      message: "Original price must be a positive number.",
    })
    .refine((value) => /^\d+(\.\d{1,2})?$/.test(value), {
      message: "Original price can have up to 2 decimal places.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

let newImage = "";

export function AddItemForm() {
  const router = useRouter();
  const form = useForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      boughtAt: "",
      category: "furniture",
      originalPrice: "0",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Raw form data:", data);

    const newItem: Item = {
      id: 0,
      name: data.name,
      description: data.description,
      boughtAt: new Date(data.boughtAt),
      category: data.category,
      originalPrice: Number(data.originalPrice),
      imgurl: newImage,
      userId: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await addItemHandler(newItem);
    router.back();
  };

  return (
    <Form {...form}>
      <style jsx global>{`
        [data-ut-element="allowed-content"] {
          display: none;
        }
      `}</style>
      <form
        className="space-y-4 p-6 bg-zinc-800 rounded-lg max-w-lg w-full max-h-[90vh] overflow-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormDescription>Enter the name of the product.</FormDescription>
              <FormMessage>{errors.name?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter description" {...field} />
              </FormControl>
              <FormDescription>
                Provide a brief description of the product.
              </FormDescription>
              <FormMessage>{errors.description?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="boughtAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bought Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Select bought date"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Specify the date when the product was bought.
              </FormDescription>
              <FormMessage>{errors.boughtAt?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Category</FormLabel>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="hobbies">Hobbies</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            )}
          />
          <FormDescription>
            Select the category of the product.
          </FormDescription>
          <FormMessage>{errors.category?.message}</FormMessage>
        </FormItem>
        <FormField
          control={control}
          name="originalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Original Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter original price"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter the original price of the product.
              </FormDescription>
              <FormMessage>{errors.originalPrice?.message}</FormMessage>
            </FormItem>
          )}
        />
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            const [{ url }] = res;
            newImage = url;

            console.log("Files: ", res);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
        <div className="flex justify-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
