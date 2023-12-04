function createFunction() { 
    let form = document.getElementById("form");
    if (form) {
      form.addEventListener("submit", (event) => {
        //Sayfanın yeniden yüklenmesini engeller!
        event.preventDefault();
  
        const data = new FormData(form);
  
        console.log(Array.from(data));
  
        try {
          fetch("https://localhost:7068/api/Categories", {
            method: "POST",
            body: data,
          }).then((window.location.href = "index.html"));
        } catch (err) {
          console.log(err.message);
        }
      });
    }
 }

function deleteCategory(id) {
  var result = confirm("Silmek istediğinize emin misiniz?");
  if (result) {
    try {
      const result = fetch("https://localhost:7068/api/Categories/" + id, {
        method: "DELETE",
      }).then(() => {
        yukle();
      });
    } catch (err) {
      console.log(err.message);
    }
  }
}

function loadCategories() {

    if (!window.location.hash) {
        window.location = window.location + "#loaded";
        window.location.reload();
      };
  fetch("https://localhost:7068/api/Categories")
    .then((response) => response.json())
    .then((data) => {
      var table = document.getElementById("categories");
      table.innerHTML = "";
      data.forEach((element) => {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        var td6 = document.createElement("td");
        var td7 = document.createElement("td");

        td1.appendChild(document.createTextNode(element.id));
        td2.appendChild(document.createTextNode(element.name));
        td3.appendChild(document.createTextNode(element.description));
        td4.appendChild(
          document.createTextNode(
            new Date(element.createdDate).toLocaleDateString("tr-TR")
          )
        );

        var buttonUpdate = document.createElement("a");
        buttonUpdate.id = "updatebtn" + element.id;
        buttonUpdate.classList.add("btn");
        buttonUpdate.classList.add("btn-outline-success");
        buttonUpdate.href = "UpdateCategory.html?id=" + element.id;
        buttonUpdate.appendChild(document.createTextNode("Update"));

        var buttonDelete = document.createElement("a");
        buttonDelete.id = "deletebtn" + element.id;
        buttonDelete.classList.add("btn");
        buttonDelete.classList.add("btn-outline-danger");
        buttonDelete.addEventListener("click", () => {
          deleteCategory(element.id);
        });
        buttonDelete.appendChild(document.createTextNode("Delete"));

        var buttonInfo = document.createElement("a");
        buttonInfo.id = "infoBtn" + element.id;
        buttonInfo.classList.add("btn");
        buttonInfo.classList.add("btn-outline-dark");
        buttonInfo.href = "Category.html?id=" + element.id;
        buttonInfo.appendChild(document.createTextNode("Info"));

        td5.appendChild(buttonUpdate);
        td6.appendChild(buttonDelete);
        td7.appendChild(buttonInfo);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);

        table.appendChild(tr);
      });
    });
}

function loadCategory() {
  var queryString = decodeURIComponent(window.location.search);
  queryString = queryString.substring(4);

  fetch("https://localhost:7068/api/Categories/" + queryString)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("categoryId").innerHTML = data.id;
      document.getElementById("categoryName").innerHTML = data.name;
      document.getElementById("categoryDescription").innerHTML =
        data.description;
      document.getElementById("categoryCreatedDate").innerHTML = new Date(
        data.createdDate
      ).toLocaleDateString("tr-TR");
    });
}

function updateCategoryGet() {
  var queryString = decodeURIComponent(window.location.search);
  queryString = queryString.substring(4);

  fetch("https://localhost:7068/api/Categories/" + queryString)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("id").value = data.id;
      document.getElementById("name").value = data.name;
      document.getElementById("description").value = data.description;
    });
}

function updateCategory() {
  event.preventDefault();

  let form = document.getElementById("formUpdate");
  const data = new FormData(form);
  try {
    const result = fetch("https://localhost:7068/api/Categories", {
      method: "PUT",
      body: data,
    }).then((window.location.href = "index.html"));
  } catch (err) {
    console.log(err.message);
  }
}
