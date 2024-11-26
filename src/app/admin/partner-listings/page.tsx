import { Breadcrumbs } from "../components/breadcrumbs";
import { Heading } from "../components/heading";
import { adminRoutes } from "@/lib/routes";

const PartnerListingsPage = () => {
  return (
    <>
      <Breadcrumbs
        items={[
          {
            label: "Partner Requests",
            href: adminRoutes.partnerListings,
          },
        ]}
      />

      <Heading>Partner Requests</Heading>
    </>
  );
};

export default PartnerListingsPage;
