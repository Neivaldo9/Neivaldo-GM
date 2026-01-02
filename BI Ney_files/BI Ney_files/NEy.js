// Função simples para atualizar campos
function bindInput(fieldId, targetId, transform = v => v) {
  document.getElementById(fieldId).addEventListener("input", e => {
    document.getElementById(targetId).textContent = transform(e.target.value);
  });
}

// Liga cada campo do formulário ao BI
bindInput("f-num", "num");
bindInput("f-name", "name");
bindInput("f-nat", "nat");
bindInput("f-addr", "addr");
bindInput("f-height", "height");
bindInput("f-gender", "gender");

bindInput("f-dob", "dob", (v)=>{
  if(!v) return "---";
  const parts = v.split("-");
  return ${parts[2]}/${parts[1]}/${parts[0]}; // formato DD/MM/AAAA
});

// FOTO -> mostra na hora
document.getElementById("f-photo").addEventListener("change", function(){
  const img = document.getElementById("person-photo");
  const file = this.files[0];
  if(file){
    img.src = URL.createObjectURL(file);
  }
});