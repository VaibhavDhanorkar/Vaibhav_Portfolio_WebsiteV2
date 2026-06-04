import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string", validation: (r) => r.required() }),
    defineField({ name: "status", title: "Status", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["Professional", "Personal"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "icon", title: "Icon (emoji)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", validation: (r) => r.required() }),
    defineField({ name: "purpose", title: "Purpose", type: "text", validation: (r) => r.required() }),
    defineField({ name: "problem", title: "Problem", type: "text", validation: (r) => r.required() }),
    defineField({ name: "solution", title: "Solution", type: "text", validation: (r) => r.required() }),
    defineField({ name: "impact", title: "Impact", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "techStack", title: "Tech Stack", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "githubUrl", title: "GitHub URL", type: "url" }),
    defineField({ name: "liveUrl", title: "Live URL", type: "url" }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "year", title: "Year", type: "number", validation: (r) => r.required() }),
    defineField({
      name: "comparisons",
      title: "Market Gap Comparisons",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "category", title: "Category", type: "string" }),
            defineField({ name: "problem", title: "Problem", type: "string" }),
            defineField({ name: "solution", title: "Solution", type: "string" }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "subtitle", media: "icon" },
    prepare({ title, subtitle, media }) {
      return { title: `${media ?? ""} ${title}`.trim(), subtitle };
    },
  },
});
