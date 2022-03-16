import NavBar from "./Navbar";

export default function Layout({ children }) {
  // children은 react.js가 제공하는 prop
  // 하나의 component를 또 다른 comonent 안에 넣어줄 수 있다
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}
