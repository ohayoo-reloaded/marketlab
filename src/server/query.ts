// "use-server";
import "server-only";
// import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { itemsTable } from "./db/schema";
import { Item } from "@/types/item";

export async function getItems() {
  const items = await db.query.itemsTable.findMany();
  return items;
}

export async function getItem(id: number) {
  // const user = auth();
  // if (!user.userId) throw new Error("Unauthorized");

  const item = await db.query.itemsTable.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!item) throw new Error("Item not found");

  return item;
}

export async function addItem(item: Item) {
  // const user = auth();
  const newItem = await db
    .insert(itemsTable)
    .values({
      name: item.name,
      description: item.description,
      boughtAt: item.boughtAt,
      category: item.category,
      originalPrice: item.originalPrice,
      imgurl: item.imgurl,
      userId: item.userId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    })
    .returning();

  return newItem;
}
