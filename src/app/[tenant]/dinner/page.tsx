import Link from 'next/link';
import { format } from 'date-fns/format';
import { unstable_cache as cache } from 'next/cache';
import { ArrowLeft, Clock, ChefHat } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getTenantData } from '@/lib/tenant';

const getDinner = cache(async (tenant: string) => {
  const data = await getTenantData(tenant);
  
  return Promise.resolve({
    mainCourse: data.favouriteDish.name,
    image: data.favouriteDish.image,
    updatedAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
  });
}, ['dinner'], { revalidate: 60 });

type PageProps = {
  params: {
    tenant: string;
  };
};

export default async function Page(props: PageProps) {
  const tenant = props.params.tenant;
  const dinner = await getDinner(tenant);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group">
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </Link>

        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChefHat className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-3 text-balance">Tonight's Dinner Menu</h1>
        </header>

        <Card className="border-2 border-primary/20 shadow-lg shadow-primary/5 mb-8">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-5xl">🍽️</span>
            </div>
            <CardTitle className="text-3xl mb-2">Main Course</CardTitle>
            <CardDescription className="text-base">Today's featured dish</CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-8">
            <div className="inline-block space-y-4 px-8 py-6 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30">
              <p className="text-6xl font-bold text-primary mb-2">{dinner.mainCourse}</p>
              <img 
                src={dinner.image} 
                alt={dinner.mainCourse} 
                className="mx-auto h-52 w-5h-52 object-cover rounded-lg shadow-md" 
              />
              <p className="text-sm text-muted-foreground font-mono">TONIGHT'S SPECIAL</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-secondary">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Menu Last Updated</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{dinner.updatedAt}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg">Dietary Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Preparation</span>
                  <span className="font-medium">Fresh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Serving</span>
                  <span className="font-medium">Hot</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Portion</span>
                  <span className="font-medium">Standard</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg">Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium text-primary">Available</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Serving Time</span>
                  <span className="font-medium">6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">Main Hall</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
