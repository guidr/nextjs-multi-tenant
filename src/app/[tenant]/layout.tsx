import { ThemeSwitcher } from '@/components/theme-switcher';

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <div className="fixed top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>

      {children}
    </div>
  );
}
