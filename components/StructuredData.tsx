export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Cloud Weather',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web Browser',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com',
    description: 'Monitor the status of major cloud services (AWS, Cloudflare, GitHub, Vercel) in real-time with an intuitive weather-based interface. Stay updated on service health and incidents.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'Cloud Weather Team',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '127',
    },
    featureList: [
      'Real-time cloud service status monitoring',
      'Weather-based visual interface',
      'Incident timeline with filtering',
      'Auto-refresh every 60 seconds',
      'AWS status tracking',
      'Cloudflare status tracking',
      'GitHub status tracking',
      'Vercel status tracking',
    ],
    screenshot: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'}/icon-512.png`,
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com',
      },
    ],
  };

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Cloud Weather',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'}/icon-512.png`,
    description: 'Real-time cloud service status monitoring platform',
    sameAs: [
      // Add social media links when available
      // 'https://twitter.com/cloudweather',
      // 'https://github.com/cloudweather',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
    </>
  );
}
