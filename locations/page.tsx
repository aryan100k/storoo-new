"use client";

import { useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const storageLocations = [
 { id: 1, name: "ISB SV Storage", position: { lat: 17.436234886872576, lng: 78.34213988465545 }, address: "Gachibowli Hyderabad Central", price: "₹399/day" },
 { id: 2, name: "Ella Hotel Storage", position: { lat: 17.442713072742833, lng: 78.34445837724357 }, address: "Inorbit Mall, HITEC City", price: "₹699/day" },
 { id: 3, name: "Sweet Shop Storage", position: { lat: 17.25735708291055, lng: 78.38303415128254 }, address: "Hyderabad Airport", price: "₹999/day" },
]

const LocationsPage = () => {
 const [selectedLocation, setSelectedLocation] = useState(null)
 const [isFormSubmitted, setIsFormSubmitted] = useState(false)
 const [formData, setFormData] = useState({
   fullName: '',
   phoneNumber: '',
   luggageType: 'Small Bag',
   duration: 'Few Hours'
 })

 const handleFormSubmit = async (e: React.FormEvent) => {
   e.preventDefault()
   try {
     const response = await fetch('http://localhost:3001/api/locations/book', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         luggageType: formData.luggageType,
         duration: formData.duration
       })
     })

     if (response.ok) {
       setIsFormSubmitted(true)
     } else {
       console.error('Booking failed')
     }
   } catch (error) {
     console.error('Error:', error)
   }
 }

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
   const { id, value } = e.target
   setFormData(prev => ({
     ...prev,
     [id]: value
   }))
 }

 const mapContainerStyle = {
   width: '100%',
   height: '600px'
 }

 const center = {
   lat: 17.3850,
   lng: 78.4867
 }

 return (
   <div className="min-h-screen">
     <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold mb-8">Storage Locations</h1>
       
       <LoadScript googleMapsApiKey="AIzaSyBeF1EYSyAnhPTbycagaYmDM6nla5MYLd4">
         <GoogleMap
           mapContainerStyle={mapContainerStyle}
           zoom={13}
           center={center}
         >
           {storageLocations.map(location => (
             <Marker
               key={location.id}
               position={location.position}
               onClick={() => setSelectedLocation(location as any)}
             />
           ))}

           {selectedLocation && (
             <InfoWindow
               position={(selectedLocation as typeof storageLocations[0]).position}
               onCloseClick={() => setSelectedLocation(null)}
             >
               <div className="p-2">
                 <h3 className="font-bold">{(selectedLocation as typeof storageLocations[0]).name}</h3>
                 <p className="text-sm">{(selectedLocation as typeof storageLocations[0]).address}</p>
                 <p className="text-sm font-semibold mt-1">{(selectedLocation as typeof storageLocations[0]).price}</p>
                 <Dialog>
                   <DialogTrigger asChild>
                     <Button className="mt-2 bg-blue-500 text-white">Book Now</Button>
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
                             id="luggageType"
                             value={formData.luggageType}
                             onChange={handleInputChange}
                           >
                             <option>Small Bag</option>
                             <option>Large Suitcase</option>
                             <option>Multiple Bags</option>
                             <option>Other</option>
                           </Select>
                         </div>
                         <div className="bg-white">
                           <Label htmlFor="duration">Storage Duration</Label>
                           <Select 
                             id="duration"
                             value={formData.duration}
                             onChange={handleInputChange}
                           >
                             <option>Few Hours</option>
                             <option>1 Day</option>
                             <option>2-3 Days</option>
                             <option>Week or More</option>
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
               </div>
             </InfoWindow>
           )}
         </GoogleMap>
       </LoadScript>

       {/* Location List */}
       <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
         {storageLocations.map(location => (
           <div 
             key={location.id}
             className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
             onClick={() => setSelectedLocation(location as any)}
           >
             <h3 className="font-bold text-lg">{location.name}</h3>
             <p className="text-gray-600">{location.address}</p>
             <p className="font-semibold text-blue-600 mt-2">{location.price}</p>
             <Dialog>
               <DialogTrigger asChild>
                 <Button className="mt-4 bg-blue-500 text-white">Book Now</Button>
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
                         id="luggageType"
                         value={formData.luggageType}
                         onChange={handleInputChange}
                       >
                         <option>Small Bag</option>
                         <option>Large Suitcase</option>
                         <option>Multiple Bags</option>
                         <option>Other</option>
                       </Select>
                     </div>
                     <div className="bg-white">
                       <Label htmlFor="duration">Storage Duration</Label>
                       <Select 
                         id="duration"
                         value={formData.duration}
                         onChange={handleInputChange}
                       >
                         <option>Few Hours</option>
                         <option>1 Day</option>
                         <option>2-3 Days</option>
                         <option>Week or More</option>
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
           </div>
         ))}
       </div>
     </div>
   </div>
 )
}

export default LocationsPage