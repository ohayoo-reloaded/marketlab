import { getItems } from "@/server/query";
import Image from "next/image";

import Link from "next/link";
import { AddItemForm } from "./common/full-add-item-view";

export const dynamic = "force-dynamic";

export default async function Home() {
  const items = await getItems();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to this amazing market!</h1>
      <div>
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={item.id} className="flex w-48 flex-col">
              <Link href={`/item/${item.id}`}>
                <div key={index}>{item.name}</div>
              </Link>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <AddItemForm />
    </main>
  );
}
