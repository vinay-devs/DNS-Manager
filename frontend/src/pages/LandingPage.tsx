import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Quotes } from "../components/Quote";

export const LandingPage = () => {
  return (
    <>
      <div className=" h-screen flex flex-col bg-slate-100 ">
        <Navbar />
        <Quotes />
        <Footer />
      </div>
    </>
  );
};
