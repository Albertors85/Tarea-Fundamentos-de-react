import Footer from "./footer.js";
import Header from "./header.js";

export default function Layout({ title, children }) {
  return (
    <div>
      <Header />
      <main>
        <h2>{title}</h2>
        {children}
      </main>
      <Footer />
    </div>
  );
}
