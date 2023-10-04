import {
  FormControl,
  FormItem as FormItemPrimitive,
  FormLabel,
  FormMessage,
} from "@ui/components/ui/form";
import { ReactNode } from "react";

interface FormItemProps {
  label: string;
  htmlFor: string;
  errorMessage: string | undefined;
  children: ReactNode;
}

export const FormItem = ({
  label,
  errorMessage,
  children,
  htmlFor,
}: FormItemProps) => {
  return (
    <FormItemPrimitive className="space-y-1">
      <FormLabel htmlFor={htmlFor}>{label}</FormLabel>
      <FormControl>{children}</FormControl>
      <FormMessage className="text-sm font-normal text-error-500">
        {errorMessage}
      </FormMessage>
    </FormItemPrimitive>
  );
};
