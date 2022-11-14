var paket_s = document.getElementById("paket-s");
var paket_m = document.getElementById("paket-m");
var paket_l = document.getElementById("paket-l");

paket_s.onclick = async function() {
    sessionStorage.setItem("template_id", 14);
    sessionStorage.setItem("vm_name", "paket-s");
}

paket_m.onclick = async function() {
    sessionStorage.setItem("template_id", 15);
    sessionStorage.setItem("vm_name", "paket-m");
}

paket_l.onclick = async function() {
    sessionStorage.setItem("template_id", 16);
    sessionStorage.setItem("vm_name", "paket-l");
}
