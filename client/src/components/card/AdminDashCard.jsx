import React, { useEffect, useState } from 'react'
import AdminDetailCard from './AdminDetailCard'
import { getAppointments } from '../../api/api'

function AdminDashCard() {
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchAppointments = async () => {
      try {
        const response = await getAppointments();
        if (!isMounted) return;
        const appointments = response?.data || [];
        setAppointmentsCount(appointments.length);

        const today = new Date();
        const todayKey = today.toISOString().split('T')[0];
        const todayTotal = appointments.filter((appt) => {
          if (!appt?.preferredDate) return false;
          const apptKey = new Date(appt.preferredDate).toISOString().split('T')[0];
          return apptKey === todayKey;
        }).length;
        setTodayCount(todayTotal);
      } catch (error) {
        if (isMounted) {
          setAppointmentsCount(0);
          setTodayCount(0);
        }
      }
    };

    fetchAppointments();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className='flex flex-wrap gap-4 w-full p-4 justify-center'>
        <AdminDetailCard details='2000' title='Total Sales'/>
        <AdminDetailCard details='12' title='Pending Orders'/>
        <AdminDetailCard details={appointmentsCount} title='Total Appointments'/>
        <AdminDetailCard details={todayCount} title='Appointments Today'/>
             
    </div>
  )
}

export default AdminDashCard
