import { create } from 'zustand';

export type DialogType =
  | 'link-product-to-brand'
  | 'link-product-to-sub-category'
  | 'link-product-to-label'
  | 'link-product-to-tag'
  | 'link-sub-category-to-category'
  | 'link-brand-to-product'
  | 'link-label-to-product'
  | 'link-tag-to-product'
  | 'unlink-product-from-brand'
  | 'unlink-product-from-sub-category'
  | 'unlink-product-from-label'
  | 'unlink-product-from-tag'
  | 'unlink-sub-category-from-category'
  | 'delete-product'
  | 'delete-brand'
  | 'delete-category'
  | 'delete-sub-category'
  | 'delete-label'
  | 'delete-tag';

export interface DialogState {
  // Dialog visibility
  isOpen: boolean;
  dialogType: DialogType | null;

  // Entity IDs for the operation
  sourceId: string | null; // The entity being operated on (e.g., productId for linking product to brand)
  targetId: string | null; // The target entity (e.g., brandId for linking product to brand)

  // Loading states
  isLoading: boolean;

  // Additional data for complex operations
  additionalData: Record<string, any>;
}

export interface DialogStore extends DialogState {
  // Open dialogs
  openLinkDialog: (
    type: DialogType,
    sourceId: string,
    targetId?: string,
    additionalData?: Record<string, any>
  ) => void;
  openUnlinkDialog: (type: DialogType, sourceId: string, targetId?: string) => void;
  openDeleteDialog: (type: DialogType, sourceId: string) => void;

  // Close dialogs
  closeDialog: () => void;

  // Loading state management
  setLoading: (loading: boolean) => void;

  // Reset state
  reset: () => void;
}

const initialState: DialogState = {
  isOpen: false,
  dialogType: null,
  sourceId: null,
  targetId: null,
  isLoading: false,
  additionalData: {},
};

export const useDialogStore = create<DialogStore>()((set) => ({
  ...initialState,

  openLinkDialog: (
    type: DialogType,
    sourceId: string,
    targetId?: string,
    additionalData?: Record<string, any>
  ) => {
    set({
      isOpen: true,
      dialogType: type,
      sourceId,
      targetId: targetId || null,
      additionalData: additionalData || {},
      isLoading: false,
    });
  },

  openUnlinkDialog: (type: DialogType, sourceId: string, targetId?: string) => {
    set({
      isOpen: true,
      dialogType: type,
      sourceId,
      targetId: targetId || null,
      isLoading: false,
      additionalData: {},
    });
  },

  openDeleteDialog: (type: DialogType, sourceId: string) => {
    set({
      isOpen: true,
      dialogType: type,
      sourceId,
      targetId: null,
      isLoading: false,
      additionalData: {},
    });
  },

  closeDialog: () => {
    set({
      isOpen: false,
      dialogType: null,
      sourceId: null,
      targetId: null,
      isLoading: false,
      additionalData: {},
    });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  reset: () => {
    set(initialState);
  },
}));
