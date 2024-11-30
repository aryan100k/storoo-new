"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const PartnerRequestForm = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    phone: "",
    email: "",
    location: "",
    businessType: "",
    storageSpace: "",
    monthlyVisitors: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
          Business Name
        </label>
        <Input
          id="businessName"
          name="businessName"
          value={formData.businessName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">
          Contact Person
        </label>
        <Input
          id="contactPerson"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
          Business Type
        </label>
        <Select
          name="businessType"
          onValueChange={(value) => handleSelectChange("businessType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select business type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hotel">Hotel / Hostel</SelectItem>
            <SelectItem value="retail">Retail Store</SelectItem>
            <SelectItem value="cafe">Cafe / Restaurant</SelectItem>
            <SelectItem value="souvenir">Souvenir Shop</SelectItem>
            <SelectItem value="local">Local Business</SelectItem>
            <SelectItem value="tourist">Tourist Information Center</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="storageSpace" className="block text-sm font-medium text-gray-700 mb-1">
          Available Storage Space (sqft)
        </label>
        <Input
          id="storageSpace"
          name="storageSpace"
          type="number"
          value={formData.storageSpace}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="monthlyVisitors" className="block text-sm font-medium text-gray-700 mb-1">
          Current Monthly Visitors
        </label>
        <Input
          id="monthlyVisitors"
          name="monthlyVisitors"
          type="number"
          value={formData.monthlyVisitors}
          onChange={handleInputChange}
          required
        />
      </div>
      <Button type="submit" className="w-full bg-[#1a73e8] text-white hover:bg-blue-700">
        Apply Now
      </Button>
    </form>
  );
};
