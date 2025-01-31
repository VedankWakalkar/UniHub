"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  UtensilsIcon,
  ClockIcon,
  ShoppingCartIcon,
  PlusIcon,
  MinusIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

export default function CanteenService() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const menuItems: MenuItem[] = [
    {
      id: "1",
      name: "Classic Burger",
      description: "Beef patty with lettuce, tomato, and cheese",
      price: 8.99,
      category: "main",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300",
    },
    {
      id: "2",
      name: "Caesar Salad",
      description: "Fresh romaine lettuce with Caesar dressing",
      price: 6.99,
      category: "main",
      image:
        "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=300",
    },
    {
      id: "3",
      name: "Margherita Pizza",
      description: "Fresh tomatoes, mozzarella, and basil",
      price: 12.99,
      category: "main",
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=300",
    },
    {
      id: "4",
      name: "Iced Coffee",
      description: "Cold-brewed coffee with milk",
      price: 3.99,
      category: "drinks",
      image:
        "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=300",
    },
  ];

  const addToCart = (item: MenuItem) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...currentCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900">Campus Canteen</h1>
          <p className="mt-2 text-gray-600">Order delicious meals for pickup</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Items */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="main" className="animate-slide-up">
              <TabsList>
                <TabsTrigger value="main">Main Dishes</TabsTrigger>
                <TabsTrigger value="drinks">Drinks</TabsTrigger>
              </TabsList>
              <TabsContent value="main" className="grid gap-6">
                {menuItems
                  .filter((item) => item.category === "main")
                  .map((item) => (
                    <Card
                      key={item.id}
                      className="p-4 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {item.description}
                              </p>
                            </div>
                            <span className="font-semibold">${item.price.toFixed(2)}</span>
                          </div>
                          <Button
                            onClick={() => addToCart(item)}
                            className="mt-4"
                            size="sm"
                          >
                            Add to Order
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
              </TabsContent>
              <TabsContent value="drinks" className="grid gap-6">
                {menuItems
                  .filter((item) => item.category === "drinks")
                  .map((item) => (
                    <Card
                      key={item.id}
                      className="p-4 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {item.description}
                              </p>
                            </div>
                            <span className="font-semibold">₹{item.price.toFixed(2)}</span>
                          </div>
                          <Button
                            onClick={() => addToCart(item)}
                            className="mt-4"
                            size="sm"
                          >
                            Add to Order
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Your Order</h3>
                <Badge variant="secondary">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  20-30 mins
                </Badge>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCartIcon className="h-12 w-12 mx-auto mb-4" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <MinusIcon className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => addToCart(item)}
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}

                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span>₹{totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-gray-600">Service Fee</span>
                      <span>₹1.00</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>₹{(totalAmount + 1).toFixed(2)}</span>
                    </div>
                  </div>
                  <Link href="payment">
                    <Button className="w-full" size="lg">
                      Place Order
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
