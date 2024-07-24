import { Modal } from './modal';
import { FullPageItemView } from '@/app/common/full-page-item-view';

export default function ItemModal({
  params: { id: itemId },
}: {
  params: { id: string };
}) {

  const idAsNumber = Number(itemId)
  if(Number.isNaN(idAsNumber)) throw new Error("Invalid photo id")

  return (
  <div>
    <Modal>
    <FullPageItemView itemId={itemId}/>
    </Modal>
  </div>
  )

}
