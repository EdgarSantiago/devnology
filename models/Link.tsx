import { Schema, model, connect, models } from "mongoose";
import { EXPORT_MARKER } from "next/dist/shared/lib/constants";

interface Ilink {
  label: string;
  link: string;
}

const LinkSchema = new Schema<Ilink>(
  {
    label: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Link = models.Link || model("Link", LinkSchema);
