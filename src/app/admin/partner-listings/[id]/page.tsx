import { notFound } from "next/navigation";

import {
  Briefcase,
  Clock,
  DollarSign,
  Home,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs } from "../../components/breadcrumbs";
import { Heading } from "../../components/heading";
import { UpdateStatusDropdown } from "../components/update-status-dropdown";

import { getListingDetails } from "@/server/trpc/helpers/listing";
import { adminRoutes } from "@/lib/routes";

const ListingDetailsPage = async ({ params }: { params: { id: string } }) => {
  const data = await getListingDetails(Number(params.id));

  if (!data) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs
        items={[
          {
            label: "Partner Listings",
            href: adminRoutes.partnerListings,
          },
          {
            label: "Listings Details",
            href: adminRoutes.partnerListingDetails(params.id),
          },
        ]}
      />

      <div className="flex gap-1 flex-col">
        <Heading className="mb-0">Partner Listing Details</Heading>
        <UpdateStatusDropdown listingId={data.id} status={data.approvalStatus} className="w-fit" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4" />
                <dt className="font-semibold mr-2">Business Name:</dt>
                <dd>{data.businessName}</dd>
              </div>
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <dt className="font-semibold mr-2">Contact Name:</dt>
                <dd>{data.contactName}</dd>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                <dt className="font-semibold mr-2">Email:</dt>
                <dd>{data.email}</dd>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                <dt className="font-semibold mr-2">Phone:</dt>
                <dd>{data.phone}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <dt className="font-semibold mr-2">Address:</dt>
                </div>
                <dd>{`${data.locality}, ${data.city}, ${data.state} ${data.postalCode}`}</dd>
              </div>

              <div>
                <dt className="font-semibold">Coordinates:</dt>
                <dd>{`${data.latitude}, ${data.longitude}`}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Space Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                <dt className="font-semibold mr-2">Space Type:</dt>
                <dd className="capitalize">{data.spaceType}</dd>
              </div>
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <dt className="font-semibold mr-2">Capacity:</dt>
                <dd>{data.capacityId}</dd>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <dt className="font-semibold mr-2">Operating Hours:</dt>
                <dd>{data.operatingHours}</dd>
              </div>
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4" />
                <dt className="font-semibold mr-2">Rent:</dt>
                <dd>${data.rent}</dd>
              </div>
              <div className="flex items-center">
                <Shield className="mr-2 h-4 w-4" />
                <dt className="font-semibold mr-2">Security Features:</dt>
                <dd>{data.securityFeatures}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <dt className="font-semibold">Created At:</dt>
                <dd>{new Date(data.createdAt).toLocaleString()}</dd>
              </div>
              <div>
                <dt className="font-semibold">Referral Source:</dt>
                <dd className="capitalize">{data.referralSource}</dd>
              </div>
              <div>
                <dt className="font-semibold">Terms Agreed:</dt>
                <dd>{data.termsAgreed ? "Yes" : "No"}</dd>
              </div>
              <div>
                <dt className="font-semibold">Listing ID:</dt>
                <dd>{data.id}</dd>
              </div>

              {data.userId && (
                <div>
                  <dt className="font-semibold">User ID:</dt>
                  <dd>{data.userId}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ListingDetailsPage;
