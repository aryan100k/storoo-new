import { ScrollArea } from "@radix-ui/react-scroll-area";

export const TermsAndConditions = () => (
  <ScrollArea className="h-[400px] w-full rounded-md border p-4">
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Terms and Conditions for Storoo Partners</h2>
      <p>Effective Date: November 24, 2024</p>
      <section>
        <h3 className="text-xl font-semibold">1. Introduction</h3>
        <p>
          By submitting an application to list your storage space on Storoo, you agree to comply
          with and be bound by these terms.
        </p>
      </section>
      <section>
        <h3 className="text-xl font-semibold">2. Eligibility</h3>
        <p>
          To be eligible, you must be at least 18 years old and have the legal right to list the
          storage space.
        </p>
      </section>
      <section>
        <h3 className="text-xl font-semibold">3. Listing Responsibilities</h3>
        <p>
          You are responsible for providing accurate information about your space and keeping it
          up-to-date.
        </p>
      </section>
      <section>
        <h3 className="text-xl font-semibold">4. Fees and Payments</h3>
        <p>
          Storoo may charge a service fee for each booking. You are responsible for setting your own
          prices.
        </p>
      </section>
      <section>
        <h3 className="text-xl font-semibold">5. User Interaction</h3>
        <p>You are responsible for managing interactions with users and resolving disputes.</p>
      </section>
      <section>
        <h3 className="text-xl font-semibold">6. Termination</h3>
        <p>
          Storoo reserves the right to terminate your partnership at any time for violations of
          these terms.
        </p>
      </section>
      <p>By accepting these terms, you agree to all conditions set forth in this agreement.</p>
    </div>
  </ScrollArea>
);
