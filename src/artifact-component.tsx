import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';

const Dashboard = () => {
  // Sample data - in real application this would come from props
  const timelineData = [
    { year: "1800-1825", count: 245 },
    { year: "1826-1850", count: 567 },
    { year: "1851-1875", count: 890 },
    { year: "1876-1900", count: 1234 },
    { year: "1901-1925", count: 2100 },
    { year: "1926-1950", count: 1789 }
  ];

  const documentTypes = [
    { name: "Letters", value: 3245 },
    { name: "Diaries", value: 2156 },
    { name: "Manuscripts", value: 1789 },
    { name: "Official Records", value: 1456 },
    { name: "Newspapers", value: 987 }
  ];

  const languageData = [
    { language: "English", percentage: 45 },
    { language: "French", percentage: 20 },
    { language: "German", percentage: 15 },
    { language: "Italian", percentage: 12 },
    { language: "Latin", percentage: 8 }
  ];

  const preservationData = [
    { month: "Jan", digitized: 145, catalogued: 120 },
    { month: "Feb", digitized: 178, catalogued: 156 },
    { month: "Mar", digitized: 235, catalogued: 190 },
    { month: "Apr", digitized: 289, catalogued: 220 },
    { month: "May", digitized: 356, catalogued: 280 },
    { month: "Jun", digitized: 412, catalogued: 350 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="p-4 w-full space-y-4">
      <h1 className="text-2xl font-bold mb-4">Cultural Heritage Text Corpus Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Temporal Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Temporal Distribution of Texts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="count" 
                    fill="#8884d8" 
                    stroke="#8884d8"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Document Types */}
        <Card>
          <CardHeader>
            <CardTitle>Document Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={documentTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {documentTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Language Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Language Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={languageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="language" />
                  <YAxis unit="%" />
                  <Tooltip />
                  <Bar dataKey="percentage" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Preservation Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Digitization & Cataloguing Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={preservationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="digitized" 
                    stroke="#8884d8" 
                    name="Digitized"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="catalogued" 
                    stroke="#82ca9d" 
                    name="Catalogued"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;