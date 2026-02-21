"use client";
import InputField from "@/components/common/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  AlertTriangle,
  CheckCircle2,
  Lock,
  Mail,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useState } from "react";

export default function SecurityTab() {
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleAction = (e, action) => {
    e.preventDefault();
    setStatusMessage(`Success: ${action} request processed.`);
    setTimeout(() => setStatusMessage(null), 3000);
  };
  return (
    <div className="text-foreground font-sans p-4">
      <div className="space-y-4">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="text-primary" size={28} />
            <h1 className="text-3xl font-bold tracking-tight">
              Security Settings
            </h1>
          </div>
          <p className="text-muted-foreground">
            Manage your password, email preferences, and account safety.
          </p>
        </header>

        {/* Status Toast */}
        {statusMessage && (
          <div className="fixed bottom-8 right-8 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
            <CheckCircle2 size={20} />
            <span className="font-medium">{statusMessage}</span>
          </div>
        )}

        {/* Change Email */}
        <Card
          title="Email Address"
          className="bg-secondary "
          description="Update the email address associated with your account."
        >
          <CardContent className="grid grid-cols-1 md:grid-cols-2 px-4 py-3 gap-4">
            <InputField
              label="Current Email"
              id="current-email"
              type="email"
              placeholder="user@example.com"
              icon={<Mail />}
            />
            <InputField
              label="New Email"
              type="email"
              placeholder="new@example.com"
              icon={<Mail />}
            />
          </CardContent>
          <CardFooter>
            <button
              onClick={(e) => handleAction(e, "Email Update")}
              className="bg-primary text-primary-foreground hover:opacity-90 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Update Email
            </button>
          </CardFooter>
        </Card>

        {/* Change Password */}
        <Card
          title="Change Password"
          className="bg-secondary"
          description="Ensure your account is using a long, random password to stay secure."
        >
          <CardContent className="px-4 py-3 space-y-3">
            <InputField
              label="Current Password"
              type="password"
              placeholder="••••••••"
              icon={<Lock />}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="New Password"
                type="password"
                placeholder="••••••••"
                icon={<Lock />}
              />
              <InputField
                label="Confirm New Password"
                type="password"
                placeholder="••••••••"
                icon={<Lock />}
              />
            </div>

            <div className="bg-secondary p-3 rounded-md border border-border">
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <AlertTriangle size={14} className="text-chart-1" />
                Password must be at least 12 characters and include a symbol.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={(e) => handleAction(e, "Password Change")}
              className="bg-primary text-primary-foreground hover:opacity-90 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Save Password
            </Button>
          </CardFooter>
        </Card>

        {/* Two-Factor Auth Toggle (Extra UI Component) */}
        <div className="bg-secondary border border-accent rounded-lg p-6 mb-6 flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="bg-accent p-3 rounded-full text-accent-foreground">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-semibold">Two-Factor Authentication</h4>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account.
              </p>
            </div>
          </div>
          <Button variant="glow" size="md" className="rounded-xl">
            Enable
          </Button>
        </div>

        {/* Delete Account */}
        <Card
          title="Delete Account"
          className="bg-secondary"
          description="Permanently remove your account and all of its contents from our platform. This action is not reversible."
          isDestructive
        >
          <CardContent className="px-4 py-3">
            <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-md">
              <AlertTriangle
                className="text-destructive shrink-0 mt-0.5"
                size={20}
              />
              <div>
                <p className="text-sm font-medium text-destructive">Warning</p>
                <p className="text-sm opacity-80">
                  Deleting your account will result in the permanent loss of all
                  data, including history, preferences, and saved items.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              icon={<Trash2 size={16} />}
              className="bg-rose-500 rounded-lg"
              variant="danger"
            >
              Delete Account
            </Button>
          </CardFooter>
        </Card>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>© 2024 Secure Systems Inc. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
