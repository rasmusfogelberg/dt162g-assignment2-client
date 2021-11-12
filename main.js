// Setting api url to the localhost
const API_URL = `http://localhost:3000/courses`;

// A function that uses fetch on the set url to get a
// response and list the courses
const getCourses = () => {
  return fetch(`${API_URL}`)
    .then(res => res.json())
    .then(res => {
      return res
    });
}

/* 
 * Function that will use fetch to get a specific course
 * decided by the id that was provided and then will use
 * the method DELETE to delte it
 * 
 */
const deleteCourse = (id) => {
  return fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
    .then(res => {
      if (res.status === 204) {
        return true;
      } else {
        return false;
      }
    });
}

/* 
 * This is a async function. It uses the keywords 'async' and 'await'.
 * When using this an asynchronous promise-based behavior can be used
 * instead of configure each promise specificly.
 * This allows less code to be used.
 * 
 */
(async () => {
  // Waiting for response from the getCourses function
  const courses = await getCourses();

  // Using querey selector to get an element with specific a specific id
  const courseTableBody = document.querySelector('#course-table tbody');

  // Foreach loop that will write the following code to index.html for each course
  courses.forEach(course => {
    courseTableBody.innerHTML += `
    <tr>
      <td>${course._id}</td>
      <td>${course.courseId}</td>
      <td>${course.courseName}</td>
      <td>${course.coursePeriod}</td>
      <td><button data-id=${course._id}>Delete</button></td>
    </tr>
    `;
  });

  // Selecting all buttons under the #course-table->tbody->button element
  const deleteButtons = document.querySelectorAll('#course-table tbody button');

  // A foreach loop that adds an event listener to each button and provides them 
  // with the correct ID to be able to delete a course from the list
  deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', (event) => {
      if (deleteCourse(event.target.dataset.id)) {
        courseTableBody.removeChild(event.target.parentElement.parentElement);
      }
    });
  });
})();