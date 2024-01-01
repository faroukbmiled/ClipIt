import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const UserProfile = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId) {
          const response = await axios.get(`/api/user/${userId}`);
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userId]);

  if (!userId) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
};

export default UserProfile;
