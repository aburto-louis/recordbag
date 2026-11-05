import { createFormHook } from "@tanstack/react-form"
import { fieldContext, formContext } from "@/hooks/form-context"
import { SubmitForm } from "@/components/field/submit-form"
import { TextField } from "@/components/field/text-field"

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: { TextField },
  formComponents: { SubmitForm },
})
