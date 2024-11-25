import Link from "next/link";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const PartnerThankYouPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Thank You for Your Choosing Storoo!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4">
            Your request has been submitted successfully. We will get back to you within shortly.
          </p>
          <p className="text-center mb-4">
            If you have any questions or need to provide additional information, please don't
            hesitate to contact us at{" "}
            <Link
              target="_blank"
              href="mailto:partners@storoo.com"
              className="text-blue-600 hover:underline"
            >
              contact@storoo.in
            </Link>
            .
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button>Return to Homepage</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PartnerThankYouPage;
