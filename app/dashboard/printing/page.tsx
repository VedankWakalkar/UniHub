"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  PrinterIcon,
  PackageIcon,
  FileTextIcon,
  AlertCircleIcon,
  CheckCircleIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PrintingDashboard() {
  const [printJobs] = useState([
    {
      id: "1",
      user: "John Doe",
      document: "Assignment.pdf",
      pages: 5,
      status: "Pending",
      time: "5 minutes ago",
    },
    {
      id: "2",
      user: "Jane Smith",
      document: "Thesis.docx",
      pages: 50,
      status: "Printing",
      time: "2 minutes ago",
    },
  ]);

  const [supplies] = useState([
    {
      id: "1",
      name: "A4 Paper",
      quantity: 2500,
      unit: "sheets",
      status: "Good",
    },
    {
      id: "2",
      name: "Black Toner",
      quantity: 15,
      unit: "%",
      status: "Low",
    },
    {
      id: "3",
      name: "Color Toner",
      quantity: 45,
      unit: "%",
      status: "Good",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900">
            Printing Service Dashboard
          </h1>
          <p className="mt-2 text-gray-600">Manage print jobs and supplies</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-slide-up">
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <FileTextIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed Today</p>
                <p className="text-2xl font-bold">45</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <PackageIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Low Supplies</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <AlertCircleIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Alerts</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Print Jobs */}
          <Card className="animate-slide-up">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Active Print Jobs</h2>
            </div>
            <div className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Document</TableHead>
                    <TableHead>Pages</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {printJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>{job.user}</TableCell>
                      <TableCell>{job.document}</TableCell>
                      <TableCell>{job.pages}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            job.status === "Printing" ? "success" : "warning"
                          }
                        >
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          {job.status === "Pending" ? "Start" : "Complete"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Supplies Management */}
          <Card className="animate-slide-up">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Supplies Status</h2>
            </div>
            <div className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supplies.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        {item.quantity} {item.unit}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.status === "Good" ? "success" : "warning"
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Restock
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
