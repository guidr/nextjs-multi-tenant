import Link from 'next/link';

type PageProps = {
  params: {
    tenant: string;
  };
};

export default async function Page(props: PageProps) {
  const tenant = props.params.tenant;

  return (
    <div className="container mx-auto mt-10">
      <h1>Hello {tenant}</h1>
      <p>
        <Link href="/dinner">Check the dinner menu</Link>
      </p>
    </div>
  );
}
