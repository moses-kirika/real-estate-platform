import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
        </>
    );
}
