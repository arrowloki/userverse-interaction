
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import { AppShell } from "@/components/layout/AppShell";
import Dashboard from "@/pages/Dashboard";
import UserList from "@/pages/UserList";
import UserForm from "@/pages/UserForm";
import RolesPage from "@/pages/RolesPage";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import { ThemeProvider } from "@/context/ThemeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <UserProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppShell>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/users/new" element={<UserForm />} />
                <Route path="/users/:id" element={<UserForm />} />
                <Route path="/roles" element={<RolesPage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AppShell>
          </BrowserRouter>
        </UserProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
