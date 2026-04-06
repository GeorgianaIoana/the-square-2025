# Contact Form Testing Guide

## What Was Fixed

### Issues Addressed:
1. **FormData Creation** - Simplified form data creation to use a clean FormData object instead of creating from form element
2. **Consent Field** - Added explicit consent field to FormData to ensure it's sent to the API
3. **Honeypot Field** - Explicitly added honeypot field for spam protection
4. **Validation** - Added proper validation for consent checkbox with translated error messages
5. **Error Handling** - Improved error handling to check both response.ok and data.success
6. **Error Messages** - Enhanced error messages to show specific API errors when available

### Technical Changes:
- Changed FormData creation from `new FormData(formElement)` to explicit field addition
- Added consent validation before form submission
- Added `consent: "true"` field to FormData
- Added explicit `botcheck: ""` field to FormData
- Added translations for consent validation messages in both Romanian and English
- Improved response handling with better error messages

## Manual Testing Steps

### Prerequisites:
1. Make sure the development server is running: `npm run dev`
2. Open browser to: http://localhost:5173
3. Navigate to the Contact section (scroll down or click "Contact" in navigation)

### Test Case 1: Form Validation
**Steps:**
1. Scroll to the contact form
2. Try clicking "Trimite" (Submit) button without filling anything
3. **Expected:** Button should be disabled

### Test Case 2: Consent Checkbox Requirement
**Steps:**
1. Fill in all required fields:
   - Name: "Test User"
   - Phone: "0741234567"
   - Email: "test@example.com"
   - Message: "This is a test message"
2. DO NOT check the consent checkbox
3. **Expected:** Submit button remains disabled

### Test Case 3: Phone Number Sanitization
**Steps:**
1. In the phone field, type: "074-123-4567 abc xyz"
2. **Expected:** Only numbers appear: "0741234567"

### Test Case 4: Draft Persistence
**Steps:**
1. Fill in the Name field: "Maria Popescu"
2. Refresh the page (F5 or Cmd+R)
3. Navigate back to the contact form
4. **Expected:** "Maria Popescu" should still be in the Name field

### Test Case 5: Successful Submission
**Steps:**
1. Fill in all required fields:
   - Name: "Ion Popescu"
   - Phone: "0741234567"
   - Email: "ion@example.com"
   - Message: "Vreau să mă înscriu la cursuri de șah."
2. Check the consent checkbox
3. Click "Trimite" button
4. **Expected:**
   - Success message appears: "✅ Mulțumim! Mesajul a fost trimis cu succes."
   - After 1.5 seconds, redirect to Thank You page
   - Form fields are cleared
   - Consent checkbox is unchecked

### Test Case 6: Email Validation
**Steps:**
1. Fill in Name and Phone
2. In Email field, type: "invalid-email"
3. Try to submit
4. **Expected:** Browser shows built-in validation error for invalid email format

### Test Case 7: Language Switching
**Steps:**
1. Switch language to English (EN)
2. Fill in the form
3. Try to submit without consent
4. **Expected:** Error message appears in English

### Test Case 8: Empty Message Field
**Steps:**
1. Fill in Name, Phone, Email
2. Leave Message field empty
3. Check consent
4. Click Submit
5. **Expected:** Form submits successfully (message is not required)

## Checking API Integration

The form uses Web3Forms API. To verify it's working:

1. Open browser Developer Tools (F12)
2. Go to Network tab
3. Fill and submit the form
4. Look for a POST request to `https://api.web3forms.com/submit`
5. Check the request payload includes:
   - access_key
   - name
   - phone
   - email
   - message
   - consent: "true"
   - botcheck: ""
6. Response should be: `{"success": true}`

## Testing Error Scenarios

To test error handling, you can temporarily modify the ACCESS_KEY in Contact.tsx:

1. Change ACCESS_KEY to an invalid value
2. Submit the form
3. **Expected:** Error message appears
4. Remember to revert the ACCESS_KEY back!

## Success Criteria

✅ All form fields work correctly
✅ Phone number only accepts digits
✅ Email validation works
✅ Submit button is disabled without consent
✅ Form submits successfully with all valid data
✅ Success message appears
✅ Redirects to Thank You page after 1.5 seconds
✅ Form data is cleared after submission
✅ Draft is saved during typing
✅ Error messages display properly
✅ Both Romanian and English translations work

## All Tests Pass

Run automated tests with:
```bash
npm test
```

All 19 tests should pass ✅
