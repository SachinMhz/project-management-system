export const CHANGE_TAB = "CHANGE_TAB";

export function changeTab(tabName) {
  return {
    type: CHANGE_TAB,
    payload: tabName,
  };
}
