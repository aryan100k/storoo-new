import { OverviewCards } from "./components/overview-cards";
import { RecentActivities } from "./components/recent-activities";

const AdminDashboardPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <OverviewCards />

      <RecentActivities />
    </div>
  );
};

export default AdminDashboardPage;
