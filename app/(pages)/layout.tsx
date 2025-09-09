import Navbar from "@/components/home/header/navbar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default layout;
