
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Film, Theater, CalendarDays, User, Ticket } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const adminModules = [
    {
      title: 'Movie Management',
      description: 'Add, edit or delete movies',
      icon: <Film size={40} />,
      color: 'bg-gradient-to-br from-red-500 to-pink-500',
      path: '/admin/movies',
    },
    {
      title: 'Theater Management',
      description: 'Manage theaters and cinema locations',
      icon: <Theater size={40} />,
      color: 'bg-gradient-to-br from-blue-500 to-purple-500',
      path: '/admin/theaters',
    },
    {
      title: 'Showtime Management',
      description: 'Schedule movie showtimes',
      icon: <CalendarDays size={40} />,
      color: 'bg-gradient-to-br from-green-500 to-teal-500',
      path: '/admin/showtimes',
    },
    {
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      icon: <User size={40} />,
      color: 'bg-gradient-to-br from-yellow-500 to-orange-500',
      path: '/admin/users',
    },
    {
      title: 'Booking Management',
      description: 'View and manage ticket bookings',
      icon: <Ticket size={40} />,
      color: 'bg-gradient-to-br from-purple-500 to-indigo-500',
      path: '/admin/bookings',
    },
  ];
  
  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-netflix-white mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminModules.map((module, index) => (
            <div
              key={index}
              className="bg-netflix-gray rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]"
            >
              <div className={`p-6 ${module.color} flex justify-center`}>
                <div className="text-white">
                  {module.icon}
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-semibold text-netflix-white mb-2">{module.title}</h2>
                <p className="text-sm text-netflix-white/70 mb-4">{module.description}</p>
                <Button 
                  className="w-full bg-netflix-red hover:bg-netflix-dark-red"
                  onClick={() => navigate(module.path)}
                >
                  Access
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
