'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useEffect } from 'react';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  monthlySavings: z.number().min(0, {
    message: "Monthly savings must be a positive number.",
  }),
  monthlyExpenses: z.number().min(0, {
    message: "Monthly expenses must be a positive number.",
  }),
  targetFinancialGoal: z.number().min(0, {
    message: "Target financial goal must be a positive number.",
  }),
})

interface FISimulationFormProps {
  onFormSubmit: (values: z.infer<typeof formSchema>) => void;
}

export function FISimulationForm({ onFormSubmit }: FISimulationFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlySavings: 0,
      monthlyExpenses: 0,
      targetFinancialGoal: 0,
    },
  })

  useEffect(() => {
    const subscription = form.watch(values => {
      onFormSubmit(values);
    });
    return () => subscription.unsubscribe();
  }, [form, onFormSubmit]);

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="monthlySavings"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Savings</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 500" {...field} onChange={event => field.onChange(+event.target.value)} />
              </FormControl>
              <FormDescription>
                Your total savings per month.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="monthlyExpenses"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Expenses</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 1500" {...field} onChange={event => field.onChange(+event.target.value)} />
              </FormControl>
              <FormDescription>
                Your total expenses per month.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="targetFinancialGoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Financial Goal</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 1000000" {...field} onChange={event => field.onChange(+event.target.value)} />
              </FormControl>
              <FormDescription>
                The total amount you aim to save for financial independence.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
              <Button type="button" variant="outline" onClick={() => form.reset({
          monthlySavings: 0,
          monthlyExpenses: 0,
          targetFinancialGoal: 0,
        })}>
          Reset Inputs
        </Button>
      </form>
    </Form>
  )
}
