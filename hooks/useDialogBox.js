import { create } from 'zustand';

export const useDialogBox = create((set) => ({
  isOpen: false,
  onOpen: () => set({  isOpen: true }),
  onClose: () => set({  isOpen: false }),
}));
