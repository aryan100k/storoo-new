import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PartnerTerms() {
  const effectiveDate = "November 24, 2024";

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Terms and Conditions for Partners
          </CardTitle>
          <CardDescription className="text-center">Effective Date: {effectiveDate}</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full rounded-md border p-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
                <p>
                  Welcome to Storoo's Terms and Conditions for Partners. By submitting an
                  application to list your storage space on our platform, you agree to comply with
                  and be bound by these terms. Please read them carefully before proceeding with
                  your application.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">2. Definitions</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>"Partner"</strong> refers to any individual or entity that applies to
                    list or lists their storage space on the Storoo platform.
                  </li>
                  <li>
                    <strong>"Storoo"</strong> refers to our company, its website, mobile
                    applications, and services.
                  </li>
                  <li>
                    <strong>"Users"</strong> refers to individuals who use Storoo to find and book
                    storage spaces.
                  </li>
                  <li>
                    <strong>"Listing"</strong> refers to the storage space and associated
                    information provided by a Partner on the Storoo platform.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">3. Eligibility</h2>
                <p>To be eligible to list your space on Storoo, you must:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Be at least 18 years old or the legal age of majority in your jurisdiction.
                  </li>
                  <li>Have the legal right to list and offer the storage space.</li>
                  <li>Comply with all applicable laws and regulations in your area.</li>
                  <li>
                    Provide accurate and up-to-date information about yourself and your storage
                    space.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">4. Listing Your Space</h2>
                <p>When listing your storage space on Storoo:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    You must provide accurate and complete information about your space, including
                    size, location, availability, and any restrictions.
                  </li>
                  <li>You agree to keep your listing information up-to-date at all times.</li>
                  <li>
                    Storoo reserves the right to review, approve, reject, or remove any listing at
                    its sole discretion.
                  </li>
                  <li>
                    You are responsible for setting your own prices and terms, subject to Storoo's
                    policies.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">5. Responsibilities of Partners</h2>
                <p>As a Storoo Partner, you are responsible for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Maintaining the safety and security of your storage space.</li>
                  <li>
                    Ensuring your space complies with all applicable laws, regulations, and safety
                    standards.
                  </li>
                  <li>Accurately representing the condition and features of your storage space.</li>
                  <li>Responding promptly to user inquiries and booking requests.</li>
                  <li>
                    Honoring all confirmed bookings and providing the agreed-upon storage space and
                    services.
                  </li>
                  <li>Maintaining appropriate insurance coverage for your storage space.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">6. Fees and Payments</h2>
                <p>Regarding fees and payments:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Storoo may charge a service fee for each booking, which will be clearly
                    communicated to you.
                  </li>
                  <li>You are responsible for setting your own prices for your storage space.</li>
                  <li>Payments from users will be processed through Storoo's platform.</li>
                  <li>
                    Storoo will remit payments to you according to the payment schedule outlined in
                    our payment policies.
                  </li>
                  <li>
                    You are responsible for reporting and paying any applicable taxes on your
                    earnings.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">7. User Interaction</h2>
                <p>Regarding interactions with users:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    You are responsible for all communications and interactions with users of your
                    storage space.
                  </li>
                  <li>You agree to treat all users with respect and professionalism.</li>
                  <li>
                    Any disputes with users should be resolved directly between you and the user.
                    Storoo may provide assistance but is not responsible for resolving disputes.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">8. Indemnification</h2>
                <p>
                  You agree to indemnify, defend, and hold harmless Storoo, its officers, directors,
                  employees, and agents from and against any claims, liabilities, damages, losses,
                  and expenses, including, without limitation, reasonable legal and accounting fees,
                  arising out of or in any way connected with your listing, your storage space, your
                  interactions with users, or your breach of these Terms and Conditions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">9. Limitation of Liability</h2>
                <p>Storoo is not responsible for and disclaims all liability related to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The condition, quality, or safety of your storage space.</li>
                  <li>Any damages or losses incurred by users of your storage space.</li>
                  <li>Any disputes between you and users.</li>
                  <li>
                    Any violations of law or regulations by you or users of your storage space.
                  </li>
                </ul>
                <p>
                  In no event shall Storoo's liability exceed the amount of fees paid by you to
                  Storoo in the six months preceding the event giving rise to the liability.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">10. Termination</h2>
                <p>
                  Storoo reserves the right to terminate your partnership and remove your listings
                  at any time, for any reason, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violation of these Terms and Conditions.</li>
                  <li>Receiving consistent negative feedback from users.</li>
                  <li>Engaging in fraudulent or illegal activities.</li>
                  <li>Any action that may damage Storoo's reputation or business.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">11. Changes to Terms</h2>
                <p>
                  Storoo may update these Terms and Conditions from time to time. We will notify you
                  of any significant changes via email or through our platform. Your continued use
                  of Storoo as a partner after such changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">12. Governing Law</h2>
                <p>
                  These Terms and Conditions shall be governed by and construed in accordance with
                  the laws of [Insert Jurisdiction], without regard to its conflict of law
                  provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">13. Contact Information</h2>
                <p>
                  If you have any questions about these Terms and Conditions, please contact us at:
                </p>
                <p>Email: partners@storoo.com</p>
                <p>Address: 123 Storage Lane, Cityville, State 12345</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">14. Acceptance</h2>
                <p>
                  By submitting your application to become a Storoo partner, you acknowledge that
                  you have read, understood, and agree to be bound by these Terms and Conditions.
                </p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
