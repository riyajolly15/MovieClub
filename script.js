document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    
    // Check for existing bookings
    const bookedEmails = JSON.parse(localStorage.getItem('bookedEmails')) || [];
    
    // Validate email in real-time
    emailInput.addEventListener('input', function() {
        validateEmail();
    });
    
    function validateEmail() {
        const email = emailInput.value.trim();
        
        if (!email.endsWith('@banasthali.in')) {
            emailError.textContent = "Only Banasthali institutional emails are allowed";
            emailError.style.display = 'block';
            return false;
        }
        
        if (bookedEmails.includes(email)) {
            emailError.textContent = "This email has already booked a ticket";
            emailError.style.display = 'block';
            return false;
        }
        
        emailError.style.display = 'none';
        return true;
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateEmail()) return;
        
        // Create booking data
        const bookingData = {
            name: document.getElementById('name').value.trim(),
            email: emailInput.value.trim(),
            course: document.getElementById('course').value.trim(),
            bookingDate: new Date().toLocaleString()
        };
        
        // Save to storage
        bookedEmails.push(bookingData.email);
        localStorage.setItem('bookedEmails', JSON.stringify(bookedEmails));
        localStorage.setItem('latestBooking', JSON.stringify(bookingData));
        
        // Show success popup
        alert('Ticket booked successfully!');
        
        // Reset form
        form.reset();
    });
});