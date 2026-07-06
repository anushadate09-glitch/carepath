import { useState } from 'react'
import './App.css'

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const categories = [
    { id: 'urgent', label: 'Urgent Medical Care', icon: '🚑' },
    { id: 'mental-health', label: 'Mental Health Crisis', icon: '🧠' },
    { id: 'dental', label: 'Dental Care', icon: '🦷' },
    { id: 'medication', label: 'Medication Refill', icon: '💊' },
    { id: 'wound', label: 'Wound Care', icon: '🩹' },
    { id: 'substance', label: 'Substance Use/Recovery', icon: '🤝' },
    { id: 'womens', label: "Women's Health", icon: '💪' },
    { id: 'insurance', label: 'Insurance/Apple Health Help', icon: '📋' },
    { id: 'shelter', label: 'Shelter + Hygiene Resources', icon: '🏠' },
  ]

  const resources = {
    'urgent': [
      { name: 'Harborview Medical Center', phone: '206-744-8000', hours: '24/7', address: '325 9th Ave, Seattle' },
      { name: 'Swedish First Hill ER', phone: '206-744-8000', hours: '24/7', address: '747 Broadway, Seattle' },
      { name: 'UW Medical Center', phone: '206-598-3300', hours: '24/7', address: '1959 NE Pacific St, Seattle' },
    ],
    'mental-health': [
      { name: 'Crisis Line', phone: '988', hours: '24/7', address: 'Call or text anytime' },
      { name: 'King County Crisis Clinic', phone: '206-461-3222', hours: '24/7', address: '1530 Eastlake Ave E, Seattle' },
      { name: 'Evergreen Recovery Centers', phone: '206-433-7250', hours: 'Mon-Fri 8am-6pm', address: 'Multiple locations' },
    ],
    'dental': [
      { name: 'Community Health Plan Dental', phone: '206-404-1600', hours: 'Mon-Fri 8am-5pm', address: 'Multiple locations' },
      { name: 'Rainier Community Health Dental', phone: '206-788-2500', hours: 'Mon-Fri 8am-5pm', address: 'Multiple locations' },
      { name: 'Neighborcare Health Dental', phone: '206-464-4070', hours: 'Mon-Fri 9am-5pm', address: 'Multiple locations' },
    ],
    'medication': [
      { name: 'CVS Pharmacy', phone: '206-324-3800', hours: 'Daily 8am-10pm', address: 'Multiple locations in Seattle' },
      { name: 'Walgreens', phone: '206-441-6300', hours: 'Daily 7am-11pm', address: 'Multiple locations in Seattle' },
      { name: 'Community Health Plan Pharmacy', phone: '206-404-1600', hours: 'Mon-Fri 8am-5pm', address: 'Multiple locations' },
    ],
    'wound': [
      { name: 'Wound Care Clinic - Harborview', phone: '206-744-8000', hours: 'Mon-Fri 9am-5pm', address: '325 9th Ave, Seattle' },
      { name: 'Swedish Medical Center Wound Care', phone: '206-744-8000', hours: 'Mon-Fri 9am-5pm', address: '747 Broadway, Seattle' },
      { name: 'Neighborcare Health Clinic', phone: '206-464-4070', hours: 'Mon-Fri 8am-5pm', address: 'Multiple locations' },
    ],
    'substance': [
      { name: 'Evergreen Recovery Centers', phone: '206-433-7250', hours: '24/7', address: 'Multiple locations' },
      { name: 'Therapeutic Health Services', phone: '206-624-7483', hours: 'Mon-Fri 8am-5pm', address: 'Multiple locations' },
      { name: 'Navos Mental Health', phone: '206-933-7299', hours: 'Mon-Fri 8am-5pm', address: 'Multiple locations' },
    ],
    'womens': [
      { name: 'Planned Parenthood', phone: '206-328-7700', hours: 'Mon-Fri 8am-5pm', address: 'Multiple locations' },
      { name: "Swedish Women's Health", phone: '206-744-8000', hours: 'Mon-Fri 8am-5pm', address: 'Multiple locations' },
      { name: 'UW Obstetrics & Gynecology', phone: '206-598-5000', hours: 'Mon-Fri 8am-5pm', address: 'Multiple locations' },
    ],
    'insurance': [
      { name: 'Washington Apple Health', phone: '1-877-501-2233', hours: 'Mon-Fri 8am-5pm', address: 'Online application' },
      { name: 'Community Health Plan', phone: '206-521-0913', hours: 'Mon-Fri 8am-5pm', address: '520 3rd Ave, Seattle' },
      { name: 'Seattle-King County Department of Human Services', phone: '206-263-9360', hours: 'Mon-Fri 8am-5pm', address: 'Multiple locations' },
    ],
    'shelter': [
      { name: 'Downtown Emergency Service Center', phone: '206-464-1519', hours: '24/7', address: '2001 3rd Ave, Seattle' },
      { name: 'Evergreen Supported Living', phone: '206-933-7000', hours: '24/7', address: 'Multiple locations' },
      { name: 'Pioneer Human Services', phone: '206-621-0201', hours: '24/7', address: 'Multiple locations' },
    ],
  }

  const categoryData = categories.find(c => c.id === selectedCategory)
  const categoryResources = resources[selectedCategory] || []

  if (selectedCategory) {
    return (
      <div className="container">
        <button className="back-btn" onClick={() => setSelectedCategory(null)}>
          ← Back
        </button>
        <div className="category-header">
          <div className="icon-large">{categoryData?.icon}</div>
          <h2>{categoryData?.label}</h2>
        </div>
        
        <div className="resources-list">
          {categoryResources.map((resource, idx) => (
            <div key={idx} className="resource-card">
              <h3>{resource.name}</h3>
              <div className="resource-detail">
                <span className="label">Phone:</span>
                <a href={`tel:${resource.phone}`} className="link">{resource.phone}</a>
              </div>
              <div className="resource-detail">
                <span className="label">Hours:</span>
                <span>{resource.hours}</span>
              </div>
              <div className="resource-detail">
                <span className="label">Address:</span>
                <span>{resource.address}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>CarePath</h1>
      <p className="subtitle">Healthcare Navigation for King County</p>
      <h2>What kind of care do you need?</h2>
      <div className="category-grid">
        {categories.map(cat => (
          <button
            key={cat.id}
            className="category-btn"
            onClick={() => setSelectedCategory(cat.id)}
          >
            <div className="icon">{cat.icon}</div>
            <div className="label">{cat.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
