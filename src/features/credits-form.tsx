import { useForm } from '@tanstack/react-form'
import * as z from 'zod'

import { FuzzyCreditEngine } from '#/fuzzy-credits'
import type { DecisionOutput } from '#/fuzzy-credits'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup } from '@/components/ui/input-group'

const engine = new FuzzyCreditEngine()

const formSchema = z.object({
  monthlyIncome: z
    .number()
    .min(1, 'Monthly income must be positive.')
    .max(100000, 'Monthly income must be less than €100,000.'),

  debtToIncomeRatio: z
    .number()
    .min(0, 'Debt-to-income ratio must be between 0 and 100.')
    .max(100, 'Debt-to-income ratio must be between 0 and 100.'),

  employmentTenure: z
    .number()
    .min(0, 'Employment tenure must be positive.')
    .max(50, 'Employment tenure cannot exceed 50 years.'),

  creditScore: z
    .number()
    .min(0, 'Credit score must be between 0 and 100.')
    .max(100, 'Credit score must be between 0 and 100.'),

  loanAmount: z
    .number()
    .min(1, 'Loan amount must be positive.')
    .max(1000000, 'Loan amount is too high.'),
})

type CreditFormValues = z.infer<typeof formSchema>

interface CreditsFormProps {
  onResult: (result: DecisionOutput) => void
}

export const CreditsForm = ({ onResult }: CreditsFormProps) => {
  const form = useForm({
    defaultValues: {
      monthlyIncome: 0,
      debtToIncomeRatio: 0,
      employmentTenure: 0,
      creditScore: 0,
      loanAmount: 0,
    } satisfies CreditFormValues,

    validators: {
      onSubmit: formSchema,
    },

    onSubmit: async ({ value }) => {
      const result = engine.evaluate({
        income: value.monthlyIncome,
        debtRatio: value.debtToIncomeRatio,
        seniority: value.employmentTenure,
        historyScore: value.creditScore,
        amount: value.loanAmount,
      })

      onResult(result)
    },
  })

  return (
    <div className="space-y-5">
      <form
        id="credit-form"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <FieldGroup>
          <form.Field
            name="monthlyIncome"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Monthly Income (€)
                  </FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    placeholder="3200"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    aria-invalid={isInvalid}
                  />

                  <FieldDescription>
                    Net monthly income before taxes
                  </FieldDescription>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <form.Field
            name="debtToIncomeRatio"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Debt-to-Income Ratio (%)
                  </FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    placeholder="28"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    aria-invalid={isInvalid}
                  />

                  <FieldDescription>Recommended below 35%</FieldDescription>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <form.Field
            name="employmentTenure"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Employment Tenure (Years)
                  </FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    step="0.5"
                    placeholder="5"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    aria-invalid={isInvalid}
                  />

                  <FieldDescription>
                    Number of years with current employer
                  </FieldDescription>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <form.Field
            name="creditScore"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Credit Score</FieldLabel>

                  <InputGroup>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      placeholder="72"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      aria-invalid={isInvalid}
                    />
                  </InputGroup>

                  <FieldDescription>
                    Creditworthiness based on payment history
                  </FieldDescription>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <form.Field
            name="loanAmount"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Requested Loan Amount (€)
                  </FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    placeholder="25000"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    aria-invalid={isInvalid}
                  />

                  <FieldDescription>
                    Total amount requested by the applicant
                  </FieldDescription>

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />
        </FieldGroup>
      </form>

      <Field orientation="horizontal">
        <Button
          size="lg"
          variant="outline"
          type="button"
          onClick={() => form.reset()}
        >
          Reset
        </Button>

        <Button size="lg" type="submit" form="credit-form">
          Evaluate Application
        </Button>
      </Field>
    </div>
  )
}
