import { useFormContext } from "@/hooks/form-context"
import { Button } from "../ui/button"
import { Field } from "../ui/field"

export function SubmitForm({
  labels = ["Submit", "Submitting..."],
}: {
  labels?: [string, string]
}) {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Field>
          <Button type="submit" disabled={isSubmitting}>
            {!isSubmitting ? labels[0] : labels[1]}
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isSubmitting}
            onClick={() => form.reset()}
          >
            Reset
          </Button>
        </Field>
      )}
    </form.Subscribe>
  )
}
