import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

export async function getItems() {
  const items = await db.query.items.findMany();
  return items;
}

export async function getItem(id: number) {
  // const user = auth();
  // if (!user.userId) throw new Error("Unauthorized");

  const item = await db.query.items.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!item) throw new Error("Item not found");

  return item;
}
