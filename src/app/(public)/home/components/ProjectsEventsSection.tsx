import Heading from '@/components/Heading';
import Image from 'next/image';
import styles from '../projects-events-section.module.css';

type ProjectEventItem = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tone: 'purple' | 'violet' | 'pink';
};

const items: ProjectEventItem[] & { length: 3 } = [
  {
    title: 'Data Feminism with Lauren Klein',
    description:
      'RCC hosted Lauren Klein for a conversation on how data can be used as a lens to examine power, inequality, and whose stories are amplified or left out in data practices.',
    image: '/images/data-feminism-with-lauren-klein.svg',
    imageAlt: 'Data Feminism with Lauren Klein event graphic',
    tone: 'purple',
  },
  {
    title: 'EPA ESA Website',
    description:
      'Our project team developed an application that simplifies pesticide application data for pesticide applicators and farmers, turning complex requirements into a clearer web experience.',
    image: '/home_images/EPA_ESA_logo.png',
    imageAlt: 'EPA ESA project logo',
    tone: 'violet',
  },
  {
    title: 'RCC Case Competition: AI and Fraud',
    description:
      'Student teams explored how AI is transforming fraud detection across technology and finance, designing policy and technical solutions for a pressing real-world challenge.',
    image: '/images/case-competition-ai-fraud.jpg',
    imageAlt: 'AI and fraud case competition event',
    tone: 'pink',
  },
];

export default function ProjectsEventsSection() {
  return (
    <section className={styles.container} aria-labelledby="projects-events-heading">
      <div className={styles.headingWrap}>
        <Heading headingTag="h2" customStyle={{ margin: 0 }}>
          <span id="projects-events-heading">What We&apos;ve Done</span>
        </Heading>
      </div>

      <div className={styles.grid}>
        <ProjectMedia item={items[0]} />
        <ProjectCard item={items[0]} />
        <ProjectCard item={items[1]} className={styles.secondCard} />
        <ProjectMedia item={items[1]} className={styles.secondMedia} contain />
        <ProjectMedia item={items[2]} />
        <ProjectCard item={items[2]} />
      </div>
    </section>
  );
}

function ProjectMedia({
  item,
  className,
  contain = false,
}: {
  item: ProjectEventItem;
  className?: string;
  contain?: boolean;
}) {
  return (
    <div className={`${styles.media} ${className ?? ''}`}>
      <Image
        src={item.image}
        alt={item.imageAlt}
        fill
        sizes="(max-width: 900px) 100vw, 720px"
        style={{ objectFit: contain ? 'contain' : 'cover', padding: contain ? '5rem' : undefined }}
      />
    </div>
  );
}

function ProjectCard({ item, className }: { item: ProjectEventItem; className?: string }) {
  return (
    <article className={`${styles.card} ${className ?? ''}`}>
      <div className={styles.cardContent}>
        <h3 className={`${styles.title} ${styles[item.tone]}`}>{item.title}</h3>
        <p className={styles.description}>{item.description}</p>
      </div>
    </article>
  );
}
