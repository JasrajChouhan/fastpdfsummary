import { FileText } from 'lucide-react';
import { NavLink } from '@/components/commons/nav-link';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';

export const Header = () => {
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 mx-auto px-2">
      <div className="flex lg:flex-1 ">
        <NavLink href="/" className="flex items-center gap-1 lg:gap-3 shrink ">
          <FileText className="h-5 w-5 lg:h-8 lg:w-8 text-gray-900 hover:rotate-12 transform transition ease-in-out duration-200" />
          <span className="text-gray-900">Vinama</span>
        </NavLink>
      </div>

      <div className="flex gap-4 lg:gap-8 lg:justify-center lg:items-center">
        <NavLink href="/#pricing">
          <span className="text-gray-900">Pricing</span>
        </NavLink>
        <SignedIn>
          <NavLink href="/dashboard">
            <span>Your summary</span>
          </NavLink>
        </SignedIn>
      </div>

      <div className="flex gap-1 lg:gap-4 lg:flex-1 lg:justify-end">
        <SignedIn>
          <div className="flex gap-2 lg:items-center">
            <NavLink href="/upload">
              <span>Upload</span>
            </NavLink>
            <div>Pro</div>

            <UserButton />
          </div>
        </SignedIn>

        <SignedOut>
          <SignInButton forceRedirectUrl={'/post-login'}>
            <span className="relative inline-block px-6 py-2 cursor-pointer rounded-2xl font-semibold text-rose-600 bg-rose-200 hover:bg-rose-300/80 transition-colors duration-300 overflow-hidden group">
              <span className="relative z-10">Login</span>
            </span>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
};
