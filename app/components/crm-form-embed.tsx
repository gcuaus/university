export default function CrmFormEmbed({
  url,
  title = 'Request your free evaluation',
}: {
  url: string;
  title?: string;
}) {
  return (
    <div className="crm-form-embed">
      <iframe
        src={url}
        title={title}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
