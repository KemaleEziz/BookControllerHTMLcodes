let searchBtn = document.getElementById("searchBook");
let searchInput = document.getElementById("input");
let tbody = document.getElementById("tbody");

searchBtn.addEventListener("click", () => {
  let query = searchInput.value.trim();
  console.log("Search Query:", query);

  fetch(
    `http://localhost:8080/books/make-search-by-name?name=` +
      encodeURIComponent(query)
  )
    .then((response) => response.json())
    .then((data) => {
      tbody.innerHTML = "";

      console.log("Returned Data:", data);

      if (Array.isArray(data) && data.length > 0) {
        data.forEach((item) => {
          let tr = document.createElement("tr");

          tr.innerHTML = ` 
                        <td>${item.id}</td>
                        <td>${item.author}</td>
                        <td>${item.name}</td>`;
          tbody.appendChild(tr);
        });
      } else {
        console.log("No results found.");
        tbody.innerHTML = "<tr><td colspan='3'>No results found.</td></tr>";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
