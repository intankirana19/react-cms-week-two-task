// import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// import { useAuth } from "../hooks/useAuth"
import { authInputSchema, type AuthInputSchemaType } from "../../../api/schemas/auth.schema"
import { Button } from "../../../shared/components/Button"
import { useLogin } from "../hooks/useLogin"
// import { AlertCircle } from "lucide-react"

// type LoginForm = {
//   email: string
//   password: string
// }

export default function Login() {
  // const { login } = useAuth()
  // const navigate = useNavigate()
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<AuthInputSchemaType>({
    resolver: zodResolver(authInputSchema)
  })

  function onSubmit() {
    // login()
    //  navigate("/products")
    loginMutation.mutate({
      username: getValues("username"),
      password: getValues("password"),
    });
  }

  const serverError = loginMutation.error ? 'Invalid username or password' : '';

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
            disabled={loginMutation.isPending}
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
            disabled={loginMutation.isPending}
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {serverError && (
          // <div className="mb-6 p-4 bg-danger-50 border border-ait-danger-200 rounded-lg flex items-start gap-3">
          //   <AlertCircle className="w-5 h-5 text-danger-600 flex-shrink-0 mt-0.5" />
            <p className="text-danger-700">{serverError}</p>
          // </div>
        )}

        <Button variant="primary" className="w-full" type="submit">Masuk</Button>
      </form>
    </div>
  )
}
