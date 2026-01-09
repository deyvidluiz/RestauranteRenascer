// script.js
// Organização: legibilidade e comentários. Sem alteração de comportamento.

// Função para alternar o menu mobile
function alternarMenu() {
  const menuMobile = document.getElementById("menuMobile")
  menuMobile.classList.toggle("ativo")
}

// Função para fechar o menu mobile
function fecharMenu() {
  const menuMobile = document.getElementById("menuMobile")
  menuMobile.classList.remove("ativo")
}

// Função para mostrar categoria do cardápio
function mostrarCategoria(categoriaId) {
  // Remove a classe 'ativo' de todas as categorias
  const todasCategorias = document.querySelectorAll(".categoria-cardapio")
  todasCategorias.forEach((categoria) => {
    categoria.classList.remove("ativo")
  })

  // Remove a classe 'ativo' de todos os botões
  const todosBotoes = document.querySelectorAll(".aba-botao")
  todosBotoes.forEach((botao) => {
    botao.classList.remove("ativo")
  })

  // Adiciona a classe 'ativo' à categoria selecionada
  const categoriaSelecionada = document.getElementById(categoriaId)
  if (categoriaSelecionada) {
    categoriaSelecionada.classList.add("ativo")
  }

  // Adiciona a classe 'ativo' ao botão clicado
  event.target.classList.add("ativo")
}

// Scroll suave para links âncora
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault()
    const destino = document.querySelector(this.getAttribute("href"))
    if (destino) {
      destino.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Fechar menu mobile ao clicar fora
document.addEventListener("click", (evento) => {
  const menuMobile = document.getElementById("menuMobile")
  const botaoMenu = document.querySelector(".botao-menu")

  if (
    menuMobile.classList.contains("ativo") &&
    !menuMobile.contains(evento.target) &&
    !botaoMenu.contains(evento.target)
  ) {
    menuMobile.classList.remove("ativo")
  }
})

// --- Lightbox/Modal da galeria ---
;(function () {
  const modal = document.getElementById("modalGaleria")
  const modalImg = document.getElementById("modalImagem")
  const btnFechar = modal ? modal.querySelector(".modal-fechar") : null

  if (!modal) return

  function abrirModal(src, alt) {
    modalImg.src = src
    modalImg.alt = alt || "Imagem da galeria"
    modal.classList.add("ativo")
    modal.setAttribute("aria-hidden", "false")
    document.body.style.overflow = "hidden"
  }

  function fecharModal() {
    modal.classList.remove("ativo")
    modal.setAttribute("aria-hidden", "true")
    modalImg.src = ""
    document.body.style.overflow = ""
  }

  // Abrir ao clicar em qualquer imagem da grade-galeria
  document.querySelectorAll(".grade-galeria img").forEach((img) => {
    img.style.cursor = "pointer"
    img.addEventListener("click", (e) => {
      abrirModal(e.currentTarget.src, e.currentTarget.alt)
    })
  })

  // Fechar com botão
  if (btnFechar) btnFechar.addEventListener("click", fecharModal)

  // Fechar ao clicar fora do conteúdo (no overlay)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) fecharModal()
  })

  // Fechar com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("ativo")) fecharModal()
  })
})()
