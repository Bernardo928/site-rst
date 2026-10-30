// Informações oficiais da Casa Marafo. Edite aqui — o site inteiro lê deste arquivo.

const ADDRESS_QUERY = 'Casa Marafo Bar, Rua Fidalga, 23 - Pinheiros, São Paulo - SP, 05423-070'

export const site = {
  name: 'Casa Marafo Bar',
  address: {
    street: 'Rua Fidalga, 23',
    district: 'Pinheiros',
    city: 'São Paulo — SP',
    zip: '05423-070',
  },
  phone: { display: '(11) 96899-3951', href: 'tel:+5511968993951' },
  rating: { value: '4,9', count: 101 },
  priceRange: 'R$ 60–120 por pessoa',
  services: ['Refeição no local', 'Retirada', 'Entrega'],
  links: {
    tiktok: 'https://www.tiktok.com/@casamarafo',
    directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_QUERY)}`,
    maps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_QUERY)}`,
    mapEmbed: `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_QUERY)}&output=embed`,
    // Preencha com os links oficiais. Enquanto vazios, os botões usam o cardápio
    // do próprio site e o item "Linktree" fica oculto — nenhuma URL é inventada.
    canvaMenu: '',
    linktree: '',
  },
  // Horários conforme a ficha do Google (a segunda-feira aparecia fechada por Dia de Finados).
  hours: [
    { days: 'Quarta e quinta', time: '17h — 00h' },
    { days: 'Sexta e sábado', time: '17h — 01h' },
    { days: 'Domingo a terça', time: 'Fechado' },
  ],
}

export const nav = [
  { id: 'inicio', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'experiencias', label: 'Experiências' },
  { id: 'cardapio', label: 'Cardápio' },
  { id: 'galeria', label: 'Galeria' },
  { id: 'avaliacoes', label: 'Avaliações' },
  { id: 'contato', label: 'Contato' },
]

export const reviews = [
  'Um ótimo lugar para recarregar as energias no meio do caos de São Paulo.',
  'Os drinks são uma delícia, o samba é excelente e a comida muito boa!',
  'Ambiente super gostoso, música ao vivo, porções e drinks maravilhosos!',
]

export type MenuItem = { name: string; desc?: string; price: string; vegan?: boolean }
export type MenuGroup = { title: string; note?: string; items: MenuItem[] }
export type MenuCategory = { id: string; label: string; page: string; groups: MenuGroup[] }

// Transcrito do cardápio oficial da casa.
export const menu: MenuCategory[] = [
  {
    id: 'drinks',
    label: 'Drinks',
    page: 'menu-drinks',
    groups: [
      {
        title: 'Autorais — por Francini Reiter',
        note: 'Da cana que brota da terra, surge a cachaça que aquece a alma.',
        items: [
          { name: 'Casa Marafo', desc: 'Cachaça Salineira infusionada c/ coentro, shrub de tangerina, extrato de gengibre, limão cravo, borda de flor de sal.', price: '38,80' },
          { name: 'Zé do Coco', desc: 'Cachaça Mato Dentro fat-wash óleo de coco, aluá e limão.', price: '38,50' },
          { name: 'Mete Xeque', desc: 'Cachaça São Luiz de amendoim, chá mate, xarope de guaraná e limão.', price: '35,20' },
          { name: 'Abre Caminhos', desc: 'Cachaça Salinissima, extrato de cidreira e erva-doce, shrub de tangerina, limão cravo e espuma cítrica.', price: '39,90' },
          { name: 'Despertar', desc: 'Cachaça de jambu, maracujá, shrub de limão cravo.', price: '37,40' },
          { name: 'Alma Brasileira', desc: 'Cachaça Salineira fat-wash no azeite de dendê, maracujá e soda artesanal de manjericão.', price: '38,50' },
          { name: 'Café Cristão', desc: 'Cachaça Casa Roble infusionada no café, Campari e Cynar.', price: '37,40' },
          { name: 'Maria Amalia', desc: 'Cachaça Seleta, lima da pérsia, x. simples e vinho do Porto.', price: '48,70' },
        ],
      },
      {
        title: 'Nem só de cachaça se vive',
        items: [
          { name: 'Chapéu Virado', desc: 'Conhaque de alcatrão, espresso e melaço de cana.', price: '30,80' },
          { name: 'Aura Selvagem', desc: 'Jägermeister, purê de manga e mirtilo e x. simples.', price: '46,20' },
          { name: 'Maracujazz', desc: "Whisky Dewar's 12, maracujá, limão siciliano, x. simples e albumina.", price: '42,90' },
          { name: 'Mariela', desc: 'Jameson, Macieira, x. frutas vermelhas, limão siciliano e Luxardo.', price: '41,80' },
        ],
      },
    ],
  },
  {
    id: 'entradas',
    label: 'Entradas',
    page: 'menu-entradas',
    groups: [
      {
        title: 'Entradas',
        items: [
          { name: 'Polpetone', desc: 'Acompanha pão.', price: '45,50' },
          { name: 'Choripan', desc: 'Pão chapeado com linguiça e chimichurri.', price: '37,00' },
          { name: 'Bife Ancho', desc: 'Acompanha molho chimichurri e pão.', price: '70,00' },
          { name: 'Salada Tropical', desc: 'Mix de folhas, rúcula, manga, cebola roxa, tomate cereja e molho de laranja-bahia.', price: '40,00', vegan: true },
          { name: 'Salada Caesar', desc: 'Mix de alface, frango à milanesa, parmesão e molho caesar.', price: '40,00' },
          { name: 'Homus c/ Cogumelos', desc: 'Acompanha pão.', price: '45,50', vegan: true },
          { name: 'Bolinho de Bacalhau', desc: '6 unidades, acompanha limão.', price: '60,00' },
          { name: 'Torresmo à Pururuca', desc: 'Acompanha molho de pimenta agridoce e limão.', price: '45,00' },
          { name: 'Carne Seca com Mandioca', desc: 'Puxado na manteiga de garrafa, cebola e coentro.', price: '55,00' },
        ],
      },
      {
        title: 'Conservas, minduim e mí',
        items: [
          { name: 'Milho Mostarda & Mel', price: '16,50' },
          { name: 'Amendoim Torrado / Salgado', price: '16,50' },
          { name: 'Conservas', desc: 'Verificar sabores disponíveis (até 3 opções).', price: '50,00' },
          { name: 'Porção de Pão & Torradas', price: '15,00' },
        ],
      },
    ],
  },
  {
    id: 'porcoes',
    label: 'Porções',
    page: 'menu-porcoes',
    groups: [
      {
        title: 'Para compartilhar',
        items: [
          { name: 'Provolone à Milanesa', desc: 'Acompanha maionese verde.', price: '45,50' },
          { name: 'Dadinho de Tapioca', desc: '10 unidades, acompanha geleia de pimenta.', price: '49,50' },
          { name: 'Fritas', desc: 'Acompanha ketchup.', price: '35,00', vegan: true },
          { name: 'Pastel de Fraldinha Desfiada', desc: '4 unidades, acompanha maionese e vinagrete.', price: '40,00' },
          { name: 'Mandioca Frita', price: '40,00', vegan: true },
          { name: 'Coxinha de 3 Cogumelos', desc: '8 unidades, acompanha molho aioli vegano.', price: '49,50', vegan: true },
          { name: 'Pastel de Bobó Palmito', desc: '4 unidades, acompanha vinagrete.', price: '40,00', vegan: true },
          { name: 'Pastel de Camarão', desc: '4 unidades, acompanha vinagrete.', price: '45,00' },
          { name: 'Bolinho Caipira', desc: '6 unidades, calabresa apimentada c/ queijo canastra, acompanha maionese de alho.', price: '42,50' },
          { name: 'Frango Frito', desc: 'Acompanha maionese de curry.', price: '49,50' },
          { name: 'Calabresa Artesanal', desc: 'Acompanha pão, vinagrete e farofa.', price: '50,00' },
          { name: 'Croquete de Pernil na Cachaça', desc: '6 unidades, acompanha aioli.', price: '42,50' },
          { name: 'Coração de Galinha Flambado na Cachaça', desc: 'Acompanha pão, vinagrete e farofa.', price: '47,50' },
          { name: 'Pastel de Queijo', desc: '4 unidades, acompanha maionese e vinagrete.', price: '40,00' },
        ],
      },
    ],
  },
  {
    id: 'lanches',
    label: 'Lanches',
    page: 'menu-lanches',
    groups: [
      {
        title: 'Angus 180g',
        note: 'Todos acompanham fritas.',
        items: [
          { name: 'Cheese Burger', desc: 'Pão brioche, blend de carne angus 180g, queijo, maionese verde.', price: '50,00' },
          { name: 'Bacon Blast', desc: 'Pão brioche, blend angus 180g, bacon crispy, queijo, maionese verde.', price: '56,00' },
          { name: 'Cheese Salada', desc: 'Pão brioche, blend angus 180g, queijo, alface, tomate, cebola roxa, picles, maionese verde.', price: '52,00' },
          { name: 'Supremo', desc: 'Pão brioche, blend angus 180g, queijo gorgonzola, cebola caramelizada, bacon crispy, aioli.', price: '65,00' },
          { name: 'Big Brie', desc: 'Pão brioche, blend angus 180g, queijo brie, rúcula & molho sweet chilli.', price: '65,00' },
        ],
      },
      {
        title: 'Frango, cordeiro & vegetais',
        items: [
          { name: 'Crispy Caesar', desc: 'Pão ciabatta, frango à milanesa, alface, parmesão, molho caesar e maionese de alho.', price: '57,00' },
          { name: 'Chicken Parm', desc: 'Pão ciabatta, frango à milanesa, molho de tomate e mussarela.', price: '57,00' },
          { name: 'Amira', desc: 'Carne de cordeiro moída, homus, cebola roxa marinada na hortelã.', price: '65,00' },
          { name: 'Fidalga', desc: 'Vegetariano. Pão ciabatta, abobrinha grelhada com queijo coalho e geleia de pimenta.', price: '50,00' },
          { name: 'The Great Vegan', desc: 'Pão ciabatta, berinjela à milanesa, rabanete, rúcula, tomate confit e aioli vegano.', price: '52,00', vegan: true },
        ],
      },
    ],
  },
  {
    id: 'sobremesa',
    label: 'Sobremesas',
    page: 'menu-sobremesa',
    groups: [
      {
        title: 'Para adoçar a vida',
        items: [
          { name: 'Romeu e Julieta', desc: 'Dadinho de tapioca doce, coberto com goiabada cremosa e pipoquinha de queijo coalho.', price: '40,00' },
          { name: 'Brownie com Café & Sorvete', desc: 'Brownie, creme de café e noz-pecã cristalizada & uma bola de sorvete de creme.', price: '40,00' },
          { name: 'Rabanada de Chocotone', desc: 'Acompanha sorvete de baunilha.', price: '38,00' },
          { name: 'Sorvetes', desc: 'Chocolate belga, baunilha ou jabuticaba (vegano).', price: '24,00' },
        ],
      },
      {
        title: 'Bebidas digestivas',
        items: [
          { name: 'Café Espresso', price: '8,80' },
          { name: 'Café Espresso Duplo', price: '11,00' },
          { name: 'Cold Brew', desc: 'Café gelado com especiarias.', price: '27,50' },
          { name: 'Vinho do Porto', desc: 'Messias Ruby ou Messias Tawny.', price: '33,00' },
          { name: 'Lemoncello', price: '33,00' },
        ],
      },
    ],
  },
]
