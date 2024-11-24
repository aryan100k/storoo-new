import { PartnerListingForm } from "@/components/partner-listing-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const AddListingPage = () => {
  return (
    <main className="my-4 container">
      <Card className="w-full max-w-3xl  mx-auto shadow-sm">
        <CardHeader>
          <CardTitle>List Your Space with Storoo</CardTitle>
          <CardDescription>
            Partner with us to provide secure luggage storage for travelers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PartnerListingForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default AddListingPage;
