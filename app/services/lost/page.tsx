"use client";
import React, { useState, ChangeEvent } from 'react';
import { Search, Filter, PlusCircle, MapPin, Calendar, Tag, User, Upload } from 'lucide-react';

type Item = {
  id: number;
  type: 'lost' | 'found';
  title: string;
  description: string;
  location: string;
  date: string;
  category: string;
  image: string;
  contact: string;
};

type FormData = {
  type: 'lost' | 'found';
  title: string;
  description: string;
  location: string;
  category: string;
  contact: string;
  image: File | null;
};

const initialItems: Item[] = [
  {
    id: 1,
    type: 'lost',
    title: 'Lost Black Wallet',
    description: 'Leather wallet containing ID and cards',
    location: 'Central Park',
    date: '2024-03-15',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1627843563095-f6e94676cfe0?auto=format&fit=crop&q=80&w=400',
    contact: 'john.doe@email.com'
  },
  {
    id: 2,
    type: 'found',
    title: 'Found iPhone 13',
    description: 'Black iPhone 13 with blue case',
    location: 'Library',
    date: '2024-03-14',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=400',
    contact: 'jane.smith@email.com'
  }
];

const categories = ['All', 'Electronics', 'Accessories', 'Documents', 'Pets', 'Other'];

const initialFormData: FormData = {
  type: 'lost',
  title: '',
  description: '',
  location: '',
  category: 'Other',
  contact: '',
  image: null
};

function LostAndFoundPage() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setFormData(prev => ({ ...prev, image: file }));
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = 'https://images.unsplash.com/photo-1593789382576-54f489574d26?auto=format&fit=crop&q=80&w=400';
    
    if (formData.image) {
      const reader = new FileReader();
      imageUrl = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(formData.image);
      });
    }

    const newItem: Item = {
      id: items.length + 1,
      ...formData,
      date: new Date().toISOString().split('T')[0],
      image: imageUrl
    };

    setItems(prev => [...prev, newItem]);
    setFormData(initialFormData);
    setPreviewUrl('');
    setShowForm(false);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-gray-50 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Lost & Found</h1>
          <p className="text-lg text-gray-600">Connect lost items with their owners</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for lost or found items..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
              <select
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Report Item</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative h-48">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${
                  item.type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    {item.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Tag className="h-4 w-4 mr-2" />
                    {item.category}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-2" />
                    {item.contact}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showForm && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowForm(false);
                setFormData(initialFormData);
                setPreviewUrl('');
              }
            }}
          >
            <div 
              className="bg-white rounded-lg w-full max-w-2xl my-8 opacity-0 translate-y-4 animate-modal-enter"
              style={{
                height: 'calc(100vh - 4rem)',
                maxHeight: '800px',
              }}
            >
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center border-b p-6">
                  <h2 className="text-2xl font-bold text-gray-900">Report an Item</h2>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setFormData(initialFormData);
                      setPreviewUrl('');
                    }}
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  <form className="space-y-6">
                    <FormSection title="Basic Information">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Type</label>
                          <select
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-200 rounded-lg transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          >
                            <option value="lost">Lost</option>
                            <option value="found">Found</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Category</label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-200 rounded-lg transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          >
                            {categories.slice(1).map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </FormSection>

                    <FormSection title="Item Details">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Title</label>
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-200 rounded-lg transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Description</label>
                          <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-200 rounded-lg transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            rows={3}
                            required
                          ></textarea>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Location</label>
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-200 rounded-lg transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            required
                          />
                        </div>
                      </div>
                    </FormSection>

                    <FormSection title="Contact Information">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                        <input
                          type="email"
                          name="contact"
                          value={formData.contact}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-200 rounded-lg transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </FormSection>

                    <FormSection title="Image Upload">
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg transition-all duration-300 hover:border-blue-500">
                      <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400 transition-colors group-hover:text-blue-500" />
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="image-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 transition-colors">
                              <span>Upload a file</span>
                              <input
                                id="image-upload"
                                name="image"
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={handleImageChange}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                      {previewUrl && (
                        <div className="mt-4 transition-all duration-300">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="h-32 w-full object-cover rounded-lg shadow-md"
                          />
                        </div>
                      )}
                    </FormSection>
                  </form>
                </div>

                <div className="border-t p-6">
                  <div className="flex gap-4">
                    <button
                      onClick={handleSubmit}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-[1.02]"
                    >
                      Submit Report
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setFormData(initialFormData);
                        setPreviewUrl('');
                      }}
                      className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-300 transform hover:scale-[1.02]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LostAndFoundPage;