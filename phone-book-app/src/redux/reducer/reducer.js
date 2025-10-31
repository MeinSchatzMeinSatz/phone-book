let initialState = {
  contactList: JSON.parse(localStorage.getItem("CONTACT_LIST")) || [],
  filteredContacts: [],
  searchValue: "",
};

function reducer(state = initialState, action) {
  // 디스트럭처링으로 할당
  const { type, payload } = action;

  console.log("로컬스토리지 목록:", localStorage.getItem("CONTACT_LIST"));

  switch (type) {
    case "ADD_CONTACT":
      if (!state.contactList) return (state = []);

      const newState = {
        ...state,
        contactList: [
          ...state.contactList,
          {
            name: payload.name,
            phoneNumber: payload.phoneNumber
              .toString()
              .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
          },
        ],
      };

      localStorage.setItem(
        "CONTACT_LIST",
        JSON.stringify(newState.contactList)
      );

      return newState;

    case "SEARCH_CONTACT":
      const searchValue = payload.searchValue;

      const filteredContacts = state.contactList.filter((contact) =>
        contact.name.includes(searchValue)
      );

      return {
        ...state,
        filteredContacts: filteredContacts, // 검색 결과 저장
        searchValue: payload.searchValue,
      };

    case "DELETE_CONTACT":
      const indexToDelete = payload;
      const updatedContactList = state.contactList;

      updatedContactList.splice(indexToDelete, 1);

      localStorage.setItem("CONTACT_LIST", JSON.stringify(updatedContactList));

      return {
        ...state,
        contactList: [...updatedContactList],
      };

    default:
      return { ...state };
  }
}

export default reducer;
