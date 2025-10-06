import { useState } from "react";
import { Globe, User, LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Explore", href: "#explore" },
  { label: "Islanders", href: "#islanders" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Profile", href: "#profile" },
];

export const Navigation = () => {
  const [activeTab, setActiveTab] = useState("Explore");
  const username = "User";

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="bg-background/70 backdrop-blur-xl border border-border/50 rounded-2xl px-6 py-3 shadow-2xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Globe className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Indie Island
            </span>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.label);
                }}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === item.label
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* User Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200">
                <span className="text-primary-foreground font-bold">
                  {username.charAt(0)}
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-xl border-border/50">
              <div className="px-2 py-2">
                <p className="text-sm font-medium">{username}</p>
                <p className="text-xs text-muted-foreground">user@indieisland.com</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
