import { getItems } from "@/server/query";
import Image from "next/image";
import { AddItemForm } from "./_components/_add-items-modal/product-form";

export default async function Home() {
  const items = await getItems();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to this amazing market!</h1>
      <div>
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index}>{item.name}</div> // Adjust this based on your item structure
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <AddItemForm />
    </main>
  );
}
