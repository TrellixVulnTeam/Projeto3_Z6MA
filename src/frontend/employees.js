document.addEventListener('DOMContentLoaded', () => {
    getEmployeesList();
 }, false);


function getHome() {
    window.location.href = "http://localhost:3000/home.html";
}

function getEmployees() {
    window.location.href = "http://localhost:3000/employees.html";
}

function getProjects() {
    window.location.href = "http://localhost:3000/projects.html";
}

function logOut() {
    window.location.href = "http://localhost:3000/index.html";
}

function getEmployeesList() {
    var url = "http://127.0.0.1:3000/employees/";
    var res;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

    res = JSON.parse(xhttp.responseText);
    
    for (i=0; i < res.length; i++) {
        $("#employeeDiv").append(
            `<div class="grid-container-2-1-1" onclick=updateForm(${res[i].id})>
                <div class="grid-container-2-1-1-1">
                    ID:<span>${res[i].id}</span>
                </div>
                <div class="grid-container-2-1-1-2">
                    Nome:<span>${res[i].full_name}</span>
                </div>
                <div class="grid-container-2-1-1-3">
                    Cargo:<span>${res[i].position}</span>
                </div>
                <div class="edit-btn">
                    <button onclick=patchEmployee(${res[i].id})>
                        <span class="icon">
                            <ion-icon name="create-outline"></ion-icon>
                        </span>
                    </button>
                </div>
                <div class="del-btn">
                    <button onclick=delEmployee(${res[i].id})>
                        <span class="icon">
                            <ion-icon name="trash-outline"></ion-icon>
                        </span>
                    </button>
                </div>`
        );
    }

    //chamada 'get' para ter informções sobre id/nome completo, posição e outras ifnromações importantes dos funcionários. 
    document.getElementById("id").innerHTML = res[0].id;
    document.getElementById("full_name").innerHTML = res[0].full_name;
    document.getElementById("position").innerHTML = res[0].position;
    document.getElementById("legal_hours").innerHTML = `${res[0].legal_hours}h`;
    document.getElementById("total_hours").innerHTML = `${res[0].total_hours}h`;
    document.getElementById("allocated_hours").innerHTML = `${res[0].allocated_hours}h`;
    document.getElementById("local").innerHTML = res[0].local.replace("(", "").replace(")", "");

    if (res[0].outsourced === 1)  {
        document.getElementById("btnCLT").classList.add("buttonActive");
    }
    if (res[0].outsourced === 2)  {
        document.getElementById("btnPJ").classList.add("buttonActive");
    }
}


function postEmp() {
    var full_name = document.getElementById("full_name_form").value;
    var position = document.getElementById("position_form").value;
    var legal_hours = document.getElementById("legal_hours_form").value;
    var total_hours = document.getElementById("total_hours_form").value;
    var allocated_hours = document.getElementById("allocated_hours_form").value;
    var outsourced = document.getElementById("outsourced_form").value;
    var local = document.getElementById("local_form").value;
    var isActive = 1;

    var url = "http://127.0.0.1:3000/employees/";

    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(
            {
                "full_name": full_name,
                "position": position,
                "legal_hours": legal_hours,
                "total_hours": total_hours,
                "allocated_hours": allocated_hours,
                "outsourced": outsourced,
                "local": local,
                "isActive": isActive
            }
        )
    });

    
}


function delEmployee(id) {
    var url = `http://127.0.0.1:3000/employees/${id}`;

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", url, false);
    xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

    window.location.href = window.location.href;
}


function patchEmp(id) {
    document.getElementById("id").placeholder = id;

    var url = `http://127.0.0.1:3000/employees/${id}`;
    var res;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

    res = JSON.parse(xhttp.responseText);

    document.getElementById("id").value = id;
    document.getElementById("full_name").value = res[0].full_name;
    document.getElementById("position").value = res[0].position;
    document.getElementById("legal_hours").value = res[0].legal_hours;
    document.getElementById("total_hours").value = res[0].total_hours;
    document.getElementById("allocated_hours").value = res[0].allocated_hours;
    document.getElementById("outsourced").value = res[0].outsourced;
    document.getElementById("local").value = res[0].local;

    document.getElementById("addBtn-Add").style.display = "none";
    document.getElementById("patchBtn-Patch").style.display = "block";

    document.getElementById("addBtn").setAttribute( "onClick", "javascript: patchEmpII();" );
}

function patchEmpII() {
    var id = document.getElementById("id").value;
    var full_name = document.getElementById("full_name").value;
    var position = document.getElementById("position").value;
    var legal_hours = document.getElementById("legal_hours").value;
    var total_hours = document.getElementById("total_hours").value;
    var allocated_hours = document.getElementById("allocated_hours").value;
    var outsourced = parseInt(document.getElementById("outsourced").value);
    var local = document.getElementById("local").value;
    var isActive = 1;

    var url = "http://127.0.0.1:3000/employees/";

    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(
            {
                "full_name": full_name,
                "position": position,
                "legal_hours": legal_hours,
                "total_hours": total_hours,
                "allocated_hours": allocated_hours,
                "outsourced": outsourced,
                "local": local,
                "isActive": isActive
            }
        )
    });

    delEmp(id);
}

function updateForm(id) {
    var url = `http://127.0.0.1:3000/employees/${id}`;
    var res;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

    res = JSON.parse(xhttp.responseText);

    document.getElementById("id").innerHTML = res[0].id;
    document.getElementById("full_name").innerHTML = res[0].full_name;
    document.getElementById("position").innerHTML = res[0].position;
    document.getElementById("legal_hours").innerHTML = `${res[0].legal_hours}h`;
    document.getElementById("total_hours").innerHTML = `${res[0].total_hours}h`;
    document.getElementById("allocated_hours").innerHTML = `${res[0].allocated_hours}h`;
    document.getElementById("local").innerHTML = res[0].local.replace("(", "").replace(")", "");

    document.getElementById("btnCLT").classList.remove("buttonActive");
    document.getElementById("btnPJ").classList.remove("buttonActive");

    if (res[0].outsourced === 1)  {
        document.getElementById("btnCLT").classList.add("buttonActive");
    }
    if (res[0].outsourced === 2)  {
        document.getElementById("btnPJ").classList.add("buttonActive");
    }
}