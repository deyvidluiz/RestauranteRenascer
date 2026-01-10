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
  const modalMedia = modal ? modal.querySelector("#modalMedia") : null
  const btnFechar = modal ? modal.querySelector(".modal-fechar") : null

  if (!modal) return

  function abrirModalImagem(src, alt) {
    if (!modalMedia) return
    modalMedia.innerHTML = ''
    const img = document.createElement('img')
    img.src = src
    img.alt = alt || 'Imagem da galeria'
    img.style.maxWidth = '100%'
    img.style.maxHeight = '85vh'
    modalMedia.appendChild(img)
    modal.classList.add("ativo")
    modal.setAttribute("aria-hidden", "false")
    document.body.style.overflow = "hidden"
  }

  function abrirModalVideo(src, alt) {
    if (!modalMedia) return
    modalMedia.innerHTML = ''
    const video = document.createElement('video')
    video.src = src
    video.controls = true
    video.setAttribute('aria-label', alt || 'Vídeo da galeria')
    video.style.maxWidth = '100%'
    video.style.maxHeight = '85vh'
    modalMedia.appendChild(video)
    modal.classList.add("ativo")
    modal.setAttribute("aria-hidden", "false")
    document.body.style.overflow = "hidden"
  }

  // Abrir ao clicar em qualquer imagem da grade-galeria (comportamento original)
  document.querySelectorAll(".grade-galeria img").forEach((img) => {
    img.style.cursor = "pointer"
    img.addEventListener("click", (e) => {
      abrirModalImagem(e.currentTarget.src, e.currentTarget.alt)
    })
  })

  // Abrir vídeo no modal; não reproduzir na grade — reprodução só dentro do modal quando usuário apertar play
  document.querySelectorAll(".grade-galeria video").forEach((vid) => {
    vid.style.cursor = 'pointer'
    // garantir que o vídeo na grade não reproduza automaticamente
    try { vid.pause() } catch (err) {}
    vid.addEventListener('click', (e) => {
      // Evita que o próprio elemento de grade inicie reprodução
      try { e.currentTarget.pause() } catch (err) {}
      abrirModalVideo(e.currentTarget.currentSrc || e.currentTarget.src, e.currentTarget.getAttribute('alt'))
    })
  })

  // Ao fechar, garantir que qualquer mídia do modal seja parada e removida
  function limparMediaModal() {
    if (!modalMedia) return
    const video = modalMedia.querySelector('video')
    if (video) {
      try { video.pause() } catch (err) {}
    }
    modalMedia.innerHTML = ''
  }

  function fecharModal() {
    limparMediaModal()
    modal.classList.remove('ativo')
    modal.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = ''
  }

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
