import { Breadcrumbs } from "../components/breadcrumbs";
import { Heading } from "../components/heading";
import { adminRoutes } from "@/lib/routes";

const StoragePointsPage = () => {
  return (
    <>
      <Breadcrumbs
        items={[
          {
            label: "Storage Points",
            href: adminRoutes.storagePoints,
          },
        ]}
      />

      <Heading>Storage Points</Heading>
    </>
  );
};

export default StoragePointsPage;
