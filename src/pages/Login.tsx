import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useForm } from "react-hook-form"

type LoginForm = {
  email: string
  password: string
}

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()

  function onSubmit() {
    login()
    navigate("/products")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow w-80 space-y-4"
      >
        <h1 className="text-xl font-bold text-center text-[#7B1E3A]">
          Login
        </h1>

        <div>
          <input
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
            className="border p-2 w-full"
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
            className="border p-2 w-full"
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-[#7B1E3A] text-white w-full py-2 rounded hover:bg-[#9B2C4A] cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  )
}
