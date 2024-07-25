'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="fixed inset-0 bg-zinc-900/50 text-white flex items-center justify-center"
      onClose={onDismiss}
    >
      <div className="bg-zinc-800 p-2 rounded-lg max-w-lg w-full">
        {children}
        {/* <button onClick={onDismiss} className="close-button" /> */}
        </div>
      </dialog>,
    document.getElementById('modal-root')!
  );
}
