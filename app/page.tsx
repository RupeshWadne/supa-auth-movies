import AuthForm from './auth-form'

export default function Home() {
  return (
    <div className="flex flex-col relative">
      <div className="flex flex-col justify-center items-center mt-44">
        <h1 className="">Supabase Auth For Movies Data</h1>
      </div>
      <div className="mt-16">
        <AuthForm />
      </div>
    </div>
  )
}