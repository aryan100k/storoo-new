import {
  DollarSign,
  ShieldCheck,
  Megaphone,
  Briefcase,
  Clock,
  Building,
  Coffee,
  Gift,
  Store,
  Info,
} from "lucide-react";
import { coffeeShopeImg, supermarketImg } from "@/assets/images/testimonials";

export const benefits = [
  {
    icon: DollarSign,
    title: "Earn Extra Income",
    description: "Up to ₹399 per bag per day",
  },
  {
    icon: Briefcase,
    title: "Zero Investment",
    description: "No setup costs or monthly fees",
  },
  {
    icon: Megaphone,
    title: "Free Marketing",
    description: "We bring customers to you",
  },
  {
    icon: ShieldCheck,
    title: "Insurance Coverage",
    description: "₹100,000 protection guarantee",
  },
];

export const steps = [
  {
    number: "1",
    title: "Register Your Space",
    description: "Simple verification process, 24-hour approval",
    icon: Briefcase,
  },
  {
    number: "2",
    title: "Accept Bookings",
    description: "Manage via mobile app, instant notifications",
    icon: Megaphone,
  },
  {
    number: "3",
    title: "Get Paid",
    description: "Weekly payouts, transparent earnings",
    icon: DollarSign,
  },
];

export const testimonials = [
  {
    img: supermarketImg,
    name: "Rahul Sharma",
    business: "Vijetha Super Market",
    location: "Mumbai, MH",
    earnings: "25,000",
    story:
      "Partnering with Storoo has been a game-changer for my business. I'm utilizing space that was previously unused and seeing great returns!",
  },
  {
    img: coffeeShopeImg,
    name: "Priya Patel",
    business: "Coffee Shope",
    location: "Bangalore, KA",
    earnings: "18,500",
    story:
      "As a cafe owner, I was skeptical at first. But Storoo has brought in extra income and new customers who often stay for a coffee!",
  },
];

export const businessTypes = [
  {
    type: "Hotels & Hostels",
    icon: Building,
  },
  {
    type: "Retail Stores",
    icon: Store,
  },
  {
    type: "Cafes & Restaurants",
    icon: Coffee,
  },
  {
    type: "Souvenir Shops",
    icon: Gift,
  },
  {
    type: "Local Businesses",
    icon: Briefcase,
  },
  {
    type: "Tourist Information Centers",
    icon: Info,
  },
];

export const requirements = [
  {
    text: "Business registration",
  },
  {
    text: "Physical space for storage",
  },
  {
    text: "Regular business hours",
  },
  {
    text: "Customer service oriented",
  },
  {
    text: "Smartphone for app access",
  },
];

export const faqs = [
  {
    id: 1,
    question: "How much can I earn?",
    answer:
      "Earnings vary based on your location, space size, and demand. On average, partners earn between ₹10,000 to ₹20,000 per month, with potential for higher earnings in prime locations.",
  },
  {
    id: 2,
    question: "What's the signup process?",
    answer:
      "The signup process is simple. Fill out the application form on this page, and our team will review your information. If approved, we'll guide you through setting up your space and getting started with the Storoo app.",
  },
  {
    id: 3,
    question: "How do payouts work?",
    answer:
      "We process payouts on a weekly basis. Your earnings are automatically transferred to your registered bank account every Monday for the previous week's bookings.",
  },
  {
    id: 4,
    question: "What support do I get?",
    answer:
      "Storoo provides 24/7 partner support via phone, email, and WhatsApp. We also offer training materials, marketing support, and regular performance reviews to help you maximize your earnings.",
  },
  {
    id: 5,
    question: "Is there a contract lock-in?",
    answer:
      "No, there's no long-term contract lock-in. You can choose to pause or stop your listing at any time through your partner dashboard. We believe in the quality of our service and want partners to stay because they're satisfied, not because of contractual obligations.",
  },
];

export const trustMarkers = [
  {
    icon: ShieldCheck,
    text: "₹100,000 Protection Guarantee",
  },
  {
    icon: Clock,
    text: "24/7 Partner Support",
  },
  {
    icon: DollarSign,
    text: "Easy Weekly Payouts",
  },
];
