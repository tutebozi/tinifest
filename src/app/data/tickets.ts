export interface Ticket {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  date: string;
  time: string;
  location: string;
  description: string;
  benefits: string[];
  language?: string;
}

export const tickets: Ticket[] = [
  {
    id: "rizoma-himno",
    title: "Rizoma, Himno Nacional Argentino",
    imageUrl: "/events/event1.jpg",
    price: 149,
    date: "11 Dic 2024",
    time: "00:55 hrs",
    location: "Teatro Nacional",
    description: "El audiovisual homenaje a nuestro himno",
    benefits: [
      "Acceso prioritario",
      "Asientos preferenciales",
      "Kit de bienvenida exclusivo"
    ]
  },
  {
    id: "chana-club",
    title: "Thursday 10.04 Chana Club",
    imageUrl: "/events/event2.jpg",
    price: 169,
    date: "10 Abr 2025",
    time: "00:00 hrs",
    location: "Puerto madero",
    description: "Set Live DJ en el mejor club de la ciudad",
    benefits: [
      "Acceso VIP",
      "Copa de bienvenida",
      "Área reservada"
    ]
  },
  {
    id: "karaoke-box",
    title: "SALAS PRIVADAS DE KARAOKE",
    imageUrl: "/events/event3.jpg",
    price: 199,
    date: "10 Abr 2025",
    time: "10:00 hrs",
    location: "BOX KARAOKE BAR",
    description: "Totalmente equipadas, Carta gastronómica, Barra de tragos",
    benefits: [
      "Sala privada",
      "Equipo de karaoke",
      "Servicio personalizado"
    ]
  },
  {
    id: "bar-boliche",
    title: "BAR BOLICHE PARA FIESTAS PRIVADAS",
    imageUrl: "/events/event4.jpg",
    price: 249,
    date: "10 Abr 2025",
    time: "11:00 hrs",
    location: "VARIAS LOCACIONES",
    description: "Eventos privados de más de 30 invitados",
    benefits: [
      "Local completo",
      "Barra de bebidas",
      "Personal de servicio"
    ]
  }
]; 