interface EventData {
  // creatorEmail: string;
  creatorBusinessName: string;
  creatorId: string;
  description: string;
  endDate: string;
  endTime: string;
  eventTag: string[];
  eventType: string;
  giftLink: string;
  inviteOnly: boolean;
  location: string;
  name: string;
  privateVisibilityOptions: {
    linkAccess: boolean;
    passwordProtected: boolean;
    password: string;
  };
  publish: string;
  publishSchedule: any;
  startDate: string;
  startTime: string;
  tickets: ticket[];
  url: { id: number; link: string }[];
  visibility: string;
  _id: string;
  coupon: string;
  discount: string;
  expiryDate: string;
  expiryTime: string;
  maxRedemptions: number;
}

type ticket = {
  // createdAt: string;
  // eventId: string;
  description: string;
  free: boolean;
  price: number;
  quantity: number;
  salesEndDate: string;
  salesEndTime: string;
  salesStartDate: string;
  salesStartTime: string;
  type: string;
  // updatedAt: string;
  // __v: number;
  // _id: string;
};

type dispute = {
  adminDetails: { _id: string; email: string; fullName: string };
  message: string;
  status: string;
  timestamp: string;
  userDetails: { _id: string; email: string; fullName: string };
  userId: string;
  _id: string;
};

interface ModalProps {
  close: any;
}

interface User {
  email: string;
  role: string[];
  fullName: string;
  phone: string;
  lastLogin?: string;
  _id: string;
  categories: [];
  createdAt: string;
  facebook: string;
  industry: string[];
  instagram: string;
  isOnboard: boolean;
  isVerified: boolean;
  lastLogin: string;
  mfa: boolean;
  status: string;
  subscribe: boolean;
  token: string;
  updatedAt: string;
  url: string;
  x: string;
  businessName: string;
  sessionId: string;
  website: string;
  adminNotificationPreferences: adminPreference;
  userNotificationPreferences: userNotificationPreferences;
}
interface adminPreference {
  adminAndVendor: {
    newEventCreation: boolean;
    ticketSalesUpdate: boolean;
    lowTicketWarning: boolean;
    refundRequestAlert: boolean;
    newVendorApplicationApproval: boolean;
    paymentProcessing: boolean;
  };
  general: {
    types: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    enableNotifications: boolean;
  };
  ticketAndEvent: {
    ticketPurchase: boolean;
    eventCreation: boolean;
    eventReminder: boolean;
    refundDispute: boolean;
  };
  frequency: string[]
}

interface notifications {
  adminMessage: string;
  createdAt: string;
  email: string;
  generalMessage: {
    email: string;
    push: {
      title: string;
      body: string;
    };
  };
  isProtected: boolean;
  message: {
    email: string;
    push: {
      title: string;
      body: string;
    };
  };
  read: boolean;
  type: string;
  updatedAt: string;
  userId: string;
  _id: string;
}

interface Bookings {
  creator: { businessName: string; email: string };
  event: EventData;
  eventId: string;
  price: number;
  ticketId: string;
  ticketType: string;
  userId: string;
  _id: string;
}

interface Transactions {
  amount: number;
  amount_received: number;
  client_secret: string;
  createdAt: string;
  currency: string;
  customer: string;
  email: string;
  id: string;
  object: string;
  payment_method_types: string[];
  status: string;
  updatedAt: string;
  userId: string;
}
interface userNotificationPreferences {
  email: boolean;
  marketing: boolean;
  push: boolean;
  sms: boolean;
}

interface Payout {
  country: string;
  countryCurrency: string;
  owner: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  countryAddress: string;
  accountType: string;
  bankName: string;
  sortCode: number;
  accountNumber: number;
  isDefault: boolean;
}

interface Attendees {
  bookings: {
    creator: string;
    eventName: string;
    price: number;
    quantity: number;
    ticketId: string;
    ticketType: string;
  }[];
  email: string;
  fullName: string;
  userId: string;
}
