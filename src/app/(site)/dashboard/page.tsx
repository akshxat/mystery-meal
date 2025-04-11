import { Metadata } from 'next';
import StatsCards from '@/components/StatsCards';
import SalesChart from '@/components/SalesChart';
import WorldMap from '@/components/WorldMap';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Mystery Meals',
  description: 'Overview of Mystery Meals app usage and analytics.',
};

const DashboardPage = () => {
  return (
    <>
      <StatsCards />
      <SalesChart />
      <WorldMap />
    </>
  );
};

export default DashboardPage;
