"use client"

import { BillingsTab, EventTicketingSettings, IntegrationsTab, MyAccount, NotificationTab, SecuritySettings } from '@/features/settings/components';
import { useState } from 'react';



const SettingsContainer = () => {
  const [activeTab, setActiveTab] = useState("My account")

  return (
    <div>
        {activeTab === 'My account' && <MyAccount activeTab={activeTab} setActiveTab={setActiveTab} />}
        {activeTab === 'Security' && <SecuritySettings activeTab={activeTab} setActiveTab={setActiveTab}  />}
        {activeTab === 'Integrations' && <IntegrationsTab activeTab={activeTab} setActiveTab={setActiveTab}  />}
        {activeTab === 'Notification' && <NotificationTab activeTab={activeTab} setActiveTab={setActiveTab}  />}
        {activeTab === 'Billings' && <BillingsTab activeTab={activeTab} setActiveTab={setActiveTab}  />}
        {activeTab === 'Event & ticketing' && <EventTicketingSettings  activeTab={activeTab} setActiveTab={setActiveTab} />}
    </div>
  );
};

export default SettingsContainer;