import { defineField, defineType } from "sanity";

export const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Full Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "firstName", title: "First Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "lastName", title: "Last Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "headline", title: "Headline", type: "string", validation: (r) => r.required() }),
    defineField({ name: "bio", title: "Bio", type: "text", validation: (r) => r.required() }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "social",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
        defineField({ name: "github", title: "GitHub", type: "url" }),
      ],
    }),
  ],
  preview: {
    select: { title: "name" },
  },
});
