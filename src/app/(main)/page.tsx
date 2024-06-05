import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediaCarousel } from "@/components/MediaCarousel";

export default function Home() {
  return (
    <div className="container space-y-8 pt-4">
      <Tabs defaultValue="day">
        <h2 className="mb-2 text-xl font-semibold tracking-tight">Tenências</h2>
        <TabsList className="grid w-full grid-cols-2 md:w-96">
          <TabsTrigger value="day">Hoje</TabsTrigger>
          <TabsTrigger value="week">Esta semana</TabsTrigger>
        </TabsList>
        <TabsContent value="day">
          <MediaCarousel url="/3/trending/all/day" />
        </TabsContent>
        <TabsContent value="week">
          <MediaCarousel url="/3/trending/all/week" />
        </TabsContent>
      </Tabs>
      <Tabs defaultValue="popularMovies">
        <h2 className="mb-2 text-xl font-semibold tracking-tight">Filmes</h2>
        <TabsList className="grid w-full grid-cols-2 md:w-96">
          <TabsTrigger value="popularMovies">Populares</TabsTrigger>
          <TabsTrigger value="topRatedMovies">Melhores avaliações</TabsTrigger>
        </TabsList>
        <TabsContent value="popularMovies">
          <MediaCarousel url="/3/movie/popular" type="movie" />
        </TabsContent>
        <TabsContent value="topRatedMovies">
          <MediaCarousel url="/3/movie/top_rated" type="movie" />
        </TabsContent>
      </Tabs>
      <Tabs defaultValue="popularTV">
        <h2 className="mb-2 text-xl font-semibold tracking-tight">Series</h2>
        <TabsList className="grid w-full grid-cols-2 md:w-96">
          <TabsTrigger value="popularTV">Populares</TabsTrigger>
          <TabsTrigger value="topRatedTV">Melhores avaliações</TabsTrigger>
        </TabsList>
        <TabsContent value="popularTV">
          <MediaCarousel url="/3/tv/popular" type="tv" />
        </TabsContent>
        <TabsContent value="topRatedTV">
          <MediaCarousel url="/3/tv/top_rated" type="movie" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
