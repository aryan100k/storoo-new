import { Breadcrumbs } from "../components/breadcrumbs";
import { Heading } from "../components/heading";
import { OverviewCards } from "./components/overview-cards";
import { RecentActivities } from "./components/recent-activities";

const AdminDashboardPage = () => {
  return (
    <>
      <Breadcrumbs />

      <Heading>Dashboard</Heading>

      <OverviewCards />

      <RecentActivities />
    </>
  );
};

export default AdminDashboardPage;
