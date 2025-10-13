export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <div className="fixed top-4 right-4 z-50">
        Switch
      </div>

      {children}
    </div>
  );
}
