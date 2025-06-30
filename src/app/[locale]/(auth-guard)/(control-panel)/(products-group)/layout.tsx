export default function ProductsGroupLayout({
  children,
  dialog,
}: {
  children: React.ReactNode;
  dialog: React.ReactNode;
}) {
  return (
    <>
      {children}
      {dialog}
    </>
  );
}
