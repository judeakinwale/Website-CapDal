import Footer from "./footer";
import Header from "./header";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-screen bg-green-400">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
