import React, { useEffect, useState } from 'react';
import AdminDetailCard from './AdminDetailCard';
import { getAppointments, getHearingAids } from '../../api/api';

function AdminDashCard({ refreshKey = 0 }) {
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [todayAppointmentsCount, setTodayAppointmentsCount] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
      try {
        const [appointmentsResponse, hearingAidsResponse] = await Promise.all([
          getAppointments(),
          getHearingAids(),
        ]);

        if (!isMounted) return;

        const appointments = appointmentsResponse?.data || [];
        const hearingAids = hearingAidsResponse?.data || [];

        setAppointmentsCount(appointments.length);
        setTotalProducts(hearingAids.length);

        const today = new Date();
        const todayKey = today.toISOString().split('T')[0];

        const todayTotal = appointments.filter((item) => {
          if (!item?.preferredDate) return false;
          const itemDate = new Date(item.preferredDate);
          if (Number.isNaN(itemDate.getTime())) return false;
          return itemDate.toISOString().split('T')[0] === todayKey;
        }).length;
        setTodayAppointmentsCount(todayTotal);

        const lowStockTotal = hearingAids.filter((item) => Number(item.stock) < 10).length;
        setLowStockCount(lowStockTotal);
      } catch {
        if (!isMounted) return;
        setAppointmentsCount(0);
        setTodayAppointmentsCount(0);
        setTotalProducts(0);
        setLowStockCount(0);
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, [refreshKey]);

  return (
    <div className='flex flex-wrap gap-4 w-full p-4 justify-center'>
      <AdminDetailCard details={totalProducts} title='Total Products'/>
      <AdminDetailCard details={lowStockCount} title='Low Stock Items'/>
      <AdminDetailCard details={appointmentsCount} title='Total Appointments'/>
      <AdminDetailCard details={todayAppointmentsCount} title='Appointments Today'/>
    </div>
  );
}

export default AdminDashCard;
