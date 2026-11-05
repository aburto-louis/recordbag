import { loginSchema } from "store/client"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"
import { handleAuthLogin } from "@/api/auth"
import { useAppForm } from "@/hooks/use-form"
import { authQueryKey } from "@/lib/qKeys"
import { FieldGroup, FieldSeparator, FieldSet } from "../ui/field"
import { toast } from "../ui/toast"

export function LoginForm({ className }: { className?: string }) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const form = useAppForm({
    defaultValues: { username: "", password: "" },
    validators: { onSubmit: loginSchema },
    onSubmit: async ({ value, formApi }) => {
      try {
        const user = await handleAuthLogin(value)
        formApi.setFieldValue("password", "")
        queryClient.setQueryData(authQueryKey.me(), user)
        await router.invalidate()
      } catch (err) {
        formApi.setFieldValue("password", "")
        toast.add({
          type: "error",
          description: err instanceof Error ? err.message : "Login failed",
        })
      }
    },
  })
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className={className}
    >
      <FieldSet>
        <FieldGroup>
          <form.AppField name="username">
            {(field) => <field.TextField label="Username" />}
          </form.AppField>
          <form.AppField name="password">
            {(field) => <field.TextField label="Password" type="password" />}
          </form.AppField>
          <FieldSeparator />
          <form.AppForm>
            <form.SubmitForm labels={["Login", "..."]} />
          </form.AppForm>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
