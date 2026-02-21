"use client";
import InputField from "@/components/common/input";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Option, Select } from "@/components/ui/select";
import { Building2, Home, MapPin } from "lucide-react";
import { useState } from "react";

export default function AddShippingAddress({
  selectedAddressId,
  setOpenDialog,
}: {
  selectedAddressId?: string;
  setOpenDialog: (boolean) => void;
}) {
  const isEdition = selectedAddressId ? true : false;
  const [showEditValue, setShowEditValue] = useState(null);
  const [country, setCountry] = useState<string | null>("");
  const [addressType, setAddressType] = useState<string | null>("");

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-md shadow-sm">
              <MapPin className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-accent-foreground tracking-tight">
                {isEdition ? "Update" : "Add"} Your Shipping Address
              </h1>
              <p className="text-muted-foreground text-sm">
                Please provide your delivery details
              </p>
            </div>
          </div>
        </DialogTitle>
      </DialogHeader>
      <div className="w-full max-w-2xl bg-card text-card-foreground rounded-lg shadow-xl border border-border overflow-hidden">
        {/* Header - Using Sidebar Secondary Colors */}

        {/* Form Container */}
        <form className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <InputField
              label="Full Name"
              name="fullName"
              placeholder="John Doe"
              //   defaultValue={showEditValue?.fullName}
            />

            {/* Phone Number */}
            <InputField
              label="Phone Number"
              name="phone"
              placeholder="+1 (555) 000-0000"
              //   defaultValue={showEditValue?.phone}
            />

            {/* Address Line 1 */}
            <InputField
              label="Address Line 1"
              name="addressLine1"
              placeholder="123, Maple, Street"
              //   defaultValue={showEditValue?.addressLine1}
            />

            {/* Address Line 2 */}
            <InputField
              label="Address Line 2"
              name="addressLine2"
              placeholder="134, Maple, Street"
              //   defaultValue={showEditValue?.addressLine2}
            />

            {/* City */}
            <InputField
              label="City"
              name="city"
              placeholder="San Francisco"
              //   defaultValue={showEditValue?.city}
            />

            {/* State & ZIP */}
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="State"
                name="state"
                placeholder="CA"
                // defaultValue={showEditValue?.state}
              />
              <InputField
                label="Postal Code"
                name="postalCode"
                placeholder="94103"
                // defaultValue={showEditValue?.postalCode}
              />
            </div>

            {/* Country */}
          </div>

          {/* Address Type Selector */}
          <div className="space-y-3 grid items-center grid-cols-2 gap-4 pt-2">
            <Select
              label="Country"
              align="center"
              value={country}
              onChange={(value) => setCountry(value)}
            >
              <Option value="bangladesh">Bangladesh</Option>
              <Option value="india">India</Option>
            </Select>

            <div>
              <label className="text-sm font-semibold text-foreground/80">
                Address Type
              </label>
              <div className="flex gap-4">
                {[
                  { id: "home", label: "Home", icon: Home },
                  { id: "office", label: "Office", icon: Building2 },
                  { id: "other", label: "Other", icon: MapPin },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setAddressType(type.id)}
                    className={`flex-1 cursor-pointer flex flex-col items-center gap-2 py-4 rounded-md border-2 transition-all ${
                      addressType === type.id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-secondary bg-muted text-muted-foreground hover:border-input"
                    }`}
                  >
                    <type.icon className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}

          <Button type="submit" variant="primary" fullWidth>
            {isEdition ? "Update" : "Save"} Address
          </Button>
        </form>

        <div className="bg-muted px-8 py-4 border-t border-border">
          <p className="text-muted-foreground text-[11px] text-center uppercase tracking-tight">
            Secure connection established. Your data is encrypted.
          </p>
        </div>
      </div>
    </>
  );
}
