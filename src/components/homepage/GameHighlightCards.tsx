import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HighlightGame {
  id: string | number;
  title: string;
  imageUrl: string;
  status?: 'NEW' | 'RENTAL';
  description?: string;
  link: string;
}

interface GameHighlightCardsProps {
  title?: string;
  games: HighlightGame[];
}

const GameHighlightCards: React.FC<GameHighlightCardsProps> = ({ title = "Highlights", games }) => {
  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold font-heading mb-8 text-center">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-container">
          {games.map((game, index) => (
            <Card key={game.id} className="overflow-hidden card-hover-basic bg-card border-border flex flex-col stagger-item" style={{ animationDelay: `${index * 0.05}s` }}>
              <CardHeader className="p-0 relative">
                <AspectRatio ratio={4 / 3}>
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </AspectRatio>
                {game.status && (
                  <Badge
                    variant={game.status === 'NEW' ? 'default' : 'secondary'}
                    className={`absolute top-2 right-2 ${game.status === 'NEW' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}`}
                  >
                    {game.status}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col">
                <CardTitle className="text-lg font-heading mb-2 line-clamp-1">{game.title}</CardTitle>
                {game.description && (
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">{game.description}</p>
                )}
                <Button variant="outline" size="sm" asChild className="mt-auto self-start border-primary text-primary hover:bg-primary/10">
                  <a href={game.link}>
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameHighlightCards;
