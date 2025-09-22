class Student {
  constructor(id, name, age, courseId) {
    this.id = id
    this.name = name
    this.age = age
    this.courseId = courseId
  }
}

class Course {
  constructor(id, title, description, instructorId) {
    this.id = id
    this.title = title
    this.description = description
    this.instructorId = instructorId
  }
}

class Instructor {
  constructor(id, name) {
    this.id = id
    this.name = name
  }
}

async function loadData() {
  const response = await fetch('data/students.json')
  const data = await response.json()
  return data
}

function displayStudents(students) {
  const div = document.getElementById('students')
  div.innerHTML = '<h2>Students:</h2>'
  students.forEach(s => {
    let text = `- ${s.name} (${s.age}) - ${s.course}`
    if (s.age > 21) {
      text += ' *'
    }
    const p = document.createElement('p')
    p.textContent = text
    div.appendChild(p)
  })
}

function displayCourses(courses) {
  const div = document.getElementById('courses')
  div.innerHTML = '<h2>Courses:</h2>'
  courses.forEach(c => {
    const p = document.createElement('p')
    p.textContent = `- ${c.title}: ${c.description}`
    div.appendChild(p)
  })
}

function displayInstructors(instructors) {
  const div = document.getElementById('instructors')
  div.innerHTML = '<h2>Instructors:</h2>'
  instructors.forEach(i => {
    const p = document.createElement('p')
    p.textContent = `- ${i.name} - ${i.subject}`
    div.appendChild(p)
  })
}

function displayRelationships(students, courses, instructors) {
  const div = document.getElementById('relationships')
  div.innerHTML = '<h2>Relationships:</h2>'

  students.forEach(s => {
    const course = courses.find(c => c.title === s.course)
    let instructor = null

    // Assign instructors manually based on subject match
    if (course.title === "Data Science") {
      instructor = instructors.find(i => i.name === "Maria Santos")
    } else if (course.title === "Cybersecurity") {
      instructor = instructors.find(i => i.name === "Carlos Dela Cruz")
    } else if (course.title === "Computer Science") {
      instructor = instructors.find(i => i.name === "John Rey Silverio")
    }

    const p = document.createElement('p')
    if (instructor) {
      p.textContent = `- ${s.name} → ${course.title} → ${instructor.name}`
    } else {
      p.textContent = `- ${s.name} → ${course.title}`
    }
    div.appendChild(p)
  })
}

// Run all
loadData().then(data => {
  displayStudents(data.students)
  displayCourses(data.courses)
  displayInstructors(data.instructors)
  displayRelationships(data.students, data.courses, data.instructors)
})
