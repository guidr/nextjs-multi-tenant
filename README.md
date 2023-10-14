# Next.js Multi-Tenant Application with ISR (Incremental Site Regeneration)

This GitHub repository demonstrates how to create a multi-tenant application using Next.js with Incremental Site Regeneration (ISR) capabilities. The goal of this project is to enable efficient static page generation for a multi-tenant application, allowing Next.js to serve the static version of a page tailored to the specific tenant based on the host of the incoming request.


## The Problem

When building a multi-tenant application, one common challenge is ensuring that pages are statically generated and served to the appropriate tenant based on their unique host. This repository offers two different approaches to address this problem.

* [main](https://github.com/guidr/nextjs-multi-tenant/tree/main): This branch solves the problem by using the request host as a path parameter to distinguish different tenants. The path parameter representing the request host is injected into the URL path using URL rewrites defined in the [next.config.js](https://github.com/guidr/nextjs-multi-tenant/blob/main/next.config.js) configuration file.

* [using-middleware](https://github.com/guidr/nextjs-multi-tenant/tree/using-middleware): In this branch, we utilize a [middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware) approach to translate the request host into a tenant ID and set it as a header on the request. This tenant ID is then used to route the request to the correct tenant-specific page. URL rewrites in the [next.config.js](https://github.com/guidr/nextjs-multi-tenant/blob/using-middleware/next.config.js) file handle the routing.


## Features

* **Multi-tenant support with ISR**: Serve static pages specific to each tenant based on the request host.

* **Efficient page regeneration**: Benefit from Next.js ISR to regenerate pages incrementally for improved performance.

* **Flexible routing**: Choose between the path parameter approach or middleware approach for handling multi-tenancy.


## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To test locally with different domains, you can add entries to your `/etc/hosts` file. For example:

```
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1	    localhost
255.255.255.255	broadcasthost
::1             localhost

# Add these entries to test locally
127.0.0.1	tenant-a.demo.local
127.0.0.1	tenant-b.demo.local
```

Then, you can access the application at [http://tenant-a.demo.local:3000](http://tenant-a.demo.local:3000) and [http://tenant-b.demo.local:3000](http://tenant-b.demo.local:3000).

## Contributing
Contributions to this repository are welcome! If you have improvements, suggestions, or bug fixes, please open an issue or submit a pull request.

## License
This project is licensed under the terms of the MIT license