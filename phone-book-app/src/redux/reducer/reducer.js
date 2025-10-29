let initialState = {
  contactList: [],
};

function reducer(state = initialState, action) {
  // 디스트럭처링으로 할당
  const { type, payload } = action;
  switch (type) {
    case "ADD_CONTACT":
      return {
        ...state.contactList,
        contactList: [
          ...state.contactList,
          {
            name: payload.name,
            phoneNumber: payload.phoneNumber,
          },
        ],
      };

    default:
      return { ...state };
  }
}

export default reducer;
