let initialState = {
  contactList: [],
};

function reducer(state = initialState, action) {
  // 디스트럭처링으로 할당
  const { type, payload } = action;

  console.log(localStorage.getItem("CONTACT_LIST"));

  // 리듀서 안에 localStorage 접근 -> 추후 미들웨어 학습 이후 리팩토링 예정
  // 원칙: 리듀서는 순수함수여야 한다.
  if (localStorage.getItem("CONTACT_LIST")) {
    initialState.contactList = JSON.parse(localStorage.getItem("CONTACT_LIST"));
  }

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

    default:
      return { ...state };
  }
}

export default reducer;
