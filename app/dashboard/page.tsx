"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "next/navigation";
import {
  PrinterIcon,
  UtensilsIcon,
  ClockIcon,
  HistoryIcon,
  UserIcon,
  CreditCardIcon,
  BellIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { set } from "date-fns";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeOrders, setActiveOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [student, setStudent] = useState({});
  const [studentName, setStudentName] = useState("Loading...");

  // Fetch active orders, order history, and student details on component mount
  useEffect(() => {
    const userEmail = sessionStorage.getItem("userEmail") || "Loading...";
    setEmail(userEmail);

    const fetchData = async () => {
      try {
        // Fetch active orders
        // const response = await axios.post("http://127.0.0.1:8000/login", {
        //   email,
        //   password,
        // });
        // const  user_data  = response.data;
        // console.log(user_data.user_data.role)
        // setEmail(user_data.user_data.email);
        // setStudentName(user_data.user_data.name);
        // const activeResponse = await axios.get("http://127.0.0.1:8000/orders/active");
        // setActiveOrders(activeResponse.data);

        // Fetch order history

        // const historyResponse = await axios.get("http://127.0.0.1:8000/orders/history");
        // setOrderHistory(historyResponse.data);

        // Fetch student details
        console.log(email)
        const studentResponse = await axios.get("http://127.0.0.1:8000/student",{
          params: {
            email: email,
          }
        }); 
        console.log(studentResponse.data);
        const name = studentResponse.data;
        // Replace with actual endpoint
      
        console.log(studentResponse.data?.name);

        // const result = studentResponse.data.name;
        // setStudentName(result);
        // console.log(result);
        setStudent(studentResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  },[email]);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 space-y-6 animate-slide-up">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{student?.name}</h2>
                  <p className="text-sm text-gray-500">Student ID: {student?.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/dashboard">
                    <ClockIcon className="mr-2 h-4 w-4" /> Dashboard
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/dashboard/orders">
                    <HistoryIcon className="mr-2 h-4 w-4" /> Order History
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/dashboard/payments">
                    <CreditCardIcon className="mr-2 h-4 w-4" /> Payments
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <BellIcon className="mr-2 h-4 w-4" /> Notifications
                </Button>
              </div>
            </Card>
          </div>
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              <Card className="p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <Link href="/services/printing">
                  <div className="flex items-center space-x-4">
                    <div className="p-4 bg-blue-100 rounded-2xl">
                      <PrinterIcon className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Print Documents</h3>
                      <p className="text-sm text-gray-500">
                        Start a new print job
                      </p>
                    </div>
                  </div>
                </Link>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <Link href="/services/canteen">
                  <div className="flex items-center space-x-4">
                    <div className="p-4 bg-green-100 rounded-2xl">
                      <UtensilsIcon className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Order Food</h3>
                      <p className="text-sm text-gray-500">
                        Browse canteen menu
                      </p>
                    </div>
                  </div>
                </Link>
              </Card>
            </div>
            {/* Active Orders and History */}
            <Tabs defaultValue="active" className="animate-slide-up">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="active">Active Orders</TabsTrigger>
                <TabsTrigger value="history">Order History</TabsTrigger>
              </TabsList>
              <TabsContent value="active">
                <Card>
                  <div className="divide-y">
                    {activeOrders.length > 0 ? (
                      activeOrders.map((order) => (
                        <div key={order.id} className="p-4 hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              {order.type === "printing" ? (
                                <PrinterIcon className="h-6 w-6 text-blue-600" />
                              ) : (
                                <UtensilsIcon className="h-6 w-6 text-green-600" />
                              )}
                              <div>
                                <p className="font-medium">{order.details}</p>
                                <p className="text-sm text-gray-500">
                                  Ordered by: {order.studentName} ({order.studentEmail})
                                </p>
                              </div>
                            </div>
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No active orders.
                      </div>
                    )}
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="history">
                <Card>
                  <div className="divide-y">
                    {orderHistory.length > 0 ? (
                      orderHistory.map((order) => (
                        <div key={order.id} className="p-4 hover:bg-gray-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              {order.type === "printing" ? (
                                <PrinterIcon className="h-6 w-6 text-blue-600" />
                              ) : (
                                <UtensilsIcon className="h-6 w-6 text-green-600" />
                              )}
                              <div>
                                <p className="font-medium">{order.details}</p>
                                <p className="text-sm text-gray-500">
                                  Ordered by: {order.studentName} ({order.studentEmail})
                                </p>
                              </div>
                            </div>
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No order history.
                      </div>
                    )}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}