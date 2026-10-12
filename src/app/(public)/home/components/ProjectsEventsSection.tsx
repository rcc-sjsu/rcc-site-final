import Image from 'next/image';
import Reveal from '@/components/Reveal';
import { Badge } from '@/components/ui/badge';
import { TickButton } from '@/components/ui/pixel-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import SectionHeading from '@/components/SectionHeading';

type ProjectEventItem = {
  kind: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  contain?: boolean;
};

const items: ProjectEventItem[] = [
  {
    kind: 'Speaker event',
    title: 'Data Feminism with Lauren Klein',
    description:
      'RCC hosted Lauren Klein for a conversation on how data can be used as a lens to examine power, inequality, and whose stories are amplified or left out in data practices.',
    image: '/images/data-feminism-with-lauren-klein.svg',
    imageAlt: 'Data Feminism with Lauren Klein event graphic',
  },
  {
    kind: 'Project',
    title: 'EPA ESA Website',
    description:
      'Our project team developed an application that simplifies pesticide application data for pesticide applicators and farmers, turning complex requirements into a clearer web experience.',
    image: '/home_images/EPA_ESA_logo.png',
    imageAlt: 'EPA ESA project logo',
    contain: true,
  },
  {
    kind: 'Case competition',
    title: 'RCC Case Competition: AI and Fraud',
    description:
      'Student teams explored how AI is transforming fraud detection across technology and finance, designing policy and technical solutions for a pressing real-world challenge.',
    image: '/images/case-competition-ai-fraud.jpg',
    imageAlt: 'AI and fraud case competition event',
  },
];

export default function ProjectsEventsSection() {
  return (
    <section className="bg-muted py-20 sm:py-28" aria-labelledby="projects-events-heading">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 sm:px-10">
        <SectionHeading
          id="projects-events-heading"
          eyebrow="Our impact"
          title="What we've done"
          description="A few highlights from our events, projects, and competitions."
        >
          <TickButton href="/about" className="w-fit shrink-0">
            More about RCC
          </TickButton>
        </SectionHeading>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 90} className="h-full">
              <Card className="group h-full gap-0 py-0 transition-shadow duration-300 ease-hover hover:shadow-lg hover:shadow-rcc-violet/10">
                <div
                  className={cn(
                    'relative aspect-[16/10] w-full overflow-hidden bg-muted',
                    item.contain && 'bg-rcc-mist'
                  )}
                >
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className={cn(
                      'transition-transform duration-500 ease-cta group-hover:scale-[1.03] motion-reduce:group-hover:scale-100',
                      item.contain ? 'object-contain p-10' : 'object-cover'
                    )}
                  />
                </div>
                <CardHeader className="gap-3 pt-5">
                  <Badge variant="accent">{item.kind}</Badge>
                  <CardTitle className="text-xl leading-snug font-semibold tracking-tight text-foreground">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-3 pb-6">
                  <span className="text-sm leading-relaxed text-muted-foreground sm:text-base">{item.description}</span>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
