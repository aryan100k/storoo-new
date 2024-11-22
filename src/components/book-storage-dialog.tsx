import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const BookNowDialog = (props: React.PropsWithChildren) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    luggageType: "Small Bag",
    duration: "Few Hours",
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/booking/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          luggageType: formData.luggageType,
          duration: formData.duration,
        }),
      });

      if (response.ok) {
        setIsFormSubmitted(true);
      } else {
        console.error("Booking failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {props.children || <Button className="mt-2 bg-blue-500 text-white">Book Now</Button>}
      </DialogTrigger>
      <DialogContent className="!bg-white">
        <DialogHeader className="!bg-white">
          <DialogTitle className="text-black">Storoo</DialogTitle>
        </DialogHeader>
        {!isFormSubmitted ? (
          <form onSubmit={handleFormSubmit} className="space-y-4 !bg-white w-full">
            <div className="bg-white">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div className="bg-white">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="bg-white">
              <Label htmlFor="luggageType">Luggage Type</Label>
              <Select
                value={formData.luggageType}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, luggageType: value }));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Luggage Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Small Bag">Small Bag</SelectItem>
                  <SelectItem value="Large Suitcase">Large Suitcase</SelectItem>
                  <SelectItem value="Multiple Bags">Multiple Bags</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="bg-white">
              <Label htmlFor="duration">Storage Duration</Label>
              <Select
                value={formData.duration}
                onValueChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    duration: value,
                  }));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Storage Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Few Hours">Few Hours</SelectItem>
                  <SelectItem value="1 Day">1 Day</SelectItem>
                  <SelectItem value="2-3 Days">2-3 Days</SelectItem>
                  <SelectItem value="Week or More">Week or More</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="w-full border-2 border-[#1a73e8] text-[#1a73e8] bg-white 
             hover:bg-[#1a73e8] hover:text-white hover:shadow-lg 
             transition-all duration-300 ease-in-out"
            >
              Submit
            </Button>
          </form>
        ) : (
          <div className="text-center py-8 bg-white">
            <p className="text-xl font-semibold mb-4">Thank you for choosing Storoo!</p>
            <p>Our team will contact you within minutes.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
