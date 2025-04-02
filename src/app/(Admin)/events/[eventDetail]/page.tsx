
import { SingleEventDetail } from '@/features/events/components';
import { GetSingleEvent, GetSingleEventAttendies } from '@/services/eventService';


type Props = {
  params: { eventDetail: string }
}

export const dynamic = 'force-dynamic';

const EventDetailsPage = async ({ params }: Props) => {
  const { eventDetail } =  params

  

  const data = await GetSingleEvent(eventDetail)
  const attend = await GetSingleEventAttendies(eventDetail);
  
  // console.log(eventDetail, data, attend)
  return (
    <SingleEventDetail 
    attendee={attend} eventD={data}
     eventDetail={eventDetail} />
  );
};

export default EventDetailsPage;