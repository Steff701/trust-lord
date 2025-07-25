import {Redirect} from 'expo-router';
import {useAuth} from 'services/auth';
import {useEffect} from "react";

export default function Index() {
  const {user, loading} = useAuth();

  if (loading) {
    return null; // Show splash screen
  }

  if (!user) {
    return <Redirect href="/(auth)/onboarding"/>;
  }

  const userRole = user.roles[0]; // Get the primary role from the roles array

  useEffect(() => {
    console.log('user role', userRole);
  }, [])

  if (userRole === 'landlord') {
    return <Redirect href="/(app)/(landlord)"/>;
  } else {
    return <Redirect href="/(app)/(tenant)"/>;
  }

}