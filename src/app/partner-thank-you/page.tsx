import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
            Thank You for Your Application!
          </CardTitle>
          <CardDescription className="text-center">
            We appreciate your interest in partnering with Storoo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4">
            Our team will carefully review your application and get back to you soon. We're excited
            about the possibility of working together to provide secure luggage storage for
            travelers.
          </p>
          <p className="text-center mb-4">
            If you have any questions or need to provide additional information, please don't
            hesitate to contact us at{" "}
            <Link href="mailto:partners@storoo.com" className="text-blue-600 hover:underline">
              contact@storoo.com
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
