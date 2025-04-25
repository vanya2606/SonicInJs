document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    document.getElementById('addEventBtn')?.addEventListener('click', () => {
        window.location.href = 'addEvent.html';
    });
    document.getElementById('eventForm')?.addEventListener('submit', addEvent);
    document.getElementById('editEventForm')?.addEventListener('submit', editEvent);
});

function loadEvents() {
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = '';
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.forEach((event, index) => {
        const eventCard = document.createElement('div');
        eventCard.className = 'eventCard';
        eventCard.innerHTML = `
            <h3>${event.name}</h3>
            <p>${event.date} - ${event.category}</p>
            <button onclick="editEventPage(${index})">Редактировать</button>
        `;
        eventsList.appendChild(eventCard);
    });
}

function addEvent(e) {
    e.preventDefault();
    const name = document.getElementById('eventName').value;
    const date = document.getElementById('eventDate').value;
    const category = document.getElementById('eventCategory').value;
    const description = document.getElementById('eventDescription').value;

    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.push({ name, date, category, description });
    localStorage.setItem('events', JSON.stringify(events));
    window.location.href = 'index.html';
}

function editEventPage(index) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const event = events[index];
    localStorage.setItem('editIndex', index);
    document.getElementById('editEventName').value = event.name;
    document.getElementById('editEventDate').value = event.date;
    document.getElementById('editEventCategory').value = event.category;
    document.getElementById('editEventDescription').value = event.description;
    window.location.href = 'editEvent.html';
}

function editEvent(e) {
    e.preventDefault();
    const index = localStorage.getItem('editIndex');
    const events = JSON.parse(localStorage.getItem('events')) || [];
    
    events[index] = {
        name: document.getElementById('editEventName').value,
        date: document.getElementById('editEventDate').value,
        category: document.getElementById('editEventCategory').value,
        description: document.getElementById('editEventDescription').value,
    };
    localStorage.setItem('events', JSON.stringify(events));
    window.location.href = 'index.html';
}

document.getElementById('deleteEventBtn')?.addEventListener('click', () => {
    const index = localStorage.getItem('editIndex');
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.splice(index, 1);
    localStorage.setItem('events', JSON.stringify(events));
    window.location.href = 'index.html';
});