import { defineField, defineType } from "sanity";

export const achievement = defineType({
  name: "achievement",
  title: "Achievement",
  type: "document",
  fields: [
    defineField({ name: "id", title: "ID", type: "string", validation: (r) => r.required() }),
    defineField({ name: "icon", title: "Icon (emoji)", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "org", title: "Organization", type: "string" }),
    defineField({ name: "detail", title: "Detail", type: "text" }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: { list: ["award", "certification", "membership"] },
    }),
    defineField({ name: "sortOrder", title: "Sort Order", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Sort Order", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "org", media: "icon" },
    prepare({ title, subtitle, media }) {
      return { title: `${media ?? ""} ${title}`.trim(), subtitle };
    },
  },
});

export const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    defineField({ name: "id", title: "ID", type: "string", validation: (r) => r.required() }),
    defineField({ name: "icon", title: "Icon (emoji)", type: "string" }),
    defineField({ name: "degree", title: "Degree", type: "string", validation: (r) => r.required() }),
    defineField({ name: "field", title: "Field", type: "string" }),
    defineField({ name: "institution", title: "Institution", type: "string" }),
    defineField({ name: "detail", title: "Detail", type: "text" }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: { list: ["masters", "bachelors", "certification"] },
    }),
    defineField({ name: "sortOrder", title: "Sort Order", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Sort Order", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }] }],
  preview: {
    select: { title: "degree", subtitle: "field", media: "icon" },
    prepare({ title, subtitle, media }) {
      return { title: `${media ?? ""} ${title}`.trim(), subtitle };
    },
  },
});
