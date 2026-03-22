const tAwal = document.getElementById("tAwal");
const emailContainer = document.getElementById("emailContainer");
tAwal.addEventListener("click", function () {
  sudahKlik = true;
  tAwal.disabled = true;

  const nama = document.getElementById("nama").value;
  const jumlah = parseInt(document.getElementById("jumlahPilihan").value);
  const area = document.getElementById("areaPilihan");
  const hasil = document.getElementById("hasil");

  const regex = /^[A-Za-z\s]+$/;
  if (nama.trim() == "") {
    alert("Kolom Nama Harap Diisi");
    return;
  } else if (!regex.test(nama)) {
    alert("Nama hanya boleh huruf saja!");
    return;
  }
  if (isNaN(jumlah) || jumlah < 1) {
    alert("Jumlah pilihan minimal 1!");
    return;
  } else if (jumlah > 5) {
    alert("Jumlah Pilihan Maksimal 5");
    return;
  }

  namaValue = nama;
  jumlahValue = jumlah;

  emailContainer.style.display = "none";

  // buat input pilihan
  for (let i = 0; i < jumlah; i++) {
    const div = document.createElement("div");
    div.className = "pilihan-item";
    div.style.marginBottom = "15px";

    const label = document.createElement("label");
    label.textContent = "Pilihan " + (i + 1) + ": ";
    label.style.marginRight = "40px";

    const input = document.createElement("input");
    input.type = "text";
    input.id = "pilihan" + i;

    div.appendChild(label);
    div.appendChild(input);
    area.appendChild(div);
  }

  // tombol simpan pilihan
  const btn = document.createElement("button");
  btn.textContent = "OK";
  btn.style.marginTop = "20px";
  btn.onclick = function () {
    simpanPilihan(jumlah);
  };
  area.appendChild(btn);
});

// Fungsi simpan pilihan (OK ke-2)
function simpanPilihan(jumlah) {
  const hasil = document.getElementById("hasil");
  const area = document.getElementById("areaPilihan");

  let pilihan = [];

  for (let i = 0; i < jumlah; i++) {
    const input = document.getElementById("pilihan" + i);
    const value = input.value.trim();

    const regex = /^[A-Za-z\s]+$/;
    if (value === "") {
      alert("Pilihan " + (i + 1) + " masih kosong!");
      return;
    } else if (!regex.test(value)) {
      alert("Pilihan Hanya Boleh Huruf Saja");
      return;
    }
    pilihan.push(value);
  }

  pilihanArray = pilihan;

  while (hasil.firstChild) {
    hasil.removeChild(hasil.firstChild);
  }

  const infoJumlah = document.createElement("p");
  infoJumlah.textContent = "Jumlah Pilihan : " + jumlah;
  hasil.appendChild(infoJumlah);

  for (let i = 0; i < pilihan.length; i++) {
    const rowDiv = document.createElement("div");
    rowDiv.style.margin = "10px 0";
    rowDiv.style.display = "flex";
    rowDiv.style.alignItems = "center";
    rowDiv.style.gap = "15px";

    // Radio button
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "pilihan";
    radio.value = pilihan[i];
    radio.id = "radio" + i;

    // Label pilihan
    const label = document.createElement("label");
    label.textContent = "Pilihan ke-" + (i + 1) + ": " + pilihan[i];
    label.htmlFor = "radio" + i;

    rowDiv.appendChild(radio);
    rowDiv.appendChild(label);
    hasil.appendChild(rowDiv);
  }

  // Tombol OK untuk memilih radio
  const btnRadio = document.createElement("button");
  btnRadio.textContent = "OK";
  btnRadio.style.marginTop = "15px";
  hasil.appendChild(btnRadio);

  btnRadio.onclick = function () {
    const radios = document.querySelectorAll('input[name="pilihan"]');
    let terpilih = false;

    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        pilihanTerpilih = radios[i].value;
        terpilih = true;
        break;
      }
    }

    if (!terpilih) {
      alert("Silakan pilih salah satu pilihan!");
      return;
    }

    const pilihInfo = document.createElement("p");
    pilihInfo.textContent = "Pilihan yang dipilih: " + pilihanTerpilih;
    pilihInfo.style.marginTop = "15px";
    pilihInfo.style.fontWeight = "bold";
    pilihInfo.style.color = "green";
    hasil.appendChild(pilihInfo);

    emailContainer.style.display = "block";

    const btnEmail = document.getElementById("btnEmail");
    const newBtnEmail = btnEmail.cloneNode(true);
    btnEmail.parentNode.replaceChild(newBtnEmail, btnEmail);

    newBtnEmail.onclick = function () {
      prosesEmail();
    };
  };
}

// Fungsi proses email (OK ke-4)
function prosesEmail() {
  const email = document.getElementById("email").value;
  const hasil = document.getElementById("hasil");
  const nama = namaValue;
  const pilihan = pilihanArray;
  const jumlah = jumlahValue;

  if (email.trim() == "") {
    alert("Email harus diisi!");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Email tidak valid! Contoh: nama@domain.com");
    return;
  }

  let daftarPilihan = "";
  for (let i = 0; i < pilihan.length; i++) {
    daftarPilihan += pilihan[i];
    if (i < pilihan.length - 1) {
      daftarPilihan += ", ";
    }
  }

  const existingOutput = document.querySelector(".output-paragraf");
  if (existingOutput) {
    existingOutput.remove();
  }

  const outputText = `Hallo, nama saya ${nama}, email ${email} saya mempunyai sejumlah ${jumlah} pilihan yaitu ${daftarPilihan}, dan saya memilih ${pilihanTerpilih}.`;

  const outputParagraf = document.createElement("p");
  outputParagraf.className = "output-paragraf"; // Tambahkan class untuk identifikasi
  outputParagraf.style.marginTop = "20px";
  outputParagraf.style.padding = "15px";
  outputParagraf.style.backgroundColor = "#e8f5e9";
  outputParagraf.style.borderLeft = "4px solid green";
  outputParagraf.style.borderRadius = "5px";
  outputParagraf.textContent = outputText;

  const emailContainerElement = document.getElementById("emailContainer");
  if (emailContainerElement && emailContainerElement.parentNode) {
    emailContainerElement.parentNode.insertBefore(
      outputParagraf,
      emailContainerElement.nextSibling,
    );
  } else {
    hasil.appendChild(outputParagraf);
  }
}
