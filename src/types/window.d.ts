// Type declarations for window extensions
declare global {
  interface Window {
    GroupModal: {
      close: () => void;
      show: () => void;
      showModal: () => void;
    };
    createGroupModal: {
      close: () => void;
      show: () => void;
      showModal: () => void;
    };
  }
}

export {};
