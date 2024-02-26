// этот код позволяет менять карточки местами через перетаскивание их мышью

function dragStartHandler(event) {
  //event.dataTransfer.setData("text/html", event.target.closest(".card"));
  //console.log("I'm gragged: ");
  let dragged = event.target.closest(".card");
  //console.log(event.target.closest(".card"));
  // setdata метод - это метод HTML drag&drop API
  // он принимает только текст, ему нельзя передать ссылку на объект, поэтому мы передаём ID, чтобы потом найти на странице элемент с этим ID
  event.dataTransfer.setData("text", dragged.id);
};

function dropHandler(event) {
  event.preventDefault();
  let dragged = event.dataTransfer.getData("text");
  //console.log(dragged);
  dragged = document.getElementById(dragged);

  let target = event.target.closest('.card');
  //console.log("I'm the target: ");
  //console.log(target);
  //console.log("I'm gragged: ");
  //console.log(dragged);
  //cardsContainer.prepend(dragged);

  // идея: отрисовывать DOM заново
  // проверить, что таргет не null (если бросают карточку в пустое место в контейнере)
  if (target != null) {
    let container = new DocumentFragment(); // временный контейнер
    let cards = document.querySelectorAll('.card');
    cards = [...cards]; // конвертировали в массив
    
    //console.log(`индекс таргета: ${cards.indexOf(target)}`);
    //console.log(`индекс перестаскиваемого элемента: ${cards.indexOf(dragged)}`);
    
    let targetIndex = cards.indexOf(target);
    let draggedIndex = cards.indexOf(dragged);
  
    let temp; // временная переменная для смены мест
  
    temp = cards[targetIndex]; // положили во временную переменную таргет
  
    cards[targetIndex] = cards[draggedIndex]; // вместо таргета положили source
    cards[draggedIndex] = temp; // вместо сорса положили таргет
  
    cards.forEach((elem) => {
      container.appendChild(elem);
    });
    cardsContainer.append(container);  
  } else {
    //console.log("NULL!");

    return
  };
  
};

const cardsContainer = document.querySelector(".cardsContainer");
cardsContainer.addEventListener("dragstart", dragStartHandler); 
cardsContainer.addEventListener("dragover", (event) => event.preventDefault());
cardsContainer.addEventListener("drop", dropHandler);