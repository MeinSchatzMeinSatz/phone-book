// 리듀서 안에 localStorage 접근 -> 추후 미들웨어 학습 이후 리팩토링 예정
// 원칙: 리듀서는 순수함수여야 한다.
let initialState = {
  contactList: JSON.parse(localStorage.getItem("CONTACT_LIST")),
  filteredContacts: [],
  searchValue: "",
};

function reducer(state = initialState, action) {
  // 디스트럭처링으로 할당
  const { type, payload } = action;

  switch (type) {
    case "ADD_CONTACT":
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
      };

    case "SEARCH_VALUE":
      return {
        ...state,
        searchValue: payload.searchValue,
      };

    default:
      return { ...state };
  }
}

export default reducer;
