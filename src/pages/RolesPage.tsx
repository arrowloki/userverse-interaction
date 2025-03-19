
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Lock, Plus, Save, ShieldAlert, ShieldCheck, Users } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
}

const RolesPage = () => {
  // Sample permissions data
  const [permissions] = useState<Permission[]>([
    { id: 'p1', name: 'users:read', description: 'View user information', category: 'Users' },
    { id: 'p2', name: 'users:create', description: 'Create new users', category: 'Users' },
    { id: 'p3', name: 'users:update', description: 'Edit user information', category: 'Users' },
    { id: 'p4', name: 'users:delete', description: 'Delete users from the system', category: 'Users' },
    { id: 'p5', name: 'roles:read', description: 'View roles and permissions', category: 'Roles' },
    { id: 'p6', name: 'roles:create', description: 'Create new roles', category: 'Roles' },
    { id: 'p7', name: 'roles:update', description: 'Edit roles and their permissions', category: 'Roles' },
    { id: 'p8', name: 'roles:delete', description: 'Delete roles from the system', category: 'Roles' },
    { id: 'p9', name: 'reports:read', description: 'View analytics reports', category: 'Reports' },
    { id: 'p10', name: 'reports:export', description: 'Export analytics reports', category: 'Reports' },
    { id: 'p11', name: 'settings:read', description: 'View system settings', category: 'Settings' },
    { id: 'p12', name: 'settings:update', description: 'Update system settings', category: 'Settings' },
  ]);

  // Sample roles data
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'r1',
      name: 'Administrator',
      description: 'Full system access',
      permissions: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12'],
      userCount: 2,
    },
    {
      id: 'r2',
      name: 'Editor',
      description: 'Can manage content but not administrative functions',
      permissions: ['p1', 'p3', 'p5', 'p9', 'p11'],
      userCount: 5,
    },
    {
      id: 'r3',
      name: 'User',
      description: 'Basic access to the system',
      permissions: ['p1', 'p5', 'p9'],
      userCount: 15,
    },
  ]);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
    setNewRoleName(role.name);
    setNewRoleDescription(role.description);
    setSelectedPermissions([...role.permissions]);
    setIsEditing(false);
  };

  const handleTogglePermission = (permissionId: string) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleCreateRole = () => {
    setSelectedRole(null);
    setNewRoleName('');
    setNewRoleDescription('');
    setSelectedPermissions([]);
    setIsEditing(true);
  };

  const handleEditRole = () => {
    setIsEditing(true);
  };

  const handleSaveRole = () => {
    if (!newRoleName.trim()) {
      toast({
        title: "Error",
        description: "Role name is required",
        variant: "destructive",
      });
      return;
    }

    if (isEditing && !selectedRole) {
      // Create new role
      const newRole: Role = {
        id: `r${roles.length + 1}`,
        name: newRoleName,
        description: newRoleDescription,
        permissions: selectedPermissions,
        userCount: 0,
      };
      
      setRoles([...roles, newRole]);
      setSelectedRole(newRole);
      toast({
        title: "Success",
        description: `Role "${newRoleName}" created successfully`,
      });
    } else if (selectedRole) {
      // Update existing role
      const updatedRoles = roles.map(role => 
        role.id === selectedRole.id
          ? { ...role, name: newRoleName, description: newRoleDescription, permissions: selectedPermissions }
          : role
      );
      
      setRoles(updatedRoles);
      setSelectedRole({
        ...selectedRole,
        name: newRoleName,
        description: newRoleDescription,
        permissions: selectedPermissions,
      });
      
      toast({
        title: "Success",
        description: `Role "${newRoleName}" updated successfully`,
      });
    }
    
    setIsEditing(false);
  };

  // Group permissions by category
  const permissionsByCategory = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  // Filter permissions by search term
  const filteredPermissions = searchTerm
    ? permissions.filter(
        permission => 
          permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          permission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          permission.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : permissions;

  // Group filtered permissions by category
  const filteredPermissionsByCategory = filteredPermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    acc[permission.category].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Roles & Permissions</h1>
          <p className="text-muted-foreground">Manage user roles and their access privileges</p>
        </div>
        <Button onClick={handleCreateRole}>
          <Plus className="h-4 w-4 mr-2" />
          New Role
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Roles</CardTitle>
            <CardDescription>Select a role to view or edit its permissions</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px]">
              {roles.map(role => (
                <div 
                  key={role.id}
                  className={`flex items-center justify-between p-4 cursor-pointer border-b last:border-0 hover:bg-secondary/50 transition-colors ${selectedRole?.id === role.id ? 'bg-secondary' : ''}`}
                  onClick={() => handleSelectRole(role)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${selectedRole?.id === role.id ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                      {role.name === 'Administrator' ? <ShieldCheck className="h-5 w-5" /> : 
                       role.name === 'Editor' ? <ShieldAlert className="h-5 w-5" /> : 
                       <Lock className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="font-medium">{role.name}</p>
                      <p className="text-xs text-muted-foreground">{role.userCount} users</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">{role.permissions.length} permissions</Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="lg:col-span-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>
                  {selectedRole 
                    ? isEditing 
                      ? 'Edit Role' 
                      : selectedRole.name 
                    : isEditing 
                      ? 'Create New Role' 
                      : 'Role Details'}
                </CardTitle>
                <CardDescription>
                  {selectedRole 
                    ? isEditing 
                      ? 'Modify role details and permissions' 
                      : selectedRole.description 
                    : isEditing 
                      ? 'Define a new role and its permissions' 
                      : 'Select a role to view details'}
                </CardDescription>
              </div>
              {selectedRole && !isEditing && (
                <Button variant="outline" onClick={handleEditRole}>
                  Edit Role
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {(selectedRole || isEditing) ? (
              <div className="space-y-6">
                {isEditing && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Role Name</label>
                      <Input
                        value={newRoleName}
                        onChange={(e) => setNewRoleName(e.target.value)}
                        placeholder="Enter role name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Input
                        value={newRoleDescription}
                        onChange={(e) => setNewRoleDescription(e.target.value)}
                        placeholder="Enter role description"
                      />
                    </div>
                  </div>
                )}

                <Separator />

                <Tabs defaultValue="byCategory">
                  <div className="flex justify-between items-center mb-4">
                    <TabsList>
                      <TabsTrigger value="byCategory">By Category</TabsTrigger>
                      <TabsTrigger value="all">All Permissions</TabsTrigger>
                    </TabsList>
                    <div className="relative w-[200px]">
                      <Input
                        placeholder="Search permissions"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                      </svg>
                    </div>
                  </div>

                  <TabsContent value="byCategory" className="mt-0">
                    <ScrollArea className="h-[300px] pr-4">
                      {Object.keys(filteredPermissionsByCategory).length > 0 ? (
                        Object.entries(filteredPermissionsByCategory).map(([category, perms]) => (
                          <div key={category} className="mb-6">
                            <h3 className="font-medium mb-2">{category}</h3>
                            <div className="space-y-3">
                              {perms.map(permission => (
                                <div key={permission.id} className="flex items-center justify-between">
                                  <div>
                                    <p className="text-sm font-medium">{permission.name}</p>
                                    <p className="text-xs text-muted-foreground">{permission.description}</p>
                                  </div>
                                  {isEditing ? (
                                    <Switch
                                      checked={selectedPermissions.includes(permission.id)}
                                      onCheckedChange={() => handleTogglePermission(permission.id)}
                                    />
                                  ) : (
                                    <Badge 
                                      variant={selectedRole?.permissions.includes(permission.id) ? "default" : "outline"}
                                      className={selectedRole?.permissions.includes(permission.id) ? "" : "text-muted-foreground"}
                                    >
                                      {selectedRole?.permissions.includes(permission.id) ? "Granted" : "No Access"}
                                    </Badge>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                          <p className="text-muted-foreground">No permissions found matching your search.</p>
                        </div>
                      )}
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="all" className="mt-0">
                    <ScrollArea className="h-[300px] pr-4">
                      <div className="space-y-3">
                        {filteredPermissions.length > 0 ? (
                          filteredPermissions.map(permission => (
                            <div key={permission.id} className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center">
                                  <p className="text-sm font-medium">{permission.name}</p>
                                  <Badge variant="outline" className="ml-2 text-xs">{permission.category}</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">{permission.description}</p>
                              </div>
                              {isEditing ? (
                                <Switch
                                  checked={selectedPermissions.includes(permission.id)}
                                  onCheckedChange={() => handleTogglePermission(permission.id)}
                                />
                              ) : (
                                <Badge 
                                  variant={selectedRole?.permissions.includes(permission.id) ? "default" : "outline"}
                                  className={selectedRole?.permissions.includes(permission.id) ? "" : "text-muted-foreground"}
                                >
                                  {selectedRole?.permissions.includes(permission.id) ? "Granted" : "No Access"}
                                </Badge>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="flex flex-col items-center justify-center py-8 text-center">
                            <p className="text-muted-foreground">No permissions found matching your search.</p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Role Selected</h3>
                <p className="text-sm text-muted-foreground max-w-md mb-6">
                  Select a role from the list or create a new one to view and manage its permissions.
                </p>
                <Button onClick={handleCreateRole}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Role
                </Button>
              </div>
            )}
          </CardContent>
          {(selectedRole || isEditing) && isEditing && (
            <CardFooter className="border-t px-6 py-4 flex justify-between">
              <Button variant="outline" onClick={() => {
                setIsEditing(false);
                if (!selectedRole) {
                  setNewRoleName('');
                  setNewRoleDescription('');
                  setSelectedPermissions([]);
                } else {
                  setNewRoleName(selectedRole.name);
                  setNewRoleDescription(selectedRole.description);
                  setSelectedPermissions([...selectedRole.permissions]);
                }
              }}>
                Cancel
              </Button>
              <Button onClick={handleSaveRole}>
                <Save className="h-4 w-4 mr-2" />
                {selectedRole ? 'Update Role' : 'Create Role'}
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default RolesPage;
