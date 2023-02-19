import { z } from "zod";

const userId = z.string().regex(new RegExp("^[0-9a-z]{12}$"));

export const validate = {
  userId: userId.parse,
};

declare global {
  type UserId = z.infer<typeof userId>;
}
