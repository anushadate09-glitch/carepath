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

  if (selectedCategory) {
    return (
      <div className="container">
        <button className="back-btn" onClick={() => setSelectedCategory(null)}>
          ← Back
        </button>
        <h2>Resources for: {categories.find(c => c.id === selectedCategory)?.label}</h2>
        <p className="placeholder">Coming soon: Resource cards for this category</p>
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
