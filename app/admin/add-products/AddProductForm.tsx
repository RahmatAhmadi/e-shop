"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/Inputs/CategoryInput";
import CustomCheckbox from "@/app/components/Inputs/CustomCheckbox";
import Input from "@/app/components/Inputs/Input";
import SelectedColor from "@/app/components/Inputs/SelectedColor";
import Textarea from "@/app/components/Inputs/Textarea";
import firebaseApp from "@/libs/firebase";
import { categories } from "@/utils/Categories";
import { colors } from "@/utils/colors";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";
import { useRouter } from "next/navigation";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>();
  const [isProductCreated, setIsProductCreated] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      inStock: false,
      images: [],
    },
  });

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Product data: ", data);
    // Upload images to db
    // Save product to mongodb
    let uploadedImages: UploadedImageType[] = [];

    if (!data.category) {
      setIsLoading(false);
      return toast.error("Cagetory is not selected!");
    }

    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error("No selected image!");
    }

    const handleImageuploads = async () => {
      toast("Creating product, please wait...");
      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + "-" + item.image.name;
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);

            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log("Upload is " + progress.toFixed(0) + "% done");
                  switch (snapshot.state) {
                    case "paused":
                      console.log("Upload is paused");
                      break;
                    case "running":
                      console.log("Upload is running");
                      break;
                  }
                },
                (error) => {
                  console.log("Error uploading image", error);
                  reject(error);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL,
                      });
                      console.log("File available at", downloadURL);
                      resolve();
                    })
                    .catch((error) => {
                      console.log("Error getting the download URL", error);
                      reject(error);
                    });
                }
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        console.log("Error handling image uploads", error);
        return toast.error("Error handling image uploads");
      }
    };

    await handleImageuploads();
    const productData = { ...data, images: uploadedImages };
    console.log("Product data:", productData);

    axios
      .post("/api/product", productData)
      .then(() => {
        toast.success("Product created.");
        setIsProductCreated(true);
        router.refresh();
      })
      .catch((error) => {
        toast.error(
          "Something went wrong when saving the product to database!"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const category = watch("category");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }

      return [...prev, value];
    });
  }, []);

  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );

        return filteredImages;
      }

      return prev;
    });
  }, []);

  return (
    <>
      <Heading title="Add a product" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="number"
        required
      />
      <Input
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Textarea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckbox
        id="inStock"
        register={register}
        label="This product is in stock"
      />
      <div className="w-full font-medium">
        <h2 className="mb-3 font-semibold">Select a category</h2>
        <div
          className="
        grid
        grid-cols-2
        md:grid-cols-3
        max:h-[50vh]
        gap-3
        overflow-y-auto
        "
        >
          {categories.map((item) => {
            if (item.label === "All") return null;

            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="
      w-full
      flex
      flex-col
      flex-wrap
      gap-4
      "
      >
        <div>
          <p className="font-bold">
            Selected the available product colors and upload their images.
          </p>
          <p className="text-sm">
            You must upload an image for each of the color selected otherwise
            your color selection will be ignored.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {colors.map((item, index) => {
            return (
              <SelectedColor
                key={index}
                item={item}
                addImageToState={addImageToState}
                removeImageFromState={removeImageFromState}
                isProductCreated={isProductCreated}
              />
            );
          })}
        </div>
      </div>
      <Button
        label={isLoading ? "Loading..." : "Add product"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddProductForm;
