"use server";
import { FILTER_OPTIONS } from "@/app/(admin-and-manager)/admin/attributes/constants/filter-options";
import { prisma } from "@/lib/prisma";

export const getAllAttributes = async (params) => {
  const {
    page = 1,
    limit = 5,
    search = "",
    sortBy = "createdAt",
    sortOrder = "desc",
    columnFilters = {},
  } = params;

  const where = { AND: [] };

  // ১. সাধারণ সার্চ
  if (search) {
    where.AND.push({ name: { contains: search, mode: "insensitive" } });
  }

  // ২. Configuration (Virtual Column) ম্যাপিং
  if (columnFilters.configuration) {
    const selectedLabel = columnFilters.configuration;

    // "Hidden" হলে isVisible: false চেক করবে
    if (selectedLabel === "Hidden") {
      where.AND.push({ isVisible: false });
    } else {
      // লেবেল অনুযায়ী সঠিক Key খুঁজে বের করা (যেমন: "Unique" -> "isUnique")
      const option = FILTER_OPTIONS.find((o) => o.label === selectedLabel);
      if (option) {
        where.AND.push({ [option.key]: true });
      }
    }
  }

  // ৩. অন্যান্য ফিল্টার (যদি থাকে)
  Object.keys(columnFilters).forEach((key) => {
    if (key !== "configuration" && columnFilters[key] !== undefined) {
      where.AND.push({
        [key]: columnFilters[key] === true || columnFilters[key] === "true",
      });
    }
  });

  try {
    const [data, total] = await Promise.all([
      prisma.attribute.findMany({
        where: where.AND.length > 0 ? where : {},
        take: Number(limit),
        skip: (Number(page) - 1) * Number(limit),
        orderBy: sortBy ? { [sortBy]: sortOrder } : { createdAt: "desc" },
        include: {
          // This replaces your separate attributeValue query
          values: {
            select: {
              id: true,
              value: true,
              attributeId: true,
              slug: true,
              isDefault: true,
            },
          },
        },
      }),

      prisma.attribute.count({
        where: where.AND.length > 0 ? where : {},
      }),
    ]);

    //   const attributeValues = await prisma.attributeValue.findMany({
    //     where: {
    //       attributeId: {
    //         in: data.map((d) => d.id),
    //       },
    //     },
    //     // Performance Tip: Only select what you actually need
    //     select: {
    //       id: true,
    //       value: true,
    //       attributeId: true,
    //     },
    //   });
    //  const result = [
    //   ...data,
    //   values: attributeValues
    //  ]

    return { data, total, pageCount: Math.ceil(total / limit) };
  } catch (error) {
    console.error("Fetch Error:", error.message);
    return { data: [], total: 0 };
  }
};
