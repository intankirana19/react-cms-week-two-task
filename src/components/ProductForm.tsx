import { useForm } from "react-hook-form"
import { useProducts } from "../hooks/useProducts"

type ProductFormValues = {
  name: string
  price: number
}

export default function ProductForm() {
  const { addProduct } = useProducts()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>()

  function onSubmit(data: ProductFormValues) {
    addProduct({
      name: data.name,
      price: Number(data.price),
    })
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Product name"
          className="border p-2 w-full"
        />
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <input
          type="number"
          {...register("price", { required: "Price is required" })}
          placeholder="Price"
          className="border p-2 w-full"
        />
        {errors.price && (
          <p className="text-sm text-red-600 mt-1">
            {errors.price.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-[#7B1E3A] text-white px-4 py-2 rounded hover:bg-[#9B2C4A]"
      >
        Tambah Produk
      </button>
    </form>
  )
}
