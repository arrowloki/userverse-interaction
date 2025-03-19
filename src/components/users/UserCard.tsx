
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, UserCheck, UserMinus, UserX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { User } from '@/services/api';
import { format } from 'date-fns';

interface UserCardProps {
  user: User;
  onDelete: (id: number) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
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
  }[user.status];

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md animate-scale-in">
      <CardContent className="p-0">
        <div className="pt-6 pb-4 px-6 flex flex-col items-center">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
            <AvatarFallback>{`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}</AvatarFallback>
          </Avatar>
          
          <h3 className="text-lg font-medium">{`${user.first_name} ${user.last_name}`}</h3>
          <p className="text-sm text-muted-foreground mb-3">{user.email}</p>
          
          <div className="flex space-x-2 mb-3">
            <Badge className={roleColors[user.role] || ''} variant="outline">
              {user.role}
            </Badge>
            <Badge className={statusColors[user.status] || ''} variant="outline">
              <StatusIcon className="h-3 w-3 mr-1" />
              {user.status}
            </Badge>
          </div>
        </div>
      </CardContent>
      
      <div className="px-6 py-3 bg-muted/30">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="text-muted-foreground">Created</p>
            <p className="font-medium">{format(new Date(user.created_at), 'MMM d, yyyy')}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Last Login</p>
            <p className="font-medium">
              {user.last_login ? format(new Date(user.last_login), 'MMM d, yyyy') : 'Never'}
            </p>
          </div>
        </div>
      </div>
      
      <CardFooter className="p-3 bg-card flex justify-between">
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/users/${user.id}`}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Link>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => onDelete(user.id)}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
