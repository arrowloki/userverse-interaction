
import React from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Edit, 
  Trash2,
  ChevronDown,
  UserCheck,
  UserMinus,
  UserX,
  MoreHorizontal
} from 'lucide-react';
import { User } from '@/services/api';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserTableProps {
  users: User[];
  onDelete: (id: number) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onDelete }) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800 hover:bg-green-200',
    inactive: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
    pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  };

  const roleColors = {
    admin: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    user: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    editor: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
  };

  const StatusIcon = {
    active: UserCheck,
    inactive: UserMinus,
    pending: UserX,
  };

  return (
    <div className="rounded-lg border overflow-hidden animate-fade-in">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="w-[50px]">#</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const CurrentStatusIcon = StatusIcon[user.status];
            
            return (
              <TableRow key={user.id} className="hover:bg-muted/20 transition-colors">
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
                      <AvatarFallback>{`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{`${user.first_name} ${user.last_name}`}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={roleColors[user.role] || ''} variant="outline">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[user.status] || ''} variant="outline">
                    <CurrentStatusIcon className="h-3 w-3 mr-1" />
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{format(new Date(user.created_at), 'MMM d, yyyy')}</TableCell>
                <TableCell>
                  {user.last_login ? format(new Date(user.last_login), 'MMM d, yyyy') : 'Never'}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to={`/users/${user.id}`} className="cursor-pointer">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive cursor-pointer"
                        onClick={() => onDelete(user.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
