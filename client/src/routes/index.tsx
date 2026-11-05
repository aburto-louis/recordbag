import { createFileRoute, redirect } from "@tanstack/react-router"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "@/components/form/login-form"
import { safeInternalHref } from "@/lib/href"

const FALLBACK = "/albums"

export const Route = createFileRoute("/")({
  validateSearch: (search) => ({
    redirect: safeInternalHref(search.redirect, FALLBACK),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.user) {
      throw redirect({ href: search.redirect, replace: true })
    }
  },
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center p-2">
      <Card className="w-80 h-96">
        <CardHeader>
          <CardTitle>Record Bag</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm className="mt-8" />
        </CardContent>
      </Card>
    </div>
  )
}
