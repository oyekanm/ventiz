import { EventPageContainer } from '@/features/events/components';

// export const dynamic = 'force-dynamic';

// // Set revalidation settings to ensure data freshness
// export const revalidate = 0; 
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
