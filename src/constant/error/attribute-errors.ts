export const ATTRIBUTE_ERRORS = {
  CREATE_ATTRIBUTE_FAILED: {
    success: false,
    action: "CREATE_ATTRIBUTE",
    message:
      "❌ Failed to create attribute. Something went wrong on our server. Please try again later.",
    status: 500,
  },
  DUPLICATE_ATTRIBUTE: (slug) => ({
    success: false,
    action: "ATTRIBUTE_CHECK",
    message: `❌ Attribute slug '${slug}' already exists. Please use a unique name.`,
    status: 400,
  }),
  DUPLICATE_VALUES: (slugs) => ({
    success: false,
    action: "ATTRIBUTE_VALUE_CHECK",
    message: `❌ The following values '${slugs}' are already taken.`,
    status: 400,
  }),
};
