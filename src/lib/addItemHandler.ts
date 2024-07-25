"use server";
import { addItem } from "@/server/query";
import { Item } from "@/types/item";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addItemHandler(item: Item) {
  await addItem(item);
  revalidatePath("/");
}
