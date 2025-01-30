"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  UtensilsIcon,
  PackageIcon,
  ClipboardListIcon,
  TrendingUpIcon,
  AlertCircleIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CanteenDashboard() {
  const [activeOrders] = useState([
    {
      id: "1",
      items: "2x Sandwich, 1x Coffee",
      status: "Preparing",
      time: "5 minutes ago",
      total: "$15.97",
    },
    {
      id: "2",
      items: "1x Pizza, 2x Soda",
      status: "Ready",
      time: "2 minutes ago",
      total: "$18.99",
    },
  ]);

  const [inventory] = useState([
    {
      id: "1",
      name: "Bread",
      quantity: 50,
      unit: "pieces",
      status: "Good",
    },
    {
      id: "2",
      name: "Coffee Beans",
      quantity: 5,
      unit: "kg",
      status: "Low",
    },
    {
      id: "3",
      name: "Cheese",
      quantity: 8,
      unit: "kg",
      status: "Good",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900">Canteen Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage orders and inventory</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-slide-up">
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <ClipboardListIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Orders</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUpIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Today's Sales</p>
                <p className="text-2xl font-bold">$524.99</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <PackageIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold">3</p>
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
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Orders */}
          <Card className="animate-slide-up">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Active Orders</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {activeOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{order.items}</p>
                      <p className="text-sm text-gray-500">{order.time}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge
                        variant={order.status === "Ready" ? "success" : "warning"}
                      >
                        {order.status}
                      </Badge>
                      <span className="font-semibold">{order.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Inventory Management */}
          <Card className="animate-slide-up">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Inventory Status</h2>
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
                  {inventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        {item.quantity} {item.unit}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={item.status === "Good" ? "success" : "warning"}
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Update
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