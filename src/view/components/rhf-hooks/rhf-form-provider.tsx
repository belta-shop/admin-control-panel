import { useSnackbar } from 'notistack';
import { FormProvider, UseFormReturn } from 'react-hook-form';

export type OnSubmitFunction = (data: any) => void | Promise<void>;

interface Props {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit: OnSubmitFunction;
}

export default function RHFFormProvider({ children, methods, onSubmit }: Props) {
  const { handleSubmit, reset } = methods;

  const { enqueueSnackbar } = useSnackbar();

  const submit = handleSubmit(async (data) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={submit}>{children}</form>
    </FormProvider>
  );
}
