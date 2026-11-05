import { useFieldContext } from "@/hooks/form-context"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

export function TextField({
  label,
  placeholder,
  type = "text",
  orientation = "vertical",
}: {
  label: string
  placeholder?: string
  type?: "text" | "password"
  orientation?: "vertical" | "horizontal"
}) {
  const field = useFieldContext<string>()
  return (
    <Field orientation={orientation}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        id={field.name}
        type={type}
        value={field.state.value ?? ""}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
      />
      <FieldError
        errors={field.state.meta.errors as { message?: string }[]}
        className="text-[0.5rem] line-clamp-1"
      />
    </Field>
  )
}
