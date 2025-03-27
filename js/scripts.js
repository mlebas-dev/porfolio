document.addEventListener("DOMContentLoaded", function() {
    fetch("header.html")
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        document.getElementById("header").innerHTML = data;
      })
      .catch(error => {
        console.error("Erreur lors du chargement du fichier :", error);
      });
  });

  document.addEventListener("DOMContentLoaded", function() {
    fetch("footer.html")
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        document.getElementById("footer").innerHTML = data;
      })
      .catch(error => {
        console.error("Erreur lors du chargement du fichier :", error);
      });
  });