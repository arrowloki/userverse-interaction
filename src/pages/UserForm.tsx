
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUsers } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const userFormSchema = z.object({
  first_name: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  last_name: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  avatar: z.string().optional(),
  role: z.enum(['admin', 'user', 'editor']),
  status: z.enum(['active', 'inactive', 'pending']),
});

type UserFormValues = z.infer<typeof userFormSchema>;

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id !== undefined;
  const { createUser, updateUser, fetchUser } = useUsers();
  const [loading, setLoading] = useState(isEditing);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      avatar: '',
      role: 'user',
      status: 'active',
    },
  });

  useEffect(() => {
    const loadUser = async () => {
      if (isEditing && id) {
        setLoading(true);
        try {
          const user = await fetchUser(parseInt(id));
          if (user) {
            form.reset({
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              avatar: user.avatar,
              role: user.role,
              status: user.status,
            });
            setAvatarPreview(user.avatar);
          } else {
            toast({
              title: "Error",
              description: "User not found",
              variant: "destructive",
            });
            navigate('/users');
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadUser();
  }, [id, isEditing, fetchUser, form, navigate]);

  const onSubmit = async (data: UserFormValues) => {
    setLoading(true);
    
    try {
      let success;
      
      if (isEditing && id) {
        success = await updateUser(parseInt(id), data);
      } else {
        success = await createUser(data);
      }
      
      if (success) {
        navigate('/users');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Update avatar preview when form changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'first_name' || name === 'last_name') {
        // If no avatar is provided, update the fallback preview
        if (!form.watch('avatar')) {
          setAvatarPreview(null);
        }
      } else if (name === 'avatar') {
        setAvatarPreview(value.avatar || null);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch]);

  // Generate random avatar URLs for demo
  const generateRandomAvatar = () => {
    const randomId = Math.floor(Math.random() * 12) + 1;
    const avatarUrl = `https://reqres.in/img/faces/${randomId}-image.jpg`;
    form.setValue('avatar', avatarUrl);
    setAvatarPreview(avatarUrl);
  };

  if (loading && isEditing) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary/70" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link to="/users">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{isEditing ? 'Edit User' : 'Create User'}</h1>
          <p className="text-muted-foreground">{isEditing ? 'Update user information' : 'Add a new user to the system'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>Enter the user's details below</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Avatar URL</FormLabel>
                      <div className="flex gap-3">
                        <FormControl>
                          <Input placeholder="https://example.com/avatar.jpg" {...field} />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={generateRandomAvatar}
                        >
                          Random
                        </Button>
                      </div>
                      <FormDescription>
                        Enter a URL for the user's avatar image
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="admin">Administrator</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="user">Regular User</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    <Save className="h-4 w-4 mr-2" />
                    {isEditing ? 'Update User' : 'Create User'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Preview</CardTitle>
            <CardDescription>Preview how the user will appear</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-6">
            <Avatar className="h-32 w-32 mb-6">
              <AvatarImage src={avatarPreview || undefined} />
              <AvatarFallback className="text-2xl">
                {form.watch('first_name')?.[0] || ''}
                {form.watch('last_name')?.[0] || ''}
              </AvatarFallback>
            </Avatar>
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-medium">
                {form.watch('first_name') || 'First'} {form.watch('last_name') || 'Last'}
              </h3>
              <p className="text-muted-foreground">{form.watch('email') || 'email@example.com'}</p>
            </div>
            
            <div className="flex space-x-2 mb-2">
              <div className={`
                px-2 py-1 text-xs font-medium rounded-full
                ${form.watch('role') === 'admin' ? 'bg-purple-100 text-purple-800' : 
                  form.watch('role') === 'editor' ? 'bg-indigo-100 text-indigo-800' : 
                  'bg-blue-100 text-blue-800'}
              `}>
                {form.watch('role') === 'admin' ? 'Administrator' : 
                 form.watch('role') === 'editor' ? 'Editor' : 'Regular User'}
              </div>
              <div className={`
                px-2 py-1 text-xs font-medium rounded-full
                ${form.watch('status') === 'active' ? 'bg-green-100 text-green-800' : 
                  form.watch('status') === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-gray-100 text-gray-800'}
              `}>
                {form.watch('status')}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-4">
            <p className="text-xs text-muted-foreground">
              {isEditing ? 'User will be updated with these details' : 'New user will be created with these details'}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UserForm;
