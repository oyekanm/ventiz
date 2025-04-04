export const validateBasicInfo = (formData: Partial<EventData>) => {
  const errors = {} as any;

  if (!formData?.url?.length) {
    errors.url = "Event cover image is required";
  }

  if (!formData.name?.trim()) {
    errors.eventName = "Event name is required";
  }

  if (!formData.location?.trim()) {
    errors.eventLocation = "Event location is required";
  }

  if (!formData.description?.trim()) {
    errors.eventDescription = "Event description is required";
  }
  // else if (formData.eventDescription.length > 1000) {
  //   errors.eventDescription = 'Description should be less than 1000 characters';
  // }

  if (!formData.startDate) {
    errors.startDate = "Start date is required";
  }

  if (!formData.startTime) {
    errors.startTime = "Start time is required";
  }

  if (!formData.endDate) {
    errors.endDate = "End date is required";
  }

  if (!formData.endTime) {
    errors.endTime = "End time is required";
  }

  if (!formData.eventType) {
    errors.eventType = "Event type is required";
  }
  if (!formData.eventTag) {
    errors.eventTag = "Event type is required";
  }

  return errors;
};

export const validateTicketInfo = (formData: ticket) => {
  const errors = {} as any;

  if (!formData.type) {
    errors.ticketType = "Ticket type is required";
  }

  if (!formData.salesStartDate) {
    errors.salesStartDate = "Sales start date is required";
  }

  if (!formData.salesEndDate) {
    errors.salesEndDate = "Sales end date is required";
  }
  if (!formData.salesStartTime) {
    errors.salesStartTime = "Sales start time is required";
  }

  if (!formData.salesEndTime) {
    errors.salesEndTime = "Sales end time is required";
  }

  // If ticket type is not free, validate price fields
  if (!formData.free) {
    if (!formData.price || formData.price <= 0) {
      errors.ticketPrice = "Valid ticket price is required";
    }
  }

  if (!formData.description?.trim()) {
    errors.ticketDescription = "Ticket description is required";
  }

  if (!formData.quantity || formData.quantity <= 0) {
    errors.quantity = "Ticket quantity is required";
  }

  return errors;
};

export const validateTicketsArray = (ticketsArray: ticket[]) => {
  if (!ticketsArray || ticketsArray.length === 0) {
    return { tickets: "At least one ticket type is required" };
  }

  const errors: any = [];

  ticketsArray.forEach((ticket, index) => {
    const ticketErrors: any = {};

    if (!ticket.type) {
      ticketErrors.ticketType = "Ticket type is required";
    }

    if (!ticket.salesStartDate) {
      ticketErrors.salesStartDate = "Sales start date is required";
    }

    if (!ticket.salesEndDate) {
      ticketErrors.salesEndDate = "Sales end date is required";
    }
    if (!ticket.salesStartTime) {
      ticketErrors.salesStartTime = "Sales start time is required";
    }

    if (!ticket.salesEndTime) {
      ticketErrors.salesEndTime = "Sales end time is required";
    }

    // If ticket type is not free, validate price fields
    if (!ticket.free) {
      if (!ticket.price || ticket.price <= 0) {
        ticketErrors.ticketPrice = "Valid ticket price is required";
      }
    }

    if (!ticket.description?.trim()) {
      ticketErrors.ticketDescription = "Ticket description is required";
    }

    if (!ticket.quantity) {
      ticketErrors.quantity = "Ticket quantity is required";
    }
    if (Object.keys(ticketErrors).length > 0) {
      errors[index] = ticketErrors;
    }
  });

  return errors.length > 0 ? { tickets: errors } : {};
};

export const validatePublishSettings = (formData: Partial<EventData>) => {
  const errors: any = {};

  if (formData.visibility === "private") {
    if (!formData.privateVisibilityOptions?.password) {
      errors.password = "Password is required for private event";
    }
  }

  if (formData.publish !== "now") {
    if (!formData.publishSchedule.startDate) {
      errors.startDate = "Start date is required for scheduled event";
    }

    if (!formData.publishSchedule.startTime) {
      errors.startTime = "Start time is required for scheduled event";
    }
  }

  return errors;
};
