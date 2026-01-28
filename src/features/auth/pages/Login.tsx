import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// import { useAuth } from "../hooks/useAuth" // TODO: adjust to using mocked api
import { authInputSchema, type AuthInputSchemaType } from "../../../api/schemas/auth.schema"
import { Button } from "../../../shared/components/Button"

// type LoginForm = {
//   email: string
//   password: string
// }

export default function Login() {
  // const { login } = useAuth() // TODO: adjust to using mocked api
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInputSchemaType>({
    resolver: zodResolver(authInputSchema)
  })

  function onSubmit() {
    // login() // TODO: adjust to using mocked api
    navigate("/products")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow w-80 space-y-4"
      >
        <h1 className="text-xl font-bold text-center text-primary-200">
          Login
        </h1>

        <div>
          {/* <input
            {...register("email")}
            placeholder="Email"
            className="border p-2 w-full"
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">
              {errors.email.message}
            </p>
          )}
        </div> */}

        <input
            {...register("username")}
            placeholder="Username"
            className="border p-2 w-full"
          />
          {errors.username && (
            <p className="text-sm text-red-600 mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="border p-2 w-full"
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button variant="primary" className="w-full" type="submit">Masuk</Button>
      </form>
    </div>
  )
}
