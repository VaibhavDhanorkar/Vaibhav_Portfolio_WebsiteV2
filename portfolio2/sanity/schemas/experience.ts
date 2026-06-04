import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "id", title: "ID", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role", type: "string", validation: (r) => r.required() }),
    defineField({ name: "company", title: "Company", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "period", title: "Period", type: "string", validation: (r) => r.required() }),
    defineField({ name: "current", title: "Current Role", type: "boolean", initialValue: false }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "highlights", title: "Highlights", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "logoInitial", title: "Logo Initial", type: "string" }),
    defineField({ name: "sortOrder", title: "Sort Order", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Sort Order", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }] }],
  preview: {
    select: { title: "role", subtitle: "company" },
  },
});
