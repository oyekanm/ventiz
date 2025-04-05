// // 1. First, create an API function to handle the event creation
// // api.js
// export async function createEvent(eventData) {
//     try {
//       const response = await fetch('/api/events', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(eventData),
//       });
      
//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error('Error creating event:', error);
//       // Return a special object to indicate the request failed but might still be processing
//       return { status: 'pending', error: error.message };
//     }
//   }
  
//   // 2. Create a hook for event management with SWR
//   // hooks/useEvents.js
//   import useSWR, { mutate } from 'swr';
//   import { createEvent } from '../api';
  
//   export function useEvents() {
//     const { data: events, error, isLoading } = useSWR('/api/events');
    
//     const addEvent = async (eventData) => {
//       // Show optimistic UI update
//       const optimisticData = [...(events || []), { ...eventData, id: 'temp-id', status: 'creating' }];
      
//       // Update the cache optimistically
//       mutate('/api/events', optimisticData, false);
      
//       try {
//         // Attempt to create the event
//         const result = await createEvent(eventData);
        
//         if (result.status === 'pending') {
//           // If we got a timeout but the operation might still be processing
//           // Set up a check to poll for the event after a delay
//           setTimeout(() => checkForNewEvent(eventData), 3000);
//           return { success: false, pending: true };
//         }
        
//         // If successful, update the cache with the real data
//         mutate('/api/events');
//         return { success: true };
//       } catch (error) {
//         // On error, revert the optimistic update
//         mutate('/api/events', events);
//         return { success: false, error };
//       }
//     };
    
//     // Function to check if an event was actually created despite timeout
//     const checkForNewEvent = async (eventData) => {
//       try {
//         // You might need a separate endpoint or query parameter to find a specific event
//         const refreshedEvents = await fetch('/api/events?latest=true').then(res => res.json());
//         mutate('/api/events', refreshedEvents);
//       } catch (error) {
//         console.error('Error checking for new event:', error);
//       }
//     };
    
//     return {
//       events,
//       isLoading,
//       error,
//       addEvent
//     };
//   }
  
//   // 3. Example component using the hook
//   // components/EventForm.js
//   import { useState } from 'react';
//   import { useEvents } from '../hooks/useEvents';
  
//   export default function EventForm() {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [status, setStatus] = useState('idle'); // idle, submitting, success, error, pending
//     const { addEvent } = useEvents();
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setStatus('submitting');
      
//       const eventData = { title, description };
//       const result = await addEvent(eventData);
      
//       if (result.success) {
//         setStatus('success');
//         setTitle('');
//         setDescription('');
//       } else if (result.pending) {
//         setStatus('pending');
//         // We'll show a message that it's processing
//       } else {
//         setStatus('error');
//       }
//     };
  
//     return (
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="title">Title</label>
//           <input
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
        
//         <div>
//           <label htmlFor="description">Description</label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>
        
//         <button type="submit" disabled={status === 'submitting'}>
//           {status === 'submitting' ? 'Creating...' : 'Create Event'}
//         </button>
        
//         {status === 'pending' && (
//           <p className="text-orange-500">
//             Your event is being processed. It may take a moment to appear. Please don't submit again.
//           </p>
//         )}
        
//         {status === 'success' && (
//           <p className="text-green-500">Event created successfully!</p>
//         )}
        
//         {status === 'error' && (
//           <p className="text-red-500">There was an error creating your event. Please try again.</p>
//         )}
//       </form>
//     );
//   }