export const PROJECTS = {
  booksy: {
    title: "Booksy",
    subtitle:
      "Biblioteca personal, catálogo y comunidad: todo en una sola plataforma.",
    tags: ["Full Stack", "Producción", "Proyecto personal"],
    problem:
      "Los lectores habituales no tienen una herramienta que resuelva todo en un mismo lugar. Las apps existentes permiten registrar lecturas o descubrir libros, pero ninguna combina ambas cosas con una experiencia social real.",
    role: "Fui la única desarrolladora y diseñadora del proyecto. Asumí ownership completo sobre todas las capas: decisiones de producto, diseño de interfaz, arquitectura del sistema, desarrollo frontend, backend, base de datos e infraestructura cloud.",
    stack: [
      "Frontend (React, Vite, Tailwind CSS)",
      "Backend (Node.js, TypeScript, Express)",
      "Base de datos (PostgreSQL, TypeORM)",
      "Infraestructura (AWS EC2, Amazon RDS, Nginx, PM2, Vercel)",
    ],
    duration: "2 a 4 meses de desarrollo activo.",
    solution:
      "Plataforma web completa con exploración de catálogo, biblioteca personal por estado de lectura, sistema de reseñas con rating, perfil de usuario público y panel administrativo con CRUD completo.",
    link: "https://github.com/IsaAlegre/Booksy",
  },
  paymentmanager: {
    title: "PaymentManager",
    subtitle: "Un dashboard administrativo de pagos construido para escalar.",
    tags: ["Frontend", "Angular", "Proyecto personal"],
    problem:
      "A medida que el volumen de transacciones crece, las interfaces que funcionaban bien con cientos de registros empiezan a degradarse con miles. Las búsquedas se vuelven lentas y el mantenimiento del código se complica.",
    role: "Desarrolladora y diseñadora única. Responsable de todas las decisiones técnicas y de interfaz: stack, arquitectura, componentes, diseño responsive y configuración del flujo con Git.",
    stack: [
      "Framework (Angular CLI)",
      "Lenguaje (TypeScript)",
      "Estilos (Tailwind CSS)",
      "Estado (Signals, ChangeDetectionStrategy.OnPush)",
      "Reactivo (RxJS)",
      "Notificaciones (SweetAlert2)",
      "Testing (Karma)",
    ],
    duration: "2 semanas de desarrollo intensivo.",
    solution:
      "Dashboard con listado paginado de solicitudes, detalle de transacciones, formulario con validaciones avanzadas, búsqueda por ID y cancelación automática de peticiones duplicadas con switchMap.",
    link: "https://github.com/IsaAlegre/PaymentManager",
  },
  netconfig: {
    title: "NetConfig Backup Tool",
    subtitle:
      "Automatización de backups de red: cuando la infraestructura y el software trabajan juntos.",
    tags: ["Infra + Software", "Java", "Proyecto grupal"],
    problem:
      "En entornos con múltiples dispositivos, el backup de configuraciones suele postergarse hasta que algo falla. El proceso manual es tedioso, difícil de auditar y fácil de olvidar.",
    role: "Proyecto académico grupal de cinco personas. Participé activamente en todas las capas, con mayor profundidad en el backend y en la configuración de la infraestructura de red.",
    stack: [
      "Backend (Java, Spring Boot)",
      "Persistencia (PostgreSQL, JPA/Hibernate)",
      "Conexión remota (JSch SSH)",
      "Frontend (React, Vite)",
      "Red simulada (GNS3, MikroTik RouterOS)",
      "Virtualización (VirtualBox)",
    ],
    duration: "2 a 3 semanas en contexto académico.",
    solution:
      "Sistema centralizado que se conecta vía SSH a cada router MikroTik, extrae su configuración y la almacena con timestamp. Incluye logs de auditoría filtrables, exportación a CSV y programación periódica de backups.",
    link: "https://github.com/TobyX73/NetConfig-Backup-Tool",
  },
};
