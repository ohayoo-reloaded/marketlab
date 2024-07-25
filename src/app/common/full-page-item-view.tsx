import { clerkClient } from "@clerk/nextjs/server";
import { getItem } from "@/server/query";
import { Item } from "@/types/item";

  export async function FullPageItemView(props: { itemId: string }) {
  const idAsNumber = Number(props.itemId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const item:Item = await getItem(idAsNumber);

//  const userInfo = await clerkClient.users.getUser(item.userId);

  return (
    <div className="flex h-full w-screen min-w-0 items-center justify-center text-white">
      <div className="flex-shrink flex-grow">
        <img src={item.imgurl} className="object-contain" alt={item.name} />
      </div>
      <div className="flex h-full w-56 flex-shrink-0 flex-col border-l">
        <div className="border-b p-2 text-center text-xl">{item.name}</div>

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

        <div className="p-2">
        </div>
      </div>
    </div>
  );
}

           //<div>{userInfo.fullName}</div>
