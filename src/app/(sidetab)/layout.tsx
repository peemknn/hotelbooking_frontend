import SideTab from "@/components/SideTab";

export default function SideTabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SideTab />
      <div className="w-full mx-auto max-w-[700px] px-10 relative pt-7">
        {children}
      </div>
    </>
  );
}
