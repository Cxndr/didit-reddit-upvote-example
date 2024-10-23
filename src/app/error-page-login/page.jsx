import { LoginButton } from "@/components/LoginButton"

export default function ErrorPageLogin() {


  return (
    <div className="flex flex-col gap-8 absolute left-1/2 -translate-x-1/2 top-1/4 justify-center items-center p-8">
      <p>You must be logged in to vote.</p>
      <LoginButton />
    </div>
  )
}