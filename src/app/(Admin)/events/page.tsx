import { EventPageContainer } from '@/features/events/components';
import { fetchAllData } from '@/lib/fetchAll';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';

const EventsManagement =  async() => {
  // const session = await getServerSession(authOptions);
  // if(session){
  //   console.log(session)
  // }
  // const cookieStore = cookies();
  // const user = JSON.parse(cookieStore.get('user')?.value || "{}");

  // if(user){
  //   console.log(user)
  // }

  // const appData = await fetchAllData();
  
  // console.log(appData)
  return (
      <EventPageContainer />
  );
};

export default EventsManagement;
