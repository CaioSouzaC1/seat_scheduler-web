import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { UseFormReturn } from "react-hook-form";

export default function LogoForm({
  form,
  imageFile,
  setImageFile,
}: {
  form: UseFormReturn<any>;
  imageFile: File | null;
  setImageFile: Dispatch<SetStateAction<File | null>>;
}) {
  const [dragging, setDragging] = useState(false);

  const previewURL = useMemo(() => {
    if (!imageFile) {
      return null;
    }

    return URL.createObjectURL(imageFile);
  }, [imageFile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      form.setValue("image", file);
      setImageFile(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      console.log(file instanceof File);
      form.setValue("image", file);
      setImageFile(file);
      console.log(form.getValues("image"));
    }
  };

  return (
    <>
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem className="mb-4">
            {previewURL ? (
              <div className="relative">
                <Image
                  src={previewURL}
                  width={600}
                  height={400}
                  alt="Preview da Imagem"
                  className="h-36 w-full object-cover"
                />
                <Button
                  onClick={() => {
                    setImageFile(null);
                    form.resetField("image");
                  }}
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2">
                  <Trash2 />
                </Button>
              </div>
            ) : (
              <label
                htmlFor="image"
                className={`relative flex aspect-video h-36 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed text-xs text-muted-foreground transition-all hover:bg-primary/5 ${
                  dragging ? "bg-primary/5 border-dotted" : ""
                }`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}>
                {dragging
                  ? "Solte aqui"
                  : "Arraste e solte aqui ou clique para selecionar uma imagem"}
                <Upload className="w-4" />
              </label>
            )}

            <input
              accept="image/*"
              id="image"
              {...form.register("image")}
              type="file"
              onChange={handleImageChange}
              className="sr-only"
            />

            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
