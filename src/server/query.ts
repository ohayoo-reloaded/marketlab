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

export async function getItem(id: number): Promise<Item> {
  // const user = auth();
  // if (!user.userId) throw new Error("Unauthorized");

  const item = await db.query.itemsTable.findFirst({
    where: (model, { eq }) => eq(model.id, id),
  });
  if (!item) throw new Error("Item not found");
  const newItem: Item = {
    id: item.id,
    name: item.name,
    description: item.description!,
    boughtAt: new Date(item.boughtAt),
    category: item.category,
    originalPrice: Number(item.originalPrice),
    imgurl: item.imgurl,
    userId: item.userId,
    createdAt: new Date(item.createdAt),
    updatedAt: new Date(item.updatedAt!),
  };
  return newItem;
}

export async function addItem(item: Item) {
  const newItem = await db
    .insert(itemsTable)
    .values({
      name: item.name,
      description: item.description,
      boughtAt: item.boughtAt,
      category: item.category,
      originalPrice: item.originalPrice.toString(),
      imgurl: item.imgurl,
      userId: item.userId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    })
    .returning();

  return newItem;
}
