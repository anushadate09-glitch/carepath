import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [userLocation, setUserLocation] = useState(null)
  const [locationStatus, setLocationStatus] = useState('checking')
  const [showOpenOnly, setShowOpenOnly] = useState(false)

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
      { name: 'Harborview Medical Center', phone: '206-744-8000', hours: '24/7', lat: 47.6062, lng: -122.3321, openNow: true },
      { name: 'Swedish First Hill ER', phone: '206-744-8000', hours: '24/7', lat: 47.6090, lng: -122.3270, openNow: true },
      { name: 'UW Medical Center', phone: '206-598-3300', hours: '24/7', lat: 47.6587, lng: -122.3074, openNow: true },
    ],
    'mental-health': [
      { name: 'Crisis Line', phone: '988', hours: '24/7', lat: 47.6062, lng: -122.3321, openNow: true },
      { name: 'King County Crisis Clinic', phone: '206-461-3222', hours: '24/7', lat: 47.6250, lng: -122.3187, openNow: true },
      { name: 'Evergreen Recovery Centers', phone: '206-433-7250', hours: 'Mon-Fri 8am-6pm', lat: 47.6100, lng: -122.3300, openNow: false },
    ],
    'dental': [
      { name: 'Community Health Plan Dental', phone: '206-404-1600', hours: 'Mon-Fri 8am-5pm', lat: 47.6062, lng: -122.3321, openNow: false },
      { name: 'Rainier Community Health Dental', phone: '206-788-2500', hours: 'Mon-Fri 8am-5pm', lat: 47.5720, lng: -122.3195, openNow: false },
      { name: 'Neighborcare Health Dental', phone: '206-464-4070', hours: 'Mon-Fri 9am-5pm', lat: 47.6150, lng: -122.3200, openNow: false },
    ],
    'medication': [
      { name: 'CVS Pharmacy', phone: '206-324-3800', hours: 'Daily 8am-10pm', lat: 47.6100, lng: -122.3300, openNow: true },
      { name: 'Walgreens', phone: '206-441-6300', hours: 'Daily 7am-11pm', lat: 47.6150, lng: -122.3250, openNow: true },
      { name: 'Community Health Plan Pharmacy', phone: '206-404-1600', hours: 'Mon-Fri 8am-5pm', lat: 47.6080, lng: -122.3340, openNow: false },
    ],
    'wound': [
      { name: 'Wound Care Clinic - Harborview', phone: '206-744-8000', hours: 'Mon-Fri 9am-5pm', lat: 47.6062, lng: -122.3321, openNow: false },
      { name: 'Swedish Medical Center Wound Care', phone: '206-744-8000', hours: 'Mon-Fri 9am-5pm', lat: 47.6090, lng: -122.3270, openNow: false },
      { name: 'Neighborcare Health Clinic', phone: '206-464-4070', hours: 'Mon-Fri 8am-5pm', lat: 47.6150, lng: -122.3200, openNow: false },
    ],
    'substance': [
      { name: 'Evergreen Recovery Centers', phone: '206-433-7250', hours: '24/7', lat: 47.6100, lng: -122.3300, openNow: true },
      { name: 'Therapeutic Health Services', phone: '206-624-7483', hours: 'Mon-Fri 8am-5pm', lat: 47.6170, lng: -122.3210, openNow: false },
      { name: 'Navos Mental Health', phone: '206-933-7299', hours: 'Mon-Fri 8am-5pm', lat: 47.6050, lng: -122.3350, openNow: false },
    ],
    'womens': [
      { name: 'Planned Parenthood', phone: '206-328-7700', hours: 'Mon-Fri 8am-5pm', lat: 47.6062, lng: -122.3321, openNow: false },
      { name: "Swedish Women's Health", phone: '206-744-8000', hours: 'Mon-Fri 8am-5pm', lat: 47.6090, lng: -122.3270, openNow: false },
      { name: 'UW Obstetrics & Gynecology', phone: '206-598-5000', hours: 'Mon-Fri 8am-5pm', lat: 47.6587, lng: -122.3074, openNow: false },
    ],
    'insurance': [
      { name: 'Washington Apple Health', phone: '1-877-501-2233', hours: 'Mon-Fri 8am-5pm', lat: 47.6062, lng: -122.3321, openNow: false },
      { name: 'Community Health Plan', phone: '206-521-0913', hours: 'Mon-Fri 8am-5pm', lat: 47.6080, lng: -122.3340, openNow: false },
      { name: 'Seattle-King County Department of Human Services', phone: '206-263-9360', hours: 'Mon-Fri 8am-5pm', lat: 47.6062, lng: -122.3321, openNow: false },
    ],
    'shelter': [
      { name: 'Downtown Emergency Service Center', phone: '206-464-1519', hours: '24/7', lat: 47.6062, lng: -122.3321, openNow: true },
      { name: 'Evergreen Supported Living', phone: '206-933-7000', hours: '24/7', lat: 47.6100, lng: -122.3300, openNow: true },
      { name: 'Pioneer Human Services', phone: '206-621-0201', hours: '24/7', lat: 47.6150, lng: -122.3250, openNow: true },
    ],
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus('unavailable')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setLocationStatus('granted')
      },
      (error) => {
        console.error('Geolocation error:', error)
        setLocationStatus('denied')
      },
      { timeout: 5000 }
    )
  }, [])

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 3959
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const filteredCategories = categories.filter(cat =>
    cat.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const categoryData = categories.find(c => c.id === selectedCategory)
  let categoryResources = resources[selectedCategory] || []

  // Filter by open status if toggle is on
  if (showOpenOnly) {
    categoryResources = categoryResources.filter(r => r.openNow)
  }

  if (userLocation) {
    categoryResources = [...categoryResources].sort((a, b) => {
      const distA = calculateDistance(userLocation.lat, userLocation.lng, a.lat, a.lng)
      const distB = calculateDistance(userLocation.lat, userLocation.lng, b.lat, b.lng)
      return distA - distB
    })
  }

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

        <div className="filter-toggle">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={showOpenOnly}
              onChange={(e) => setShowOpenOnly(e.target.checked)}
              className="toggle-checkbox"
            />
            <span>Show open now</span>
          </label>
        </div>
        
        <div className="resources-list">
          {categoryResources.length > 0 ? (
            categoryResources.map((resource, idx) => {
              const distance = userLocation
                ? calculateDistance(userLocation.lat, userLocation.lng, resource.lat, resource.lng)
                : null
              
              return (
                <div key={idx} className="resource-card">
                  <div className="card-header">
                    <h3>{resource.name}</h3>
                    {resource.openNow && <span className="open-badge">🟢 Open</span>}
                  </div>
                  {distance && (
                    <div className="distance">📍 {distance.toFixed(1)} miles away</div>
                  )}
                  <div className="resource-detail">
                    <span className="label">Phone:</span>
                    <a href={`tel:${resource.phone}`} className="link">{resource.phone}</a>
                  </div>
                  <div className="resource-detail">
                    <span className="label">Hours:</span>
                    <span>{resource.hours}</span>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="no-results">
              <p>No resources found matching your filters</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>CarePath</h1>
      <p className="subtitle">Healthcare Navigation for King County</p>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {locationStatus === 'granted' && userLocation && (
        <div className="location-success">✅ Using your location to sort results</div>
      )}

      {filteredCategories.length > 0 ? (
        <>
          <h2>What kind of care do you need?</h2>
          <div className="category-grid">
            {filteredCategories.map(cat => (
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
        </>
      ) : (
        <div className="no-results">
          <p>No categories found matching "{searchTerm}"</p>
          <p className="hint">Try searching for "mental", "dental", "urgent", etc.</p>
        </div>
      )}
    </div>
  )
}
