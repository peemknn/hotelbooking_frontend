import SideTab from "@/components/SideTab";

export default function SideTabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SideTab />
      <div className="w-full mx-auto max-w-[700px] px-8 relative pb-1">
        {children}
      </div>
    </>
  );
}
