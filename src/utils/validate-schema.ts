export const validateSchema = (schema: any, data: FormData) => {
  const rawData = Object.fromEntries(data);
  const result = schema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      action: "VALIDATION_ERROR",
      message: "⚠️ Invalid input data! Please check required fields!",
      status: 400,
      errors: result.error.flatten().fieldErrors,
      inputs: rawData,
    };
  }

  return { success: true, data: result.data };
};
