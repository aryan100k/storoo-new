import { Breadcrumbs } from "../components/breadcrumbs";
import { OverviewCards } from "./components/overview-cards";
import { RecentActivities } from "./components/recent-activities";

const AdminDashboardPage = () => {
  return (
    <>
      <Breadcrumbs />

      <OverviewCards />

      <RecentActivities />
    </>
  );
};

export default AdminDashboardPage;
