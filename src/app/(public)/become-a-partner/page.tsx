import Image from "next/image";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, LucideIcon, UserCircle2 } from "lucide-react";
import { PartnerRequestForm } from "./components/partner-request-form";

import {
  benefits,
  businessTypes,
  faqs,
  requirements,
  steps,
  testimonials,
  trustMarkers,
} from "./components/data";

const BecomeAPartner = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-brand text-white py-20 relative overflow-hidden">
          <div className="container mx-auto relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Turn Your Space into Profit with Storoo
            </h1>
            <p className="text-xl mb-8">Join India's fastest-growing luggage storage network</p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-background text-brand px-4 py-2 rounded-full">
                ₹20,000+ Monthly Earnings Potential
              </div>
              <div className="bg-background text-brand px-4 py-2 rounded-full">
                500+ Happy Customers
              </div>
              <div className="bg-background text-brand px-4 py-2 rounded-full">Zero Setup Cost</div>
            </div>

            <Button
              asChild
              className="bg-background text-brand hover:bg-[#e8f0fe] text-lg px-8 py-3 rounded-full"
            >
              <Link href="#apply-now">Become a Partner</Link>
            </Button>
          </div>
        </section>

        {/* Featured In Section */}
        {/* <section className="py-12 bg-[#e8f0fe] overflow-hidden">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">Featured In</h2>
            <div className="flex space-x-8 overflow-hidden">
              <Image
                src="/placeholder.svg?height=50&width=120"
                alt="Partner 1"
                width={120}
                height={50}
              />
              <Image
                src="/placeholder.svg?height=50&width=120"
                alt="Partner 2"
                width={120}
                height={50}
              />
              <Image
                src="/placeholder.svg?height=50&width=120"
                alt="Partner 3"
                width={120}
                height={50}
              />
              <Image
                src="/placeholder.svg?height=50&width=120"
                alt="Partner 4"
                width={120}
                height={50}
              />
              <Image
                src="/placeholder.svg?height=50&width=120"
                alt="Partner 5"
                width={120}
                height={50}
              />
              <Image
                src="/placeholder.svg?height=50&width=120"
                alt="Partner 6"
                width={120}
                height={50}
              />
            </div>
          </div>
        </section> */}

        {/* Benefits Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-12">Why Partner with Storoo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((b) => (
                <Benefit key={b.title} icon={b.icon} title={b.title} description={b.description} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-[#e8f0fe]">
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-12">How It Works</h2>
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0 md:space-x-4">
              {steps.map((s) => (
                <Step
                  key={s.title}
                  number={s.number}
                  title={s.title}
                  description={s.description}
                  icon={s.icon}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Partner Success Stories */}
        <section className="py-20 bg-background">
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-12">Partner Success Stories</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {testimonials.map((t) => (
                <Testimonial
                  key={t.name}
                  name={t.name}
                  business={t.business}
                  location={t.location}
                  earnings={t.earnings}
                  story={t.story}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Business Types Section */}
        <section className="py-20 bg-[#e8f0fe]">
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-12">Perfect for</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {businessTypes.map((b) => (
                <BusinessType key={b.type} type={b.type} icon={b.icon} />
              ))}
            </div>
          </div>
        </section>

        {/* Partner Requirements */}
        <section className="py-20 bg-background">
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-12">Partner Requirements</h2>
            <div className="max-w-2xl mx-auto space-y-4">
              {requirements.map((r) => (
                <Requirement key={r.text} text={r.text} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-[#e8f0fe]">
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-12">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id.toString()}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-20 bg-background" id="apply-now">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-2xl font-semibold text-center mb-12">Become a Storoo Partner</h2>

            <PartnerRequestForm />
          </div>
        </section>

        {/* Trust Markers */}
        <section className="py-12 bg-[#e8f0fe]">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-8">
              {trustMarkers.map((t) => (
                <div className="flex items-center space-x-2">
                  <t.icon className="w-6 h-6 text-brand" />
                  <span>{t.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Sticky "Apply Now" button */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8">
        <Button className="bg-brand text-white hover:bg-blue-700 shadow-lg">Apply Now</Button>
      </div>
    </div>
  );
};

export default BecomeAPartner;

const Benefit = (props: { icon: LucideIcon; title: string; description: string }) => (
  <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-md border">
    <div className="p-4 rounded-full mb-4">
      <props.icon className="w-8 h-8 text-brand" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{props.title}</h3>
    <p className="text-muted-foreground">{props.description}</p>
  </div>
);

const Step = (props: { number: string; title: string; description: string; icon: LucideIcon }) => (
  <div className="flex flex-col items-center text-center">
    <div className="bg-brand text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold mb-4">
      {props.number}
    </div>
    <props.icon className="w-12 h-12 text-brand mb-4" />
    <h3 className="text-xl font-semibold mb-2">{props.title}</h3>
    <p className="text-muted-foreground">{props.description}</p>
  </div>
);

const Testimonial = (props: {
  name: string;
  business: string;
  location: string;
  earnings: string;
  story: string;
  image?: string;
}) => (
  <Card className="w-full max-w-sm mx-auto">
    <CardContent className="p-6">
      <div className="flex items-center mb-4">
        {props.image ? (
          <Image
            src={props.image}
            alt={props.name}
            width={64}
            height={64}
            className="rounded-full mr-4"
          />
        ) : (
          <UserCircle2 className="w-16 h-16 bg-muted rounded-full text-muted-foreground mr-4" />
        )}
        <div>
          <h4 className="font-semibold">{props.name}</h4>
          <p className="text-sm text-muted-foreground">{props.business}</p>
          <p className="text-sm text-muted-foreground">{props.location}</p>
        </div>
      </div>
      <p className="text-lg font-semibold mb-2">Earns ₹{props.earnings}/month</p>
      <p className="text-muted-foreground">{props.story}</p>
    </CardContent>
  </Card>
);

const BusinessType = (props: { type: string; icon: LucideIcon }) => (
  <div className="flex flex-col items-center space-y-2 bg-background p-4 rounded-lg shadow-sm">
    <props.icon className="w-8 h-8 text-brand" />
    <span className="text-center">{props.type}</span>
  </div>
);

const Requirement = (props: { text: string }) => (
  <div className="flex items-center gap-2 justify-center">
    <CheckCircle className="w-5 h-5 text-green-500" />
    <span>{props.text}</span>
  </div>
);
