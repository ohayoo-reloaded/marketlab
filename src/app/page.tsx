import { getItems } from "@/server/query";
import Image from "next/image";

export default async function Home() {

  const items = await getItems()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>
      Welcome to this amazing market!
      </h1>
      <div>
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index}>{item.name}</div> // Adjust this based on your item structure
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </main>
  );
}
