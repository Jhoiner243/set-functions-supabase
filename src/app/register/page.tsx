/* eslint-disable react/react-in-jsx-scope */
import { GalleryVerticalEnd } from "lucide-react"
import { RegisterForm } from "../../page/user/components/register/register-form"
import { UserContextProvider } from "../../page/user/context/user.context"

export default function RegisterPage() {
  return (
    <UserContextProvider>
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/repartir.jpg"
          width={400}
          height={400}
          className="absolute rounded-3xl inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
    </UserContextProvider>
  )
}
