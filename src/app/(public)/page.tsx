"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookNowDialog } from "@/components/book-storage-dialog";
import { MapPin, Clock, Shield, Phone, CreditCard, ThumbsUp } from "lucide-react";
import { routes } from "@/lib/routes";

export default function StorooLandingPage() {
  return (
    <>
      <main className="flex-grow">
        <section className="bg-[#e8f0fe] py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#333333]">
              Store Your Luggage Anywhere in the City
            </h1>
            <p className="text-xl mb-8 text-gray-600">
              Secure, convenient, and affordable luggage storage near you
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <BookNowDialog>
                <Button className="bg-brand hover:bg-brand/90 text-white px-8 py-3 rounded-full text-lg">
                  Find Storage Space
                </Button>
              </BookNowDialog>
              <Button
                asChild
                variant="outline"
                className="border-brand text-brand hover:bg-brand hover:text-white px-8 py-3 rounded-full text-lg"
              >
                <Link href={routes.addListing}>List Your Space</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: MapPin,
                  title: "Book online",
                  description: "Find and reserve storage near you",
                },
                {
                  icon: Clock,
                  title: "Drop off your bags",
                  description: "Securely store your luggage",
                },
                {
                  icon: ThumbsUp,
                  title: "Enjoy your day",
                  description: "Explore the city luggage-free",
                },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-[#e8f0fe] rounded-full p-6 inline-block mb-4">
                    <step.icon className="w-12 h-12 text-brand" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#e8f0fe] py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Security Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Shield, title: "₹100,000 protection guarantee" },
                { icon: Phone, title: "24/7 customer support" },
                { icon: MapPin, title: "Secure partner locations" },
                { icon: CreditCard, title: "Flexible cancellation" },
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md">
                  <div className="bg-brand rounded-full p-4 inline-block mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Pricing</h2>
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-brand text-white p-6 text-center">
                <h3 className="text-2xl font-semibold mb-2">Simple, Transparent Pricing</h3>
                <p className="text-4xl font-bold">
                  ₹399<span className="text-xl">/day</span>
                </p>
              </div>
              <div className="p-6">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    No hidden fees
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Free cancellation
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Pay only for what you use
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#e8f0fe] py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Storoo</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Convenient locations",
                  description: "Find storage near popular attractions",
                },
                { title: "Secure storage", description: "Your belongings are safe with us" },
                { title: "Affordable rates", description: "Competitive pricing for all budgets" },
                { title: "Friendly service", description: "Our team is here to help you" },
              ].map((benefit, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
