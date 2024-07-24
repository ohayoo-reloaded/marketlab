import { AddItemForm } from '@/app/common/full-add-item-view';
import { Modal } from './modal';

export default function NewItemModal(){
  return (
  <div>
    <Modal>
    <AddItemForm/>
    </Modal>
  </div>
  )

}
