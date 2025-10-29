import "./App.css";
import ContactForm from "./component/Contactform";
import ContactList from "./component/ContactList";

function App() {
  /*
  1. 왼쪽에는 연락처 등록하는 폼이, 오른쪽에는 연락처 리스트와 search 창이 있다
  2. 리스트에 유저 이름과 전화번호를 추가할 수 있다
  3. 리스트에 아이템이 몇 개 있는지 보인다
  4. 사용자가 유저를 이름 검색으로 찾을 수 있다
  */
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="">연락처</h1>
        <section className="flex justify-center">
          <article className="flex justify-center">
            <ContactForm />
            <ContactList />
          </article>
        </section>
      </div>
    </>
  );
}

export default App;
