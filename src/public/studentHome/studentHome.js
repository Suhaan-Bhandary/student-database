function handleCredentialResponse(response) {
  console.log(response);
  // Post this response to the post route
  fetch('/student/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(response),
    options: { credentials: 'include' },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);

      // Redirect
      window.location = '/student/form';
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
