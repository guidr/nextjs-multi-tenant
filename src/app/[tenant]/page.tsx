import Link from 'next/link';
import { Activity, Bell, UtensilsCrossed } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { getTenantData } from '@/lib/tenant';

type PageProps = {
  params: Promise<{
    tenant: string;
  }>;
};

export default async function Page(props: PageProps) {
  const params = await props.params;
  const tenant = await getTenantData(params.tenant);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-5xl">{tenant.emoji}</span>
            <h1 className="text-4xl font-bold tracking-tight text-balance">Hello {tenant.name}</h1>
          </div>
          <p className="text-muted-foreground text-lg">Welcome back to your dashboard</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/dinner" className="group transition-transform hover:scale-[1.02]">
            <Card className="h-full border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <UtensilsCrossed className="h-8 w-8 text-primary" />
                  <span className="text-xs font-mono text-muted-foreground">MENU</span>
                </div>
                <CardTitle className="text-2xl">Tonight's Dinner</CardTitle>
                <CardDescription>Check what's on the menu for tonight</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full group-hover:bg-primary/90">View Menu</Button>
              </CardContent>
            </Card>
          </Link>

          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Activity className="h-8 w-8 text-chart-2" />
                <span className="text-xs font-mono text-muted-foreground">STATS</span>
              </div>
              <CardTitle className="text-2xl">Activity</CardTitle>
              <CardDescription>Your recent activity and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Meals this week</span>
                  <span className="font-mono font-semibold">7</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Favorite dish</span>
                  <span className="font-mono font-semibold">{tenant.favouriteDish.name}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="text-sm font-semibold text-primary">{tenant.status}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Bell className="h-8 w-8 text-chart-4" />
                <span className="text-xs font-mono text-muted-foreground">ALERTS</span>
              </div>
              <CardTitle className="text-2xl">Notifications</CardTitle>
              <CardDescription>Recent updates and announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                  <p className="text-sm font-medium">Menu Updated</p>
                  <p className="text-xs text-muted-foreground mt-1">Tonight's menu is now available</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                  <p className="text-sm font-medium">Welcome!</p>
                  <p className="text-xs text-muted-foreground mt-1">Thanks for using our app</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
