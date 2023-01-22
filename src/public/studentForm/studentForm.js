const studentForm = document.getElementById('studentForm');
const otherUrlsContainer = document.getElementById('otherUrlsContainer');
const addOtherUrlIcon = document.getElementById('addOtherUrlIcon');

const handleOtherUrlsRemove = (e) => {
  console.log('Removing element');
  const currentInputField = e.target.parentElement;
  currentInputField.remove();
};

const handleOtherUrlsAdd = (e) => {
  const currentInput = e.target.previousElementSibling;

  if (currentInput.value.trim().length === 0) {
    // TODO: Display Empty Error Message
    return;
  }

  // Create a input field element
  const otherUrlValue = currentInput.value;
  currentInput.value = '';

  // Add this to the container
  const otherUrlsField = document.createElement('div');

  const otherUrl = document.createElement('p');
  otherUrl.className = 'other-url';
  otherUrl.textContent = otherUrlValue;

  const minusIcon = document.createElement('span');
  minusIcon.textContent = '-';
  minusIcon.addEventListener('click', handleOtherUrlsRemove);

  otherUrlsField.appendChild(otherUrl);
  otherUrlsField.appendChild(minusIcon);
  otherUrlsContainer.appendChild(otherUrlsField);
};

const handleFormSubmit = (e) => {
  e.preventDefault();

  // Get the form data
  const form = e.target;
  const formData = new FormData(form);

  // Create a body
  const body = {
    otherUrls: [],
  };

  // Get the form values
  for (const [name, value] of formData) {
    body[name] = value;
  }

  // Get all other urls
  const otherUrls = document.querySelectorAll('.other-url');
  otherUrls.forEach((element) => {
    body.otherUrls.push({
      name: element.textContent,
      url: element.textContent,
    });
  });

  console.log(body);

  // Make a post request to the server to add the student
  fetch('/student', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

// Main Actions
addOtherUrlIcon.addEventListener('click', handleOtherUrlsAdd);
studentForm.addEventListener('submit', handleFormSubmit);
