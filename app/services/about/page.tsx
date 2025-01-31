import { Card } from "@/components/ui/card";
import {
  BookOpenIcon,
  GraduationCapIcon,
  LibraryIcon as BuildingLibraryIcon,
  UsersIcon,
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Campus Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering students and staff with seamless access to essential
            campus services
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 animate-slide-up">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <BookOpenIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold">Our Mission</h2>
            </div>
            <p className="text-gray-600">
              To streamline campus services through innovative technology,
              making student life more efficient and enjoyable.
            </p>
          </Card>

          <Card className="p-8 animate-slide-up">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-green-100 rounded-full">
                <GraduationCapIcon className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold">Our Vision</h2>
            </div>
            <p className="text-gray-600">
              To create a connected campus ecosystem where every service is just
              a click away.
            </p>
          </Card>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { number: "10,000+", label: "Students Served", icon: UsersIcon },
            {
              number: "50,000+",
              label: "Orders Completed",
              icon: BuildingLibraryIcon,
            },
            {
              number: "99.9%",
              label: "Satisfaction Rate",
              icon: GraduationCapIcon,
            },
          ].map((stat, index) => (
            <Card key={index} className="p-8 text-center animate-slide-up">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-blue-100 rounded-full mb-4">
                  {<stat.icon className="h-6 w-6 text-blue-600" />}
                </div>
                <h3 className="text-3xl font-bold text-gray-900">
                  {stat.number}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Varun Vangar",
                role: "TY AIML STUDENT",
                image: "",
              },
              {
                name: "Vedank Wakalkar",
                role: "TY AIML STUDENT",
                image: "",
              },
              {
                name: "Chinmay Kale",
                role: "TY IT STUDENT",
                image: "",
              },
            ].map((member, index) => (
              <Card key={index} className="p-6 animate-slide-up">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
