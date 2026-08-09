/** Renders one or more JSON-LD schema objects as script tags. */
export default function JsonLd({ schema }) {
  const schemas = Array.isArray(schema) ? schema : [schema];
  return schemas.map((item, index) => (
    <script
      key={index}
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
    />
  ));
}
