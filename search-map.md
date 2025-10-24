# 🔍 Property Search API Documentation

## Overview
This documentation covers the intelligent property search API with Google Maps integration. The search system is designed to work seamlessly with Google Places API and provides smart location matching, fuzzy search, and comprehensive filtering options.

## Base URL
```
https://your-domain.com/api/v1/properties
```

## Authentication
All endpoints are public and don't require authentication.

---

## 📍 Search Endpoints

### 1. Basic Search
**Endpoint:** `GET /search`

**Description:** General search across all property fields with optional location filtering.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | No | Search term for name, type, description, permit_number |
| `location` | string | No | Location name or Google Places formatted address |
| `lat` | float | No | Latitude for distance-based sorting |
| `lng` | float | No | Longitude for distance-based sorting |
| `radius` | integer | No | Search radius in km (default: 50) |

**Example Requests:**
```bash
# Text search
GET /api/v1/properties/search?query=villa

# Location search
GET /api/v1/properties/search?location=Dubai Marina

# Combined search
GET /api/v1/properties/search?query=luxury&location=Dubai Marina

# With coordinates for distance sorting
GET /api/v1/properties/search?location=Dubai Marina&lat=25.0772&lng=55.1308&radius=25
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Luxury Villa in Dubai Marina",
      "location": "Dubai Marina, Dubai, UAE",
      "type": "villa",
      "category": "regular",
      "bathrooms": 3,
      "bedrooms": 4,
      "area": 250.50,
      "price": 3500000,
      "listing_type": "sale",
      "pictures": [
        "https://your-domain.com/storage/properties/image1.jpg",
        "https://your-domain.com/storage/properties/image2.jpg"
      ],
      "description": "Beautiful luxury villa with modern amenities...",
      "permit_number": "PERMIT123456",
      "agent": {
        "id": 1,
        "name": "John Smith",
        "job_title": "Senior Real Estate Agent",
        "photo_url": "https://your-domain.com/storage/agents/agent1.jpg"
      },
      "distance_km": 2.5,
      "created_at": "2024-01-15T10:30:00.000000Z",
      "updated_at": "2024-01-15T10:30:00.000000Z"
    }
  ]
}
```

---

### 2. Location-Specific Search
**Endpoint:** `GET /search/location`

**Description:** Optimized for location-based searches with Google Places integration.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `location` | string | Yes | Google Places formatted address or location name |
| `lat` | float | No | Latitude for distance-based sorting |
| `lng` | float | No | Longitude for distance-based sorting |
| `radius` | integer | No | Search radius in km (default: 25) |

**Example Requests:**
```bash
# Google Places formatted address
GET /api/v1/properties/search/location?location=Dubai Marina, Dubai, UAE

# Simple location name
GET /api/v1/properties/search/location?location=Downtown Dubai

# With coordinates for distance sorting
GET /api/v1/properties/search/location?location=Dubai Marina&lat=25.0772&lng=55.1308&radius=15
```

**Response:** Same format as Basic Search

---

### 3. Advanced Search
**Endpoint:** `GET /search/advanced`

**Description:** Comprehensive search with multiple filters and Google Maps integration.

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | No | Search term for name, type, description, permit_number |
| `location` | string | No | Location name or Google Places formatted address |
| `lat` | float | No | Latitude for distance-based sorting |
| `lng` | float | No | Longitude for distance-based sorting |
| `radius` | integer | No | Search radius in km (default: 50) |
| `type` | string | No | Property type (apartment, villa, townhouse, etc.) |
| `category` | string | No | Property category (regular, ready-project, off-plans, off-plans-resale) |
| `listing_type` | string | No | Sale or rent |
| `min_price` | float | No | Minimum price in AED |
| `max_price` | float | No | Maximum price in AED |
| `min_bedrooms` | integer | No | Minimum number of bedrooms |
| `max_bedrooms` | integer | No | Maximum number of bedrooms |
| `min_bathrooms` | integer | No | Minimum number of bathrooms |
| `max_bathrooms` | integer | No | Maximum number of bathrooms |
| `min_area` | float | No | Minimum area in m² |
| `max_area` | float | No | Maximum area in m² |

**Example Requests:**
```bash
# Full-featured search
GET /api/v1/properties/search/advanced?query=villa&location=Dubai Marina&lat=25.0772&lng=55.1308&radius=25&type=villa&category=regular&listing_type=sale&min_price=1000000&max_price=5000000&min_bedrooms=2&max_bedrooms=4&min_bathrooms=2&max_bathrooms=3&min_area=100&max_area=200

# Off-plans search
GET /api/v1/properties/search/advanced?category=off-plans&location=Dubai Hills&min_price=500000&max_price=2000000&min_bedrooms=1&max_bedrooms=3

# Ready projects search
GET /api/v1/properties/search/advanced?category=ready-project&type=apartment&listing_type=sale&min_area=80&max_area=150
```

**Response:**
```json
{
  "success": true,
  "total": 15,
  "data": [
    {
      "id": 1,
      "name": "Luxury Villa in Dubai Marina",
      "location": "Dubai Marina, Dubai, UAE",
      "type": "villa",
      "category": "regular",
      "bathrooms": 3,
      "bedrooms": 4,
      "area": 250.50,
      "price": 3500000,
      "listing_type": "sale",
      "pictures": ["url1", "url2"],
      "description": "Beautiful luxury villa...",
      "permit_number": "PERMIT123456",
      "agent": {...},
      "distance_km": 2.5,
      "created_at": "2024-01-15T10:30:00.000000Z",
      "updated_at": "2024-01-15T10:30:00.000000Z"
    }
  ]
}
```

---

## 🏠 Property Categories & Types

### Categories
- `regular` - Standard properties (sale/rent)
- `ready-project` - Completed projects
- `off-plans` - Under construction projects
- `off-plans-resale` - Resale of off-plan properties

### Listing Types
- `sale` - Properties for sale
- `rent` - Properties for rent

### Property Types
- `apartment` - Apartment units
- `villa` - Villas and houses
- `townhouse` - Townhouses
- `penthouse` - Penthouses
- `studio` - Studio apartments
- `duplex` - Duplex units

---

## 🗺️ Google Maps Integration

### Location Intelligence Features

#### 1. Google Places Compatibility
The API understands Google Places formatted addresses:
```
"Dubai Marina, Dubai, UAE"
"Downtown Dubai, Dubai, UAE"
"Palm Jumeirah, Dubai, UAE"
```

#### 2. Component-Based Search
Automatically breaks down addresses into searchable components:
- "Dubai Marina, Dubai, UAE" → searches for "Dubai Marina", "Dubai", "UAE"

#### 3. Fuzzy Location Matching
Smart matching for common location variations:

| Search Term | Matches |
|-------------|---------|
| `Marina` | Dubai Marina, Marina Walk, Marina District |
| `Downtown` | Downtown Dubai, Downtown, Burj Khalifa |
| `JBR` | Jumeirah Beach Residence, JBR, Jumeirah Beach |
| `Palm` | Palm Jumeirah, Palm, Palm Island |
| `Business Bay` | Business Bay, Bay, Business District |
| `DIFC` | DIFC, Dubai International Financial Centre |
| `JLT` | Jumeirah Lake Towers, JLT, Lake Towers |
| `JVC` | Jumeirah Village Circle, JVC, Village Circle |

#### 4. UAE Location Recognition
Automatically recognizes all UAE emirates and major areas:
- Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain

### Coordinate-Based Search

#### Distance Sorting
When `lat` and `lng` parameters are provided:
- Results are sorted by proximity to the given coordinates
- `distance_km` field is included in response
- `radius` parameter limits search area

#### Example with Coordinates:
```bash
GET /api/v1/properties/search/advanced?location=Dubai Marina&lat=25.0772&lng=55.1308&radius=10
```

---

## 🎯 Frontend Integration Examples

### 1. Google Maps Autocomplete Integration

```javascript
// When user selects location from Google Places autocomplete
function onPlaceSelected(place) {
  const location = place.formatted_address;
  const lat = place.geometry.location.lat();
  const lng = place.geometry.location.lng();
  
  // Search properties in this location
  searchProperties({
    location: location,
    lat: lat,
    lng: lng,
    radius: 25
  });
}

async function searchProperties(params) {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`/api/v1/properties/search/advanced?${queryString}`);
  const data = await response.json();
  
  if (data.success) {
    displayPropertiesOnMap(data.data);
  }
}
```

### 2. Map Click Search

```javascript
// When user clicks on map
function onMapClick(event) {
  const lat = event.latLng.lat();
  const lng = event.latLng.lng();
  
  // Reverse geocode to get location name
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location: { lat, lng } }, (results) => {
    if (results[0]) {
      const location = results[0].formatted_address;
      
      // Search properties near this location
      searchProperties({
        location: location,
        lat: lat,
        lng: lng,
        radius: 15
      });
    }
  });
}
```

### 3. Filter-Based Search

```javascript
// Advanced search with filters
function performAdvancedSearch(filters) {
  const params = {
    query: filters.searchTerm,
    location: filters.selectedLocation,
    lat: filters.latitude,
    lng: filters.longitude,
    radius: filters.radius || 25,
    type: filters.propertyType,
    category: filters.category,
    listing_type: filters.listingType,
    min_price: filters.minPrice,
    max_price: filters.maxPrice,
    min_bedrooms: filters.minBedrooms,
    max_bedrooms: filters.maxBedrooms,
    min_bathrooms: filters.minBathrooms,
    max_bathrooms: filters.maxBathrooms,
    min_area: filters.minArea,
    max_area: filters.maxArea
  };
  
  // Remove empty parameters
  Object.keys(params).forEach(key => {
    if (params[key] === null || params[key] === undefined || params[key] === '') {
      delete params[key];
    }
  });
  
  const queryString = new URLSearchParams(params).toString();
  return fetch(`/api/v1/properties/search/advanced?${queryString}`);
}
```

---

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "total": 15,  // Only in advanced search
  "data": [
    {
      "id": 1,
      "name": "Property Name",
      "location": "Full Address",
      "type": "property_type",
      "category": "property_category",
      "bathrooms": 3,
      "bedrooms": 4,
      "area": 250.50,
      "price": 3500000,
      "listing_type": "sale|rent",
      "pictures": ["url1", "url2"],
      "description": "Property description...",
      "permit_number": "PERMIT123456",
      "agent": {
        "id": 1,
        "name": "Agent Name",
        "job_title": "Agent Title",
        "photo_url": "agent_photo_url"
      },
      "distance_km": 2.5,  // Only when coordinates provided
      "created_at": "2024-01-15T10:30:00.000000Z",
      "updated_at": "2024-01-15T10:30:00.000000Z"
    }
  ]
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 🔧 Error Handling

### Common Error Codes
- `400` - Bad Request (missing required parameters)
- `404` - Not Found (property not found)
- `500` - Internal Server Error

### Error Examples
```json
{
  "success": false,
  "message": "Search query, location, or coordinates are required"
}
```

---

## 🚀 Best Practices

### 1. Search Optimization
- Use specific location names for better results
- Combine text search with location for precise results
- Use coordinates for distance-based sorting

### 2. Performance Tips
- Implement debouncing for search inputs
- Cache frequently searched locations
- Use pagination for large result sets

### 3. User Experience
- Show loading states during search
- Display search result counts
- Provide clear error messages
- Implement search suggestions

---

## 📱 Mobile Integration

### Responsive Search
```javascript
// Mobile-optimized search
function mobileSearch(query, location) {
  const params = {
    query: query,
    location: location,
    radius: 20  // Smaller radius for mobile
  };
  
  return fetch(`/api/v1/properties/search?${new URLSearchParams(params)}`);
}
```

### Location Services
```javascript
// Get user's current location
function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      
      // Search properties near user
      searchProperties({
        lat: lat,
        lng: lng,
        radius: 10
      });
    });
  }
}
```

---

## 🎉 Summary

The Property Search API provides:
- ✅ **Intelligent Location Search** - Works with Google Places data
- ✅ **Comprehensive Filtering** - All property attributes filterable
- ✅ **Distance-Based Sorting** - Results sorted by proximity
- ✅ **Fuzzy Matching** - Finds properties with partial location names
- ✅ **Multiple Search Methods** - Basic, location-specific, and advanced
- ✅ **Google Maps Ready** - Perfect for map-based applications
- ✅ **UAE Optimized** - Specifically tuned for UAE real estate market

This API is designed to work seamlessly with your frontend Google Maps implementation and provides all the functionality needed for a comprehensive property search experience.
