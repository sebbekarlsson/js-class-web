class Note {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  }
}

class Form {
  constructor(form, onSubmit) {
    this.form = form;
    this.button = form.querySelector("#submit");
    this.fields = Array.from(form.querySelectorAll("input[type='text'], textarea"));

    this.button.addEventListener("click", function(event){
      event.preventDefault();
      onSubmit(this.getFieldValues());

      this.clear();
    }.bind(this));
  }

  getFieldValues() {
    return this.fields.reduce(function(prev, curr){
      prev[curr.name] = curr.value;
      return prev;
    }, {});
  }

  clear() {
    this.fields.forEach(field => field.value = "");
  }
}

class Table {
  constructor(table) {
    this.table = table;
    this.tableBody = table.querySelector("tbody");
  }

  createColumnElement(value) {
    const column = document.createElement("td");
    column.innerText = value;
    return column;
  }

  createRowElement(data) {
    const values = Object.values(data);
    const element = document.createElement("tr");
    values.forEach(value => element.appendChild(this.createColumnElement(value)));
    return element;
  }

  addRow(data) {
    const row = this.createRowElement(data);
    this.tableBody.appendChild(row);
  }
}


const table = new Table(document.getElementById("table"));

const form = new Form(
  document.getElementById("form"),
  function(data) {
    const note = new Note(data.title, data.description);

    table.addRow(note);
  }
);
