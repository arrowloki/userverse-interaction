
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  SidebarProvider,
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Users, 
  UserPlus, 
  Settings, 
  LogOut, 
  Home, 
  ChevronRight, 
  PieChart,
  ShieldCheck,
  Bell
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const navItems = [
    { title: 'Dashboard', icon: Home, path: '/' },
    { title: 'Users', icon: Users, path: '/users' },
    { title: 'Create User', icon: UserPlus, path: '/users/new' },
    { title: 'Roles & Permissions', icon: ShieldCheck, path: '/roles' },
    { title: 'Settings', icon: Settings, path: '/settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <SidebarProvider>
      <div className={`min-h-screen flex w-full bg-background ${loaded ? 'animate-fade-in' : 'opacity-0'}`}>
        <Sidebar className="border-r border-border">
          <SidebarHeader className="px-6 py-5 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-accent rounded-md flex items-center justify-center">
                <Users className="h-5 w-5 text-accent-foreground" />
              </div>
              <h1 className="text-xl font-semibold tracking-tight">UserOS</h1>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-2">
                MAIN MENU
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton asChild className={`${isActive(item.path) ? 'bg-accent text-accent-foreground' : 'hover:bg-secondary'}`}>
                        <Link to={item.path} className="flex items-center justify-between">
                          <span className="flex items-center">
                            <item.icon className="h-4 w-4 mr-3" />
                            <span>{item.title}</span>
                          </span>
                          {isActive(item.path) && <ChevronRight className="h-4 w-4" />}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <Separator className="my-4" />
            
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-2">
                ACCOUNT
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-4 py-3 rounded-lg glass subtle-hover">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src="https://reqres.in/img/faces/2-image.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Janet Weaver</p>
                        <p className="text-xs text-muted-foreground">Administrator</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="secondary" size="sm" className="flex-1 h-8">
                      <Settings className="h-3 w-3 mr-1" />
                      <span className="text-xs">Profile</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 h-8">
                      <LogOut className="h-3 w-3 mr-1" />
                      <span className="text-xs">Logout</span>
                    </Button>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="p-4">
            <div className="text-xs text-center text-muted-foreground">
              <p>UserOS v1.0</p>
              <p>© 2023 All rights reserved</p>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center">
              <SidebarTrigger className="lg:hidden mr-4">
                <Button variant="outline" size="icon">
                  <Users className="h-4 w-4" />
                </Button>
              </SidebarTrigger>
              <h2 className="text-lg font-medium">User Management</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-accent rounded-full"></span>
              </Button>
              
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://reqres.in/img/faces/2-image.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </header>
          
          <main className="flex-1 overflow-auto">
            <div className="container py-6 px-4 lg:px-6 mx-auto max-w-6xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
