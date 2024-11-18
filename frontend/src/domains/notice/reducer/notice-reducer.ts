export type NoticeReducerState = {
  isSavingAction: boolean;
  isModalOpen: boolean;
  modalTitle: string;
  modalBodyText: string;
  noticeId: number;
  anchorElement: HTMLElement | null;
  openNoticeRowId: null | number;
  actionType: string;
  menuItemValue: string;
};

type MenuClickAction = {
  type: 'SET_MENU_ICON_CLICK';
  payload: {
    noticeId: number;
    anchorElement: HTMLElement | null;
  };
};
type MenuCloseAction = { type: 'SET_MENU_CLOSE' };
type MenuItemClickAction = {
  type: 'SET_MENU_ITEM_CLICK';
  payload: {
    menuItemValue: string;
    modalTitle: string;
    modalBodyText: string;
  };
};
type MenuIconClick = {
  type: 'SET_ICON_CLICK';
  payload: {
    menuItemValue: string;
    noticeId: number;
    modalTitle: string;
    modalBodyText: string;
  };
};
type ModalStateAction = { type: 'SET_MODAL_STATE' };
type SetLoader = { type: 'SET_LOADER' };
type NoticeReducerAction =
  | MenuClickAction
  | MenuCloseAction
  | MenuItemClickAction
  | ModalStateAction
  | MenuIconClick
  | SetLoader;

export const noticeReducer = (
  state: NoticeReducerState,
  action: NoticeReducerAction
): NoticeReducerState => {
  switch (action.type) {
    case 'SET_MENU_ICON_CLICK': {
      const { noticeId, anchorElement } = action.payload;
      return {
        ...state,
        noticeId,
        anchorElement,
        openNoticeRowId: state.openNoticeRowId === noticeId ? null : noticeId
      };
    }
    case 'SET_MENU_CLOSE':
      return {
        ...state,
        anchorElement: null,
        openNoticeRowId: null
      };
    case 'SET_MENU_ITEM_CLICK': {
      const { modalTitle, modalBodyText, menuItemValue } = action.payload;
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
        modalTitle,
        modalBodyText,
        anchorElement: null,
        openNoticeRowId: null,
        menuItemValue
      };
    }
    case 'SET_MODAL_STATE':
      return {
        ...state,
        isModalOpen: !state.isModalOpen
      };
    case 'SET_ICON_CLICK': {
      const { noticeId, modalTitle, modalBodyText, menuItemValue } = action.payload;
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
        noticeId,
        modalTitle,
        modalBodyText,
        menuItemValue
      };
    }
    case 'SET_LOADER':
      return {
        ...state,
        isSavingAction: !state.isSavingAction
      };
    default:
      return state;
  }
};
