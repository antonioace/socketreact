import { action, observable } from "mobx";

export const chatStore = observable({
  chatList: [],
});

export const setChatList = action((chatList) => {
  chatStore.chatList = chatList;
});
