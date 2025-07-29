import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientWrapper from "../../ClientWrapper";

export const metadata: Metadata = {
  title: {
    template: "%s - Shopcart online store",
    default: "Shopcart online store",
  },
  description: "Shopcart online store, Your one stop shop for all your needs",
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientWrapper>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </ClientWrapper>
  );
}
