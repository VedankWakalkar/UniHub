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
import { PrinterIcon, UploadIcon, ClockIcon } from "lucide-react";
import axios from "axios";
import { PDFDocument } from "pdf-lib";  // Optional: For PDF page count

interface Accessory {
  id: string;
  name: string;
  price: number;
}

export default function PrintingService() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [colorMode, setColorMode] = useState("bw");
  const [pagesPerSheet, setPagesPerSheet] = useState("1");
  const [paperSize, setPaperSize] = useState("a4");
  const [copies, setCopies] = useState(1);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedAccessories, setSelectedAccessories] = useState<{
    [key: string]: number;
  }>({});
  const [pageCount, setPageCount] = useState(0);  // Dynamically calculated page count

  const accessoriesList: Accessory[] = [
    { id: "1", name: "Stapler", price: 50 },
    { id: "2", name: "Paper Clips (Box)", price: 20 },
    { id: "3", name: "File Folder", price: 30 },
  ];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const pageCount = await getPageCount(file);
      setPageCount(pageCount);
    }
  };

  const getPageCount = async (file: File) => {
    const fileData = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileData);
    return pdfDoc.getPages().length;
  };

  const handleAccessoryQuantity = (id: string, delta: number) => {
    setSelectedAccessories((prev) => {
      const current = prev[id] || 0;
      const newQuantity = Math.max(0, current + delta);
      return { ...prev, [id]: newQuantity };
    });
  };

  // Calculate costs
  const pricePerPage = colorMode === "bw" ? 0.5 : 2;
  const pagesPerSheetValue = parseInt(pagesPerSheet);
  const totalPages = Math.ceil(pageCount / pagesPerSheetValue) * copies;
  const printingCost = totalPages * pricePerPage;
  const accessoriesTotal = Object.entries(selectedAccessories).reduce(
    (acc, [id, quantity]) =>
      acc + (accessoriesList.find((a) => a.id === id)?.price || 0) * quantity,
    0
  );

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please upload a file");
      return;
    }

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("studentId", "student123"); // Replace with actual student ID
      formData.append("documentType", "PDF"); // Example type
      formData.append("copies", copies.toString());
      formData.append("color", colorMode);
      formData.append("pagesPerSheet", pagesPerSheet);
      formData.append("paperSize", paperSize);
      formData.append("payment", (printingCost + accessoriesTotal).toString());
      formData.append("accessories", JSON.stringify(selectedAccessories));
      formData.append("pickupTime", selectedTime || "");

      // Send data to API
      const response = await axios.post("http://127.0.0.1:8000/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        alert("Order placed successfully");
      } else {
        alert("Failed to place the order");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`An error occurred: ${error?.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900">Printing Service</h1>
          <p className="mt-2 text-gray-600">
            Print your documents quickly and easily
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 animate-slide-up">
              <Tabs defaultValue="upload">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload & Settings</TabsTrigger>
                  <TabsTrigger value="accessories">Accessories</TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="space-y-6">
                  <div className="space-y-4">
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
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Print Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Color Mode</Label>
                        <Select value={colorMode} onValueChange={setColorMode}>
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
                        <Select
                          value={pagesPerSheet}
                          onValueChange={setPagesPerSheet}
                        >
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
                        <Select value={paperSize} onValueChange={setPaperSize}>
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
                        <Input
                          type="number"
                          min="1"
                          value={copies}
                          onChange={(e) => setCopies(Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="accessories" className="space-y-6">
                  <h3 className="text-lg font-semibold">Accessories</h3>
                  {accessoriesList.map((accessory) => (
                    <div key={accessory.id} className="flex items-center justify-between">
                      <span>{accessory.name}</span>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAccessoryQuantity(accessory.id, -1)}
                        >
                          -
                        </Button>
                        <span className="mx-2">{selectedAccessories[accessory.id] || 0}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAccessoryQuantity(accessory.id, 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Summary</h3>
              <div className="flex justify-between">
                <span>Total Pages</span>
                <span>{totalPages}</span>
              </div>
              <div className="flex justify-between">
                <span>Printing Cost</span>
                <span>{printingCost.toFixed(2)} INR</span>
              </div>
              <div className="flex justify-between">
                <span>Accessories</span>
                <span>{accessoriesTotal.toFixed(2)} INR</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Payment</span>
                <span>{(printingCost + accessoriesTotal).toFixed(2)} INR</span>
              </div>
              <Button onClick={handleSubmit} className="w-full mt-4">
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
