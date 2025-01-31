"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  CreditCardIcon,
  LockIcon,
  CheckCircleIcon,
  CalendarIcon,
  KeyIcon,
} from "lucide-react";

export default function Payment() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      // Redirect to dashboard after success animation
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      {!isSuccess ? (
        <Card className="w-full max-w-md p-8 animate-fade-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCardIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Payment Details
            </h1>
            <p className="text-gray-600 mt-2">Complete your payment securely</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="pl-10"
                  maxLength={19}
                />
                <CreditCardIcon className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <div className="relative">
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    className="pl-10"
                    maxLength={5}
                  />
                  <CalendarIcon className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <div className="relative">
                  <Input
                    id="cvv"
                    placeholder="123"
                    className="pl-10"
                    maxLength={3}
                    type="password"
                  />
                  <KeyIcon className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Cardholder Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <LockIcon className="h-4 w-4" />
                    <span>Pay $24.99</span>
                  </div>
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
            <LockIcon className="h-4 w-4 mr-2" />
            <span>Secured by SSL encryption</span>
          </div>
        </Card>
      ) : (
        <div className="text-center animate-fade-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      )}
    </div>
  );
}
