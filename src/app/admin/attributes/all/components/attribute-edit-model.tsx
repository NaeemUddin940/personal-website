import { FormProvider, useForm } from "react-hook-form";
import AttributeCreateForm from "../../create/attr-create-form";

// Create this component either in the same file or a separate one
export const AttributeEditModal = ({ item }) => {
  const methods = useForm({
    defaultValues: {
      ...item,
      validations: item?.validations || [],
      options: item?.options || [],
    },
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <AttributeCreateForm />
        </div>
      </form>
    </FormProvider>
  );
};
