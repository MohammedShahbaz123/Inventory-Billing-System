const dropArrow=document.getElementById('drop-arrow');

dropArrow.onclick=function(){
    dropArrow.classList.toggle('d-a')
    dropArrow.classList.toggle('drop-down-onclick');
    noHover();
}
function noHover(){
    const noHovers=document.getElementById('Sales-dropdown');
    noHovers.classList.toggle('hover')
    noHovers.classList.toggle('no-hover')
}
function businessDropDown(){
    const switchBusinessOption=document.getElementById('switch-business-id')
    switchBusinessOption.classList.toggle('business-drop-down-active');
}

// Make business option active
document.addEventListener('DOMContentLoaded', function() {
  // Get all business option labels
  const options = document.querySelectorAll('.business-option');
  
  // Load saved selection from localStorage
  const savedValue = localStorage.getItem('selectedBusiness');
  
  // Apply saved selection if it exists
  if (savedValue) {
    const savedInput = document.querySelector(`input[value="${savedValue}"]`);
    if (savedInput) {
      savedInput.checked = true;
      savedInput.closest('.business-option').classList.add('Business-active');
    }
  }
  
  // Set up click handlers for all options
  options.forEach(option => {
    option.addEventListener('click', function() {
      // Remove active class from all options
      options.forEach(opt => opt.classList.remove('Business-active'));
      
      // Get the radio input inside this label
      const radio = this.querySelector('input[type="radio"]');
      
      // Mark as selected and save to storage
      if (radio) {
        this.classList.add('Business-active');
        radio.checked = true;
        localStorage.setItem('selectedBusiness', radio.value);
      }
    });
    
    // Also trigger click when radio button is clicked directly
    const radio = option.querySelector('input[type="radio"]');
    if (radio) {
      radio.addEventListener('click', function() {
        option.click(); // Trigger the label click handler
      });
    }
  });
});