"use server";
import { addItem } from "@/server/query";
import { Item } from "@/types/item";

export async function addItemHandler(item: Item) {
  await addItem(item);
}
