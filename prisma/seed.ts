import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.artwork.deleteMany()
  await prisma.newsItem.deleteMany()
  await prisma.biography.deleteMany()
  await prisma.timelineEntry.deleteMany()

  // Artworks
  await prisma.artwork.createMany({
    data: [
      { title: 'Composición en Azul', year: 1962, decade: 1960, technique: 'Óleo sobre lienzo', dimensions: '120 × 95 cm', image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&q=80', description: 'Primera exploración del campo de color.', order: 1 },
      { title: 'Umbral I', year: 1964, decade: 1960, technique: 'Óleo sobre lienzo', dimensions: '80 × 80 cm', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80', order: 2 },
      { title: 'Formas Suspendidas', year: 1966, decade: 1960, technique: 'Técnica mixta', dimensions: '150 × 110 cm', image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600&q=80', order: 3 },
      { title: 'Geometría del Silencio', year: 1968, decade: 1960, technique: 'Acrílico sobre tela', dimensions: '100 × 100 cm', image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=600&q=80', order: 4 },
      { title: 'Tierra Roja', year: 1971, decade: 1970, technique: 'Óleo sobre lienzo', dimensions: '180 × 140 cm', image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=80', order: 5 },
      { title: 'Pliegues del Tiempo', year: 1973, decade: 1970, technique: 'Técnica mixta', dimensions: '90 × 70 cm', image: 'https://images.unsplash.com/photo-1552084117-56a987666449?w=600&q=80', order: 6 },
      { title: 'Horizonte Partido', year: 1975, decade: 1970, technique: 'Acrílico sobre tela', dimensions: '200 × 120 cm', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80', order: 7 },
      { title: 'Luz de Mediodía', year: 1978, decade: 1970, technique: 'Óleo sobre lienzo', dimensions: '130 × 130 cm', image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?w=600&q=80', order: 8 },
      { title: 'Densidad', year: 1981, decade: 1980, technique: 'Técnica mixta sobre tabla', dimensions: '110 × 85 cm', image: 'https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?w=600&q=80', order: 9 },
      { title: 'Espejo Negro', year: 1984, decade: 1980, technique: 'Óleo y arena sobre lienzo', dimensions: '160 × 120 cm', image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=80', order: 10 },
      { title: 'Campo de Tensión', year: 1986, decade: 1980, technique: 'Acrílico sobre lienzo', dimensions: '140 × 100 cm', image: 'https://images.unsplash.com/photo-1553949345-eb786bb3f7ba?w=600&q=80', order: 11 },
      { title: 'Fragmento Urbano', year: 1989, decade: 1980, technique: 'Técnica mixta', dimensions: '95 × 95 cm', image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&q=80', order: 12 },
      { title: 'Memoria del Cuerpo', year: 1991, decade: 1990, technique: 'Óleo sobre lienzo', dimensions: '220 × 160 cm', image: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=600&q=80', order: 13 },
      { title: 'Tránsito', year: 1993, decade: 1990, technique: 'Técnica mixta sobre papel', dimensions: '70 × 50 cm', image: 'https://images.unsplash.com/photo-1548094891-c4ba474efd16?w=600&q=80', order: 14 },
      { title: 'Ausencia', year: 1996, decade: 1990, technique: 'Acrílico y grafito sobre lienzo', dimensions: '180 × 180 cm', image: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=600&q=80', order: 15 },
      { title: 'Último Paisaje', year: 1999, decade: 1990, technique: 'Óleo sobre lienzo', dimensions: '170 × 130 cm', image: 'https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=600&q=80', order: 16 },
    ],
  })

  // News
  await prisma.newsItem.createMany({
    data: [
      {
        title: 'Retrospectiva en el Museo Nacional de Arte Contemporáneo',
        date: new Date('2024-11-15'),
        category: 'Exposición',
        excerpt: 'Una muestra de más de 60 obras abarca seis décadas de trabajo ininterrumpido.',
        content: 'El Museo Nacional de Arte Contemporáneo acoge a partir del próximo enero la mayor retrospectiva jamás organizada sobre la obra de Elena Vidal. Con más de 60 piezas procedentes de colecciones públicas y privadas de todo el mundo, la exposición recorre seis décadas de trabajo ininterrumpido.',
        image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=80',
      },
      {
        title: 'Premio Nacional de Artes Plásticas 2024',
        date: new Date('2024-09-22'),
        category: 'Premio',
        excerpt: 'El Ministerio de Cultura reconoce una trayectoria de más de cinco décadas.',
        content: 'Elena Vidal ha sido galardonada con el Premio Nacional de Artes Plásticas 2024. El jurado destacó la coherencia y profundidad de una obra que ha sabido mantenerse al margen de modas y tendencias sin renunciar nunca a la conversación con su tiempo.',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
      },
      {
        title: 'Nueva adquisición del MoMA de Nueva York',
        date: new Date('2024-06-08'),
        category: 'Colección',
        excerpt: '"Tierra Roja" (1971) pasa a formar parte de la colección permanente del museo.',
        content: 'El Museum of Modern Art de Nueva York ha anunciado la adquisición de "Tierra Roja" (1971), una de las obras más emblemáticas de la artista. La pieza se incorpora a la colección permanente.',
        image: 'https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?w=800&q=80',
      },
      {
        title: 'Conferencia en la Fundación Joan Miró',
        date: new Date('2024-03-14'),
        category: 'Evento',
        excerpt: 'La artista habla por primera vez en público sobre sus métodos de trabajo.',
        content: 'En una conferencia inédita en la Fundación Joan Miró de Barcelona, Elena Vidal habló durante más de dos horas sobre sus métodos de trabajo, sus influencias y su visión del arte contemporáneo.',
        image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988a5?w=800&q=80',
      },
    ],
  })

  // Biography
  await prisma.biography.create({
    data: {
      body: `Elena Vidal (Madrid, 1940) es una de las figuras más singulares de la pintura abstracta española de la segunda mitad del siglo XX. Formada en la Escuela de Bellas Artes de San Fernando y posteriormente en París, su obra nace del contacto directo con las corrientes del expresionismo abstracto americano y el informalismo europeo, aunque pronto encontró un lenguaje propio, desprovisto de influencias directas reconocibles.

Sus primeras obras de los años sesenta, marcadas por una paleta austera y una estructura severa, la situaron de inmediato como una pintora de rigor fuera de lo común. A lo largo de los setenta desarrolló una serie de grandes formatos en los que el color dejó de funcionar como elemento expresivo para convertirse en una presencia física, casi arquitectónica.

Los años ochenta supusieron una apertura hacia materiales no convencionales: arena, tela sin preparar, pigmentos en polvo. Sin embargo, lejos de caer en el gesto fácil, estos recursos sirvieron para profundizar en su investigación sobre la densidad y la resistencia de la superficie pictórica.

En la última etapa de su obra, durante los noventa, Vidal redujo sus medios al mínimo. Las pinturas de este periodo, de una austeridad casi radical, son quizás las más potentes: campos monocromos atravesados por una sola línea, planos que se tensionan hasta el límite sin llegar nunca a romperse.

Su obra forma parte de las colecciones permanentes del MoMA de Nueva York, el Museo Reina Sofía, el Centre Pompidou y la Tate Modern. Vive y trabaja en Madrid.`,
    },
  })

  // Timeline
  await prisma.timelineEntry.createMany({
    data: [
      { year: '1940', text: 'Nace en Madrid', order: 1 },
      { year: '1958', text: 'Ingresa en la Escuela de Bellas Artes de San Fernando, Madrid', order: 2 },
      { year: '1963', text: 'Se traslada a París. Estudia en la Académie des Beaux-Arts', order: 3 },
      { year: '1965', text: 'Primera exposición individual en la Galería Juana Mordó, Madrid', order: 4 },
      { year: '1970', text: 'Beca Guggenheim. Viaje a Nueva York', order: 5 },
      { year: '1978', text: 'Gran Premio en la Bienal de São Paulo', order: 6 },
      { year: '1985', text: 'Retrospectiva en el Museo Reina Sofía, Madrid', order: 7 },
      { year: '1992', text: 'Representante de España en la Bienal de Venecia', order: 8 },
      { year: '2009', text: 'Premio Velázquez de Artes Plásticas', order: 9 },
      { year: '2024', text: 'Premio Nacional de Artes Plásticas. Retrospectiva MNAC', order: 10 },
    ],
  })

  console.log('Seed completado.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
