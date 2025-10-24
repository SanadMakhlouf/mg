# 📞 Contact Form API Documentation

## Overview
This documentation covers the Contact Form API for receiving and managing contact form submissions. The system includes both public API endpoints for form submission and admin endpoints for contact management.

## Base URL
```
https://your-domain.com/api/v1
```

## Authentication
- **Public Endpoints**: No authentication required
- **Admin Endpoints**: Requires Sanctum authentication (`auth:sanctum`)

---

## 📝 Contact Form Submission

### Submit Contact Form
**Endpoint:** `POST /contact`

**Description:** Submit a contact form with customer details and message.

**Authentication:** None (Public)

**Request Body:**
```json
{
  "full_name": "Mohamed Al Mansoori",
  "email": "info@meridiangroup.ae",
  "mobile_number": "+97150607030",
  "message": "I am interested in learning more about your properties. Please contact me."
}
```

**Parameters:**
| Parameter | Type | Required | Max Length | Description |
|-----------|------|----------|------------|-------------|
| `full_name` | string | ✅ Yes | 255 | Customer's full name |
| `email` | string | ❌ No | 255 | Customer's email address |
| `mobile_number` | string | ✅ Yes | 20 | Customer's mobile number |
| `message` | string | ✅ Yes | 2000 | Customer's message/comment |

**Example Request:**
```bash
curl -X POST https://your-domain.com/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Mohamed Al Mansoori",
    "email": "info@meridiangroup.ae",
    "mobile_number": "+97150607030",
    "message": "I am interested in learning more about your properties. Please contact me."
  }'
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you soon.",
  "data": {
    "id": 1,
    "full_name": "Mohamed Al Mansoori",
    "email": "info@meridiangroup.ae",
    "mobile_number": "+97150607030",
    "message": "I am interested in learning more about your properties. Please contact me.",
    "status": "new",
    "created_at": "2024-10-24T22:19:47.000000Z"
  }
}
```

**Validation Error Response (422):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "full_name": ["Full name is required"],
    "mobile_number": ["Mobile number is required"],
    "message": ["Message is required"]
  }
}
```

**Server Error Response (500):**
```json
{
  "success": false,
  "message": "Failed to submit your message. Please try again later."
}
```

---

## 🔧 Admin Contact Management

### Get All Contacts
**Endpoint:** `GET /dashboard/contacts`

**Description:** Retrieve all contact submissions with filtering and pagination.

**Authentication:** Required (`auth:sanctum`)

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by status: `new`, `read`, `replied`, `closed` |
| `search` | string | Search by name, email, or mobile number |
| `page` | integer | Page number for pagination |

**Example Request:**
```bash
curl -X GET "https://your-domain.com/api/v1/dashboard/contacts?status=new&search=Mohamed" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "full_name": "Mohamed Al Mansoori",
      "email": "info@meridiangroup.ae",
      "mobile_number": "+97150607030",
      "message": "I am interested in learning more about your properties...",
      "status": "new",
      "admin_notes": null,
      "read_at": null,
      "replied_at": null,
      "created_at": "2024-10-24T22:19:47.000000Z",
      "updated_at": "2024-10-24T22:19:47.000000Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 20,
    "total": 95
  }
}
```

### Get Contact Statistics
**Endpoint:** `GET /dashboard/contacts/statistics`

**Description:** Get contact statistics for dashboard.

**Authentication:** Required (`auth:sanctum`)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "total": 95,
    "new": 12,
    "read": 25,
    "replied": 45,
    "closed": 13,
    "today": 3,
    "this_week": 15,
    "this_month": 45
  }
}
```

### Get Specific Contact
**Endpoint:** `GET /dashboard/contacts/{id}`

**Description:** Retrieve details of a specific contact.

**Authentication:** Required (`auth:sanctum`)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "full_name": "Mohamed Al Mansoori",
    "email": "info@meridiangroup.ae",
    "mobile_number": "+97150607030",
    "message": "I am interested in learning more about your properties. Please contact me.",
    "status": "new",
    "admin_notes": null,
    "read_at": null,
    "replied_at": null,
    "created_at": "2024-10-24T22:19:47.000000Z",
    "updated_at": "2024-10-24T22:19:47.000000Z"
  }
}
```

### Update Contact Status
**Endpoint:** `PUT /dashboard/contacts/{id}`

**Description:** Update contact status and admin notes.

**Authentication:** Required (`auth:sanctum`)

**Request Body:**
```json
{
  "status": "read",
  "admin_notes": "Customer contacted via phone. Interested in villa in Dubai Marina."
}
```

**Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `status` | string | No | Status: `new`, `read`, `replied`, `closed` |
| `admin_notes` | string | No | Admin notes (max 1000 characters) |

**Success Response (200):**
```json
{
  "success": true,
  "message": "Contact updated successfully",
  "data": {
    "id": 1,
    "status": "read",
    "admin_notes": "Customer contacted via phone. Interested in villa in Dubai Marina.",
    "read_at": "2024-10-24T22:30:15.000000Z",
    "replied_at": null,
    "updated_at": "2024-10-24T22:30:15.000000Z"
  }
}
```

### Delete Contact
**Endpoint:** `DELETE /dashboard/contacts/{id}`

**Description:** Delete a contact submission.

**Authentication:** Required (`auth:sanctum`)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

---

## 📊 Contact Status Flow

### Status Types
- **`new`** - Newly submitted contact form
- **`read`** - Admin has read the message
- **`replied`** - Admin has replied to the customer
- **`closed`** - Contact case is closed

### Status Transitions
```
new → read → replied → closed
  ↓     ↓       ↓
  └─────┴───────┘
    (can go back to any previous status)
```

### Automatic Timestamps
- **`read_at`** - Set when status changes to `read`
- **`replied_at`** - Set when status changes to `replied`

---

## 🗄️ Database Schema

### SQL to Create Contacts Table
```sql
CREATE TABLE `contacts` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NULL,
  `mobile_number` varchar(20) NOT NULL,
  `message` text NOT NULL,
  `status` enum('new','read','replied','closed') NOT NULL DEFAULT 'new',
  `admin_notes` text NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `replied_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `contacts_status_index` (`status`),
  KEY `contacts_created_at_index` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Table Structure
| Column | Type | Null | Default | Description |
|--------|------|------|---------|-------------|
| `id` | bigint(20) UNSIGNED | NO | AUTO_INCREMENT | Primary key |
| `full_name` | varchar(255) | NO | - | Customer's full name |
| `email` | varchar(255) | YES | NULL | Customer's email (optional) |
| `mobile_number` | varchar(20) | NO | - | Customer's mobile number |
| `message` | text | NO | - | Customer's message |
| `status` | enum | NO | 'new' | Contact status |
| `admin_notes` | text | YES | NULL | Admin internal notes |
| `read_at` | timestamp | YES | NULL | When contact was read |
| `replied_at` | timestamp | YES | NULL | When contact was replied |
| `created_at` | timestamp | YES | NULL | Creation timestamp |
| `updated_at` | timestamp | YES | NULL | Last update timestamp |

---

## 🎯 Frontend Integration Examples

### JavaScript Contact Form Submission
```javascript
async function submitContactForm(formData) {
  try {
    const response = await fetch('/api/v1/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Show success message
      showSuccessMessage(result.message);
      // Reset form
      resetForm();
    } else {
      // Show validation errors
      showValidationErrors(result.errors);
    }
  } catch (error) {
    console.error('Contact form error:', error);
    showErrorMessage('Failed to submit your message. Please try again.');
  }
}

// Usage
const formData = {
  full_name: document.getElementById('full_name').value,
  email: document.getElementById('email').value,
  mobile_number: document.getElementById('mobile_number').value,
  message: document.getElementById('message').value
};

submitContactForm(formData);
```

### React Contact Form Component
```jsx
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    mobile_number: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        setFormData({ full_name: '', email: '', mobile_number: '', message: '' });
      } else {
        setErrors(result.errors || {});
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name *</label>
        <input
          type="text"
          value={formData.full_name}
          onChange={(e) => setFormData({...formData, full_name: e.target.value})}
          required
        />
        {errors.full_name && <span className="error">{errors.full_name[0]}</span>}
      </div>

      <div>
        <label>Email Address</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        {errors.email && <span className="error">{errors.email[0]}</span>}
      </div>

      <div>
        <label>Mobile Number *</label>
        <input
          type="tel"
          value={formData.mobile_number}
          onChange={(e) => setFormData({...formData, mobile_number: e.target.value})}
          required
        />
        {errors.mobile_number && <span className="error">{errors.mobile_number[0]}</span>}
      </div>

      <div>
        <label>Comment / Message *</label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          required
        />
        {errors.message && <span className="error">{errors.message[0]}</span>}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default ContactForm;
```

### Vue.js Contact Form Component
```vue
<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label>Full Name *</label>
      <input 
        v-model="form.full_name" 
        type="text" 
        required 
        :class="{ 'error': errors.full_name }"
      />
      <span v-if="errors.full_name" class="error">{{ errors.full_name[0] }}</span>
    </div>

    <div class="form-group">
      <label>Email Address</label>
      <input 
        v-model="form.email" 
        type="email" 
        :class="{ 'error': errors.email }"
      />
      <span v-if="errors.email" class="error">{{ errors.email[0] }}</span>
    </div>

    <div class="form-group">
      <label>Mobile Number *</label>
      <input 
        v-model="form.mobile_number" 
        type="tel" 
        required 
        :class="{ 'error': errors.mobile_number }"
      />
      <span v-if="errors.mobile_number" class="error">{{ errors.mobile_number[0] }}</span>
    </div>

    <div class="form-group">
      <label>Comment / Message *</label>
      <textarea 
        v-model="form.message" 
        required 
        :class="{ 'error': errors.message }"
      ></textarea>
      <span v-if="errors.message" class="error">{{ errors.message[0] }}</span>
    </div>

    <button type="submit" :disabled="loading">
      {{ loading ? 'Submitting...' : 'Submit' }}
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        full_name: '',
        email: '',
        mobile_number: '',
        message: ''
      },
      loading: false,
      errors: {}
    }
  },
  methods: {
    async submitForm() {
      this.loading = true;
      this.errors = {};

      try {
        const response = await fetch('/api/v1/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.form)
        });

        const result = await response.json();

        if (result.success) {
          alert(result.message);
          this.form = { full_name: '', email: '', mobile_number: '', message: '' };
        } else {
          this.errors = result.errors || {};
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to submit your message. Please try again.');
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
```

---

## 🔧 Error Handling

### Common HTTP Status Codes
- **200** - Success
- **201** - Created (Contact submitted successfully)
- **422** - Validation Error
- **404** - Not Found (Contact not found)
- **500** - Internal Server Error

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "field_name": ["Error message"]
  }
}
```

---

## 📱 Mobile Integration

### Mobile-Optimized Form
```html
<form id="contactForm">
  <div class="form-group">
    <label for="full_name">Full Name *</label>
    <input 
      type="text" 
      id="full_name" 
      name="full_name" 
      required 
      autocomplete="name"
    />
  </div>

  <div class="form-group">
    <label for="email">Email Address</label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      autocomplete="email"
    />
  </div>

  <div class="form-group">
    <label for="mobile_number">Mobile Number *</label>
    <input 
      type="tel" 
      id="mobile_number" 
      name="mobile_number" 
      required 
      autocomplete="tel"
    />
  </div>

  <div class="form-group">
    <label for="message">Comment / Message *</label>
    <textarea 
      id="message" 
      name="message" 
      required 
      rows="4"
    ></textarea>
  </div>

  <button type="submit">Submit</button>
</form>
```

---

## 🎉 Summary

The Contact Form API provides:
- ✅ **Public Form Submission** - No authentication required
- ✅ **Email Optional** - Flexible form requirements
- ✅ **Admin Management** - Full CRUD operations for admins
- ✅ **Status Tracking** - New, Read, Replied, Closed workflow
- ✅ **Admin Notes** - Internal notes for contact management
- ✅ **Statistics** - Dashboard statistics for admins
- ✅ **Search & Filter** - Advanced filtering capabilities
- ✅ **Pagination** - Efficient data loading
- ✅ **Validation** - Comprehensive input validation
- ✅ **Error Handling** - Detailed error responses

**Ready for frontend integration!** 🚀
