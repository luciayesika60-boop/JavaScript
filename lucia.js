var nama = document.getElementById("nama").value;
var jumlahPilihan = document.getElementById("jumlahPilihan").value;

function pilihan() {
  var jumlah = document.getElementById("jumlahPilihan").value;
  var hasil = document.getElementById("hasil");

  hasil.innerHTML = ""; // biar tidak dobel

  var regex = /^[A-Za-z\s]+$/;

  if (!regex.test(nama)) {
    alert("Nama hanya boleh huruf saja!");
    return; // hentikan proses
  }

  for (var i = 0; i < jumlah; i++) {
    var input = document.createElement("input");
    input.type = "text";
    input.id = "pilihan" + i;

    hasil.innerHTML += "Pilihan " + (i + 1) + ": ";
    hasil.appendChild(input);
    hasil.innerHTML += "<br><br>";
  }
  if (jumlah < 0) {
    alert("Pilihan Tidak Boleh Minus!");
    return;
  }

  // tombol simpan
  var btn = document.createElement("button");
  btn.innerText = "OK ";
  btn.onclick = simpan;
  hasil.appendChild(btn);
}
function simpan() {
  var pilihan = [];

  for (var i = 0; i < jumlahPilihan; i++) {
    pilihan.push(document.getElementById("pilihan" + i).value);
  }

  var hasil = document.getElementById("hasil");

  hasil.innerHTML += "<br><b>Jumlah Pilihan:</b><br>" + jumlahPilihan + "<br>";
  hasil.innerHTML += "<b>Isi Pilihan:</b> " + pilihan.join(", ");
}
