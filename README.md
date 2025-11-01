# Redux Contact Manager
Redux를 활용한 연락처 관리 토이프로젝트
<br/>

## 프로젝트 소개

인프런 강의의 기본 예제를 확장하여 만든 연락처 관리 어플리케이션입니다.
강의에서 제공된 **연락처 추가, 검색 기능**에 **이름과 전화번호 유효성 검사, 삭제 기능, Debounce 최적화, LocalStorage 연동** 등을 추가로 구현하며 Redux의 동작원리를 학습했습니다.

## 프로젝트 목표
- Redux의 기본 구조와 데이터 흐름 이해
- 실무에서 사용되는 성능 최적화 기법 적용(Debounce)
- 강의 내용을 넘어선 기능 확장 경험

<br />

## 주요 기능
#### (1) 연락처 추가
- 이름과 전화번호 유효성 검사
- 전화번호 자동 포맷팅
- 입력 후 자동 포커스 이동

#### (2) 연락처 검색
- 실시간 검색(Debounce 적용)
- 이름 기반 필터링

#### (3) 연락처 삭제
- 개별 연락처 삭제 기능

#### (4) 데이터 영속성
- LocalStorage를 통한 데이터 저장
- 페이지 새로고침 시에도 연락처 유지

<br/>

## 기술 스택
| 분류 | 기술 |
|------|------|
| **Core** | React 19.1.16 |
| **State Management** | Redux (Classic) |
| **Styling** | Tailwind CSS |
| **Build Tool** | Vite |

<br/>

## 프로젝트 구조
```
src/
├── component/
│   ├── ContactForm.jsx      # 연락처 추가 폼
│   ├── ContactList.jsx      # 연락처 목록 컨테이너
│   ├── SearchBox.jsx        # 검색 기능
│   └── Contact.jsx          # 연락처 아이템 렌더링
├── redux/
│   └── reducer/
│       └── reducer.js       # Redux 리듀서
├── utils/
│   └── useSearchDebounce.js # Debounce 커스텀 훅
├── assets/
│   └── img/                 # 이미지 리소스
└── App.jsx
```

<br/>

## 기술적 구현 포인트
### 1. Redux 상태 관리 구조
```javascript
// 초기 상태 설계
let initialState = {
  contactList: JSON.parse(localStorage.getItem("CONTACT_LIST")) || [],
  filteredContacts: [],
};
```
**설계 의도**
- `contatList`: 전체 연락처 데이터(단일 진실 공급원)
- `filteredContacts`: 검색 결과를 별도로 관리하여 원본 데이터 보존

### 2. 액션 타입별 구현
### ADD_CONTACT
```javascript
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
  
  localStorage.setItem("CONTACT_LIST", JSON.stringify(newState.contactList));
  return newState;
```

**핵심 포인트:**
- 불변성 유지를 위한 spread 연산자 사용
- 전화번호 정규표현식으로 자동 포맷팅
- Redux 업데이트와 동시에 LocalStorage 동기화

#### SEARCH_CONTACT
```javascript
case "SEARCH_CONTACT":
  const filteredContacts = state.contactList.filter((contact) =>
    contact.name.includes(searchValue)
  );

  return {
    ...state,
    filteredContacts: filteredContacts,
    searchValue: payload.searchValue,
  };
```

**핵심 포인트:**
- 원본 데이터(`contactList`)는 유지하면서 검색 결과만 별도 저장
- 검색어도 상태로 관리하여 UI 동기화

#### DELETE_CONTACT
```javascript
case "DELETE_CONTACT":
  const indexToDelete = payload;
  const updatedContactList = [...state.contactList];
  
  updatedContactList.splice(indexToDelete, 1);
  
  localStorage.setItem("CONTACT_LIST", JSON.stringify(updatedContactList));
  
  return {
    ...state,
    contactList: updatedContactList,
  };
```

**핵심 포인트:**
- 배열 복사 후 `splice`로 삭제하여 불변성 유지
- 삭제 후 LocalStorage 즉시 업데이트

### 3. Debounce 최적화

사용자가 검색어를 입력할 때마다 Redux 액션을 dispatch하면 불필요한 렌더링이 발생합니다.
이를 **debounce 기법**을 적용하여 입력이 멈춘 후 300ms 뒤에만 검색이 실행되도록 최적화했습니다.

```javascript
// SearchBox.jsx
const handleSearch = useDebounce((searchValue) => {
  dispatch({
    type: "SEARCH_CONTACT",
    payload: { searchValue: searchValue },
  });
}, 300);
```

**성능 개선 효과:**
- 입력 3회 → 실제 검색 1회 (약 66% 성능 향상)
- 불필요한 리렌더링 방지

### 4. 유효성 검사

```javascript
function validateName(name) {
  const nameRegex = /^[a-zA-Z가-힣\s]+$/; // 한글, 영어, 공백만 허용
  return nameRegex.test(name);
}

function validatePhoneNumber(number) {
  const phoneRegex = /^\d{11}$/; // 11자리 숫자만 허용
  return phoneRegex.test(number);
}
```

**사용자 경험 개선:**
- 실시간 에러 메시지 표시
- 잘못된 형식 입력 시 제출 방지


## 트러블슈팅 & 학습 내용

### 1. Redux 액션 설계의 어려움

**문제:**
- 강의에서는 ADD 액션 하나만 배웠는데, SEARCH와 DELETE 액션을 추가로 설계해야 했음
- 각 액션이 상태를 어떻게 변경해야 할지 명확하지 않았음

**해결:**
- Redux의 단방향 데이터 흐름을 이해하며 각 액션의 책임을 명확히 분리
- `filteredContacts`를 별도 상태로 관리하여 검색과 원본 데이터를 분리

**배운 점:**
- 상태 설계의 중요성 (어떤 데이터를 어떻게 저장할지)
- 액션은 "무엇을 할 것인가"만 정의하고, 리듀서가 "어떻게 할 것인가"를 담당

### 2. Debounce 구현 과정에서의 useRef와 useCallback 이해

**문제:**
- 처음엔 단순히 `setTimeout`을 사용했더니 모든 입력마다 검색이 실행됨
- Debounce를 적용했지만 최신 검색어가 반영되지 않는 문제 발생

**해결:**
```javascript
export default function useDebounce(callback, delay) {
  const timerRef = useRef(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback; // 최신 callback 추적
  }, [callback]);

  const debouncedFunction = useCallback(
    (...args) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      timerRef.current = setTimeout(() => {
        callbackRef.current(...args); // 최신 callback 실행
      }, delay);
    },
    [delay]
  );

  return debouncedFunction;
}
```

**배운 점:**
- `useRef`는 리렌더링을 유발하지 않으면서 값을 저장할 수 있음
- `callbackRef`로 최신 함수를 추적하여 클로저 문제 해결
- `useCallback`의 의존성 배열 관리의 중요성

### 3. LocalStorage와 Redux 동기화

**문제:**
- Redux 상태는 페이지를 새로고침하면 초기화됨
- 사용자가 입력한 연락처를 유지하려면 영속성 필요

**해결:**
```javascript
// 초기 상태에서 LocalStorage 읽기
let initialState = {
  contactList: JSON.parse(localStorage.getItem("CONTACT_LIST")) || [],
};

// 액션 실행 시 LocalStorage 업데이트
localStorage.setItem("CONTACT_LIST", JSON.stringify(newState.contactList));
```

**배운 점:**
- Redux는 메모리 상태 관리, 영속성은 별도 처리 필요
- 리듀서에서 side effect(LocalStorage 업데이트)를 처리하는 것의 장단점

### 4. 연락처 삭제 기능 구현

**문제:**
- 강의에 없던 기능을 구글링을 통해 스스로 구현해야 했음
- 배열에서 특정 인덱스의 아이템을 삭제하면서 불변성을 유지해야 함

**해결:**
```javascript
const updatedContactList = [...state.contactList];
updatedContactList.splice(indexToDelete, 1);
```

**배운 점:**
- 구글링과 공식 문서를 활용한 문제 해결 능력 향상
- 배열 불변성 유지 방법 (`spread` + `splice` 또는 `filter` 사용)

<br/>

## 🚀 개선 예정 사항

### 연락처 수정 기능 추가
- **고민 포인트:** 
  - 수정 모드 UI를 어떻게 구성할지 (모달? 인라인 편집?)
  - 수정 중 취소 기능 처리
  - Redux 액션 설계 (UPDATE_CONTACT)

<br/>

## 이 프로젝트를 통해 배운 것

### Redux 핵심 개념
- **Store**: 애플리케이션의 전역 상태를 저장하는 단일 공간
- **Action**: 상태 변경을 일으키는 이벤트 (type과 payload로 구성)
- **Reducer**: 액션에 따라 상태를 변경하는 순수 함수
- **Dispatch**: 액션을 Redux 스토어에 전달하는 함수

### 실무 스킬
- ✅ 강의 내용을 확장하여 스스로 기능 구현
- ✅ 성능 최적화 기법 적용 (Debounce)
- ✅ 사용자 경험을 고려한 UI/UX 구현
- ✅ 정규표현식을 활용한 데이터 검증
- ✅ 문제 해결을 위한 구글링 및 공식 문서 활용

### React Hooks 심화
- `useRef`의 활용: 리렌더링 없이 값 저장
- `useCallback`의 필요성: 함수 메모이제이션
- Custom Hook 작성: 재사용 가능한 로직 분리

<br/>

## 📝 라이선스

이 프로젝트는 학습 목적으로 제작되었습니다.

<br/>
