import { productInputSchema, type ProductInputSchemaType, type ProductSchemaType } from "../../../api/schemas/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dialog, DialogBody, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../../shared/components/Dialog";
import { Button } from "../../../shared/components/Button";
import { useEffect } from "react";

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: ProductSchemaType | null;
  onSubmit: (id: string | null, input: ProductInputSchemaType) => void;
}

export function ProductFormDialog({ open, onOpenChange, product, onSubmit }: Readonly<ProductFormDialogProps>) {
  const { register, handleSubmit,reset, formState: { errors }  } = useForm<ProductInputSchemaType>({
    resolver: zodResolver(productInputSchema),
    defaultValues: {
      name: "",
      price: "",
    },
  })

  useEffect(() => {
  if (product) {
    reset({
      name: product.name,
      price: product.price,
    })
  } else {
    reset({
      name: "",
      price: "",
    })
  }
}, [product, reset])

  const handleCancel = () => {
    onOpenChange(false)
  };

  const handleFormSubmit = (data: ProductInputSchemaType) => {
    onSubmit(product?.id ?? null, data)
    onOpenChange(false)
  }

  return(
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="md">
        <DialogHeader>
          <DialogTitle>{product ? "Ubah" : "Tambah"} Produk</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogBody className="space-y-4">
                    <input
                      {...register("name")}
                      placeholder="Nama Produk"
                      className="border p-2 w-full"
                    />
                    {errors.name && 
                        <p className="text-sm text-red-600 mt-1">
                          {errors.name.message}
                        </p>
                    }

                    <input
                      {...register("price")}
                      type="number"
                      step="any"
                      inputMode="decimal"
                      placeholder="Harga"
                      className="border p-2 w-full mt-3"
                    />
                    {errors.price && 
                      <p className="text-sm text-red-600 mt-1">
                        {errors.price.message}
                      </p>
                    }
          </DialogBody>

          <DialogFooter>
            <Button variant="tertiary" onClick={handleCancel}>Batal</Button>
            <Button variant="secondary" type="submit">Simpan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}