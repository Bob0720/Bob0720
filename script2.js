document.addEventListener('DOMContentLoaded', function() {
    fetchFactOfTheDay();

    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Thank you for subscribing!');
    });

    const mouseTrail = document.createElement('div');
    mouseTrail.classList.add('mouse-trail');
    document.body.appendChild(mouseTrail);

    document.addEventListener('mousemove', function(event) {
        mouseTrail.style.left = `${event.pageX}px`;
        mouseTrail.style.top = `${event.pageY}px`;
    });
});


function fetchFactOfTheDay() {
    fetch('https://uselessfacts.jsph.pl/random.json?language=en')
        .then(response => response.json())
        .then(data => {
            document.getElementById('factText').textContent = data.text;
        })
        .catch(error => {
            document.getElementById('factText').textContent = 'Could not load a fact, please try again later.';
        });
}