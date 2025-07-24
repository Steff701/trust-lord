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

  const userRole = user.role; // This will come from your user data

  useEffect(() => {
    console.log('user role', userRole);
  }, [])

  if (userRole === 'landlord') {
    return <Redirect href="/(app)/(landlord)"/>;
  } else {
    return <Redirect href="/(app)/(tenant)"/>;
  }

}