import { clerkClient } from "@clerk/nextjs/server";
import { getItem } from "@/server/query";
import { Item } from "@/types/item";



function calculateDepreciation(item:Item, yearlyDepreciationRate: number = 0.10) {
  const currentDate = new Date();
  const boughtDate = new Date(item.boughtAt);
  const yearsSinceBought = (currentDate.getTime() - boughtDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

  const depreciatedPrice = item.originalPrice * Math.pow((1 - yearlyDepreciationRate), yearsSinceBought);

 return Math.max(depreciatedPrice, 0).toFixed(2);
}
  export async function FullPageItemView(props: { itemId: string }) {
  const idAsNumber = Number(props.itemId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const item = await getItem(idAsNumber);
 const newPrice = calculateDepreciation(item);


//  const userInfo = await clerkClient.users.getUser(item.userId);

  return (
    <div className="flex h-full w-screen min-w-0 items-center justify-center text-white p-4">
      <div className="flex max-w-4xl mx-auto bg-zinc-900/80 p-4 rounded-md">
        <div className="flex-shrink flex-grow max-w-md">
          <img src={item.imgurl} className="object-contain w-full" alt={item.name} />
        </div>
        <div className="flex h-full w-56 flex-shrink-0 flex-col border-l p-4 bg-zinc-800">
          <div className="border-b pb-2 mb-2 text-center text-xl">{item.name}</div>
          <div className="p-2">
          <div>Uploaded By:</div>
        </div>
        <div>
        <p>category: {item.category}</p>
        <p>boughtat: {item.boughtAt.toLocaleDateString()}</p>
        <p>description: {item.description}</p>
        <p>original price: {item.originalPrice}</p>
        </div>
        <div className="p-2">
          <div>Created On:</div>
          <div>{item.createdAt.toLocaleDateString()}</div>
        </div>
        <h2>CALCULATED PRICE: {newPrice}</h2>

        <div className="p-2">
        </div>
      </div>
    </div>
    </div>
  );
}

           //<div>{userInfo.fullName}</div>
