import {
  useForm as hookUseForm,
  UseFormProps,
  FieldValues,
  Controller as HookController,
} from "react-hook-form";

export const useForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
>(
  props?: UseFormProps<TFieldValues, TContext>
) => {
  return hookUseForm<TFieldValues, TContext>({
    ...props,
    resolver: props?.resolver,
    defaultValues: props?.defaultValues,
    mode: props?.mode || "onChange",
    reValidateMode: props?.reValidateMode || "onChange",
  });
};

export const Controller = HookController;
