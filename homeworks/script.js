document.addEventListener('DOMContentLoaded', () => {
  //functions
  function fetchHomeworks() {
    const sortByTeacher = document.getElementById('sortByTeacher').value;
    const sortBySubject = document.getElementById('sortBySubject').value;

    fetch(`/GetHomeworks?sortByTeacher=${sortByTeacher}&sortBySubject=${sortBySubject}`)
      .then(response => response.json())
      .then(homeworks => updateHomeworkList(homeworks))
      .catch(error => console.error('Error fetching homeworks:', error.message));
  };

  function updateHomeworkList(homeworks) {
    const homeworkList = document.getElementById('homeworkList');

    // Clear existing list items
    homeworkList.innerHTML = '';

    // Add each homework as a list item
    homeworks.forEach(homework => {
      const listItem = document.createElement('span');
      const dueDate = new Date(homework.dueDate).toLocaleString();

      listItem.innerHTML = `
            <strong>${homework.subject}</strong><br> Subject ID: ${homework.subjectID}<br> Teacher: ${homework.teacher}<br> Due: ${dueDate}<br>
            ${homework.description}<br>
            ${homework.attachment ? `<img src="${homework.attachment}" alt="Attachment" style="max-width: 300px; max-height: 300px;">` : ''}
            <hr>
        `;

      homeworkList.appendChild(listItem);
    });
  }

  //executes 
  document.getElementById('sortByTeacher').addEventListener('change', fetchHomeworks);
  document.getElementById('sortBySubject').addEventListener('change', fetchHomeworks);

  fetchHomeworks();
  //Fetch homeworks every 5 minutes
  setInterval(fetchHomeworks, 5 * 60 * 1000);

});

function fetchHomeworks() {

  const sortByTeacher = document.getElementById('sortByTeacher').value;
  const sortBySubject = document.getElementById('sortBySubject').value;

  fetch(`https://48059.site.bot-hosting.net/GetHomeworks?sortByTeacher=${sortByTeacher}&sortBySubject=${sortBySubject}`)
    .then(response => response.json())
    .then(homeworks => updateHomeworkList(homeworks))
    .catch(error => console.error('Error fetching homeworks:', error.message));
};

function updateHomeworkList(homeworks) {
  const homeworkList = document.getElementById('homeworkList');

  // Clear existing list items
  homeworkList.innerHTML = '';

  // Add each homework as a list item
  homeworks.forEach(homework => {
    const listItem = document.createElement('span');
    const dueDate = new Date(homework.dueDate).toLocaleString();

    listItem.innerHTML = `
          <strong>${homework.subject}</strong><br> Subject ID: ${homework.subjectID}<br> Teacher: ${homework.teacher}<br> Due: ${dueDate}<br>
          ${homework.description}<br>
          ${homework.attachment ? `<img src="${homework.attachment}" alt="Attachment" style="max-width: 300px; max-height: 300px;">` : ''}
          <hr>
      `;

    homeworkList.appendChild(listItem);
  });
}