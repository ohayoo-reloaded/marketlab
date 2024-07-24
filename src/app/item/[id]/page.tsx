import { FullPageItemView } from "@/app/common/full-page-item-view";

export default function PhotoModal({
  params: { id: itemId },
}: {
  params: { id: string };
}) {

  const idAsNumber = Number(itemId)
  if(Number.isNaN(idAsNumber)) throw new Error("Invalid photo id")

  return <FullPageItemView itemId={itemId}/>

    }
