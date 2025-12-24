import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useProducts } from "../hooks/useProducts"

type FormValues = {
  name: string
  price: number
}

export default function ProductFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, addProduct, updateProduct } = useProducts()

  const editingProduct = products.find(
    (p) => p.id === Number(id)
  )

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: editingProduct ?? {
      name: "",
      price: 0,
    },
  })

  function onSubmit(data: FormValues) {
    if (editingProduct) {
      updateProduct(editingProduct.id, data)
    } else {
      addProduct(data)
    }

    navigate("/products")
  }

  return (
    <div className="flex justify-center mt-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow w-full max-w-md"
      >
        <h1 className="text-xl font-bold mb-4">
          {editingProduct ? "Ubah Produk" : "Tambah Produk"}
        </h1>

        <input
          {...register("name", { required: true })}
          placeholder="Nama Produk"
          className="border p-2 w-full mb-3"
        />

        <input
          type="number"
          {...register("price", { required: true })}
          placeholder="Harga"
          className="border p-2 w-full mb-4"
        />

        <button className="bg-[#7B1E3A] text-white px-4 py-2 rounded w-full">
          Save
        </button>
      </form>
    </div>
  )
}
