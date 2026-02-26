"use server";
import { ReturnType } from "@/@types/return-type";
import { ATTRIBUTE_ERRORS } from "@/constant/error/attribute-errors";
import { AUTH_ERROR_RESPONSE } from "@/constant/error/auth-error-response";
import { ATTRIBUTE_RESPONSES } from "@/constant/success/attribute-response";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { validateSchema } from "@/utils/validate-schema";
import { fullAttributeSchema } from "@/validation/attribute-validation";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const CreateAttribute = async (
  formData: any, // Client theke object ashle 'any' ba schema type use kora bhalo
): Promise<ReturnType> => {
  const result = validateSchema(fullAttributeSchema, formData);
  if (!result.success) return result;

  // 1. Validation
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // 2. Authentication Check
  if (!session?.user) {
    return AUTH_ERROR_RESPONSE.UNAUTHORIZED;
  }

  try {
    // 3. Duplicate Check
    const duplicateAttributeCheck = await prisma.attribute.findUnique({
      where: { slug: result.data.slug },
    });

    if (duplicateAttributeCheck) {
      return {
        ...ATTRIBUTE_ERRORS.DUPLICATE_ATTRIBUTE(result.data.slug),
        tab: "basic",
      };
    }

    const { values, ...attributeData } = result.data;

    const duplicateValues = await prisma.attributeValue.findMany({
      where: {
        OR: values.map((v) => ({
          slug: v.slug,
        })),
      },
    });

    if (duplicateValues.length > 0) {
      return {
        ...ATTRIBUTE_ERRORS.DUPLICATE_VALUES(values.map((v) => v.slug)[0]),
        tab: "values",
      };
    }
    // 4. Create Record (With Relationships & Audit Fields)
    const newAttribute = await prisma.attribute.create({
      data: {
        ...attributeData,
        createdBy: session.user.id,
        updatedBy: session.user.id,
        // Jodi Values alada table hoy (Nested Write)
        values: {
          create: values.map((val: any) => ({
            value: val.value,
            slug: val.slug,
            swatchType: val.swatchType,
            swatchValue: val.swatchValue,
            isDefault: val.isDefault,
            createdBy: session.user.id,
            updatedBy: session.user.id,
          })),
        },
      },
    });

    // 5. Cache Clear & Success Return
    if (newAttribute) {
      return {
        ...ATTRIBUTE_RESPONSES.CREATE_SUCCESS,
        data: newAttribute,
      };
      revalidatePath("/attributes"); // Apnar list page-er path
    }
  } catch (error: any) {
    console.error("CREATE_ATTRIBUTE_ERROR:", error.message);
    return { ...ATTRIBUTE_ERRORS.CREATE_ATTRIBUTE_FAILED, error };
  }
};
