import Link from 'next/link';
import { format } from 'date-fns/format';
import { unstable_cache as cache } from 'next/cache';

const getDinner = cache((tenant: string) => {
  const formattedTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

  return Promise.resolve({
    dinner: tenant === 'chicken' ? 'corn' : 'chicken',
    updatedAt: formattedTime,
  });
}, ['dinner'], { revalidate: 60 });

type PageProps = {
  params: {
    tenant: string;
  };
};

export default async function Page(props: PageProps) {
  const tenant = props.params.tenant;
  const { dinner, updatedAt } = await getDinner(tenant);

  return (
    <div className="container mx-auto mt-10">
      <h1>Hi {tenant}</h1>
      <p>Here's your dinner for tonight: {dinner}</p>
      <p>Updated at: {updatedAt}</p>

      <p>
        <Link href="/">Go back home</Link>
      </p>
    </div>
  );
}
