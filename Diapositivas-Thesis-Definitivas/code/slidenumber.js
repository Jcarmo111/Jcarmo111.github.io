window.onload = function() {
    // Obtiene todos los elementos article, que representan las diapositivas
    var slides = document.getElementsByTagName("article");
    for (var i = 1; i < slides.length; i++) {

      // Encuentra el primer elemento section dentro del article actual
      var targetSection = slides[i].getElementsByTagName("section")[0];
      
      // Crea un nuevo elemento div para mostrar el número de la diapositiva
      var slideNumber = document.createElement("div");
      slideNumber.style.position = "absolute";
      slideNumber.style.top = "0vh";
      slideNumber.style.right = "-8vh";
      slideNumber.style.padding = "0";
      slideNumber.style.color = "blue";
      slideNumber.style.backgroundColor = "rgba(0, 0, 0, 0)";
      slideNumber.style.borderRadius = "0";
      slideNumber.style.fontSize = "3vh";
      
      // Añade el número de la diapositiva, incrementando i porque los índices en JavaScript empiezan en 0
      slideNumber.textContent = (i + 1);
      
      // Añade el número de la diapositiva al principio de cada diapositiva
      targetSection.appendChild(slideNumber);
    }
  };