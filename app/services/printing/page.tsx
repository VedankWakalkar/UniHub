"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrinterIcon, UploadIcon, Settings2Icon, ClockIcon } from "lucide-react";

export default function PrintingService() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900">Printing Service</h1>
          <p className="mt-2 text-gray-600">Print your documents quickly and easily</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 animate-slide-up">
              <Tabs defaultValue="upload">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload File</TabsTrigger>
                  <TabsTrigger value="settings">Print Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <UploadIcon className="h-12 w-12 text-gray-400 mb-4" />
                      <span className="text-lg font-medium text-gray-900">
                        Drop your file here or click to upload
                      </span>
                      <span className="text-sm text-gray-500 mt-1">
                        PDF, DOC, DOCX up to 10MB
                      </span>
                    </label>
                  </div>
                  {selectedFile && (
                    <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <PrinterIcon className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">{selectedFile.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedFile(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="settings" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Color Mode</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select color mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bw">Black & White</SelectItem>
                          <SelectItem value="color">Color</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Pages per Sheet</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pages per sheet" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Paper Size</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select paper size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a4">A4</SelectItem>
                          <SelectItem value="letter">Letter</SelectItem>
                          <SelectItem value="legal">Legal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Copies</Label>
                      <Input type="number" min="1" defaultValue="1" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            <Card className="p-6 animate-slide-up">
              <h3 className="text-lg font-semibold mb-4">Pickup Time</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["09:00", "10:00", "11:00", "12:00"].map((time) => (
                  <Button
                    key={time}
                    variant="outline"
                    className="flex items-center justify-center"
                  >
                    <ClockIcon className="h-4 w-4 mr-2" />
                    {time}
                  </Button>
                ))}
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 animate-fade-in">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pages</span>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Color Mode</span>
                  <span className="font-medium">Black & White</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Paper Size</span>
                  <span className="font-medium">A4</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Copies</span>
                  <span className="font-medium">1</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>$2.50</span>
                  </div>
                </div>
                <Button className="w-full" size="lg">
                  Place Order
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}