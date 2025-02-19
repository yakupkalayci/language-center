import Header from "./header/Header";

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer>Footer</footer>
    </>
  );
}

export default DefaultLayout;
