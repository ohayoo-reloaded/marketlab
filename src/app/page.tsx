import { getItems } from "@/server/query";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const items = await getItems();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-center flex-wrap gap-4 p-4">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={item.id} className="flex w-48 flex-col">
              <Link href={`/item/${item.id}`}>
                <img
                  alt={item.name}
                  src={item.imgurl}
                  width={"200"}
                  height={"300"}
                />
                <div key={index}>{item.name}</div>
              </Link>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>

    </main>
  );
}
