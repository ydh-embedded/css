
import Calendar from './Calendar';

function App() {
  return (
    <div className="App">
      <Calendar />
    </div>
  );
}






document.getElementById('add_card').addEventListener('click', function () {
    // Wir erzeugen ein neuen Message - Element
    const newCard = document.createElement('div');
    newCard.className = 'card';
  
    // Input implementieren
    newCard.innerHTML = `
      <section class="message">
        
      </section>
      <span class="card-aside">
        
      </span>
    `;
  

    const cardContainer  = document.getElementById('card-container');
    const firstCard      = cardContainer.querySelector('.card');
    cardContainer.insertBefore(newCard, firstCard.nextSibling);
    
  });





export default App;