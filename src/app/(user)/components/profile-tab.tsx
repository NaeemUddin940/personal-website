"use client";
import { DatePicker } from "@/components/common/date-picker";
import Input from "@/components/common/input";
import { Button } from "@/components/ui/button";
import { Option, Select } from "@/components/ui/select";
import { useState } from "react";

export default function ProfileTab() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date("1990-01-01"),
  );
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-secondary px-4 py-3 rounded-2xl">
        <h3 className="text-2xl font-bold text-card-foreground">
          Profile Details
        </h3>
        <p className="text-muted-foreground">
          Manage your personal information and contact settings.
        </p>
      </div>
      <form
      // onSubmit={handleUpdateProfile}
      >
        <div className="grid grid-cols-1 mb-5 md:grid-cols-2 gap-6">
          <Input
            type="text"
            label="My Full Name"
            name="name"
            // defaultValue={session?.user?.name}
          />
          <Input
            type="email"
            label="Email Address"
            name="email"
            // defaultValue={session?.user?.email}
          />
          <Input
            type="phone"
            label="Phone Number"
            name="phone"
            // defaultValue={session?.user?.phone}
          />

          <div className="w-full flex items-center">
            <DatePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <Select label="Select Gender" name="gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </div>
        </div>
        <Button variant="primary" fullWidth>
          Save Changes
        </Button>
      </form>
    </div>
  );
}
