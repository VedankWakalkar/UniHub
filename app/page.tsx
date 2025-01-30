import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  PrinterIcon,
  UtensilsIcon,
  ClockIcon,
  CheckCircleIcon,
  TrendingUpIcon,
} from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-up">
              <h1 className="text-5xl font-bold leading-tight">
                Your Campus Services,
                <span className="text-blue-200"> Simplified</span>
              </h1>
              <p className="text-xl text-blue-100">
                Access all campus services in one place. Print documents, order
                food, and more with just a few clicks.
              </p>
              <div className="space-x-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  Get Started
                </Button>
                {/* <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  Learn More
                </Button> */}
              </div>
            </div>
            <div className="hidden md:block animate-float">
              <img
                src={
                  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800"
                }
                alt="Students using campus services"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white/10 backdrop-blur-lg py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-animation">
              <div className="flex items-center space-x-3">
                <ClockIcon className="h-8 w-8 text-blue-200" />
                <div>
                  <h3 className="font-semibold">24/7 Access</h3>
                  <p className="text-blue-100">
                    Always available when you need it
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircleIcon className="h-8 w-8 text-blue-200" />
                <div>
                  <h3 className="font-semibold">Easy to Use</h3>
                  <p className="text-blue-100">
                    Simple and intuitive interface
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <TrendingUpIcon className="h-8 w-8 text-blue-200" />
                <div>
                  <h3 className="font-semibold">Real-time Updates</h3>
                  <p className="text-blue-100">Track your orders instantly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600">
            Choose from our range of campus services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 stagger-animation">
          <Card className="p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-blue-100 rounded-2xl">
                <PrinterIcon className="h-10 w-10 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Printing Service
                </h2>
                <p className="text-gray-500 mt-1">
                  Print your documents with ease
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  High-quality printing options
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  Multiple file formats supported
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  Quick turnaround time
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <Link href="/services/printing">
                <Button className="w-full text-lg py-6" size="lg">
                  Start Printing
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-green-100 rounded-2xl">
                <UtensilsIcon className="h-10 w-10 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Campus Canteen
                </h2>
                <p className="text-gray-500 mt-1">
                  Order food from our campus canteen
                </p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  Wide variety of meals
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  Pre-order for pickup
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  Special dietary options
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <Link href="/services/canteen">
                <Button className="w-full text-lg py-6" size="lg">
                  Order Food
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to use our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 stagger-animation">
            {[
              {
                step: "1",
                title: "Choose a Service",
                description: "Select from our range of campus services",
                icon: "🎯",
              },
              {
                step: "2",
                title: "Place Your Order",
                description: "Customize and confirm your order details",
                icon: "📝",
              },
              {
                step: "3",
                title: "Track & Collect",
                description: "Track your order and collect when ready",
                icon: "✅",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center text-2xl mx-auto mb-6 shadow-lg">
                  {item.icon}
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-blue-600 font-bold mb-2">
                    Step {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100">
              Join thousands of students already using our campus services
              platform
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              Sign Up Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
