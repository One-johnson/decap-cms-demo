import ReactMarkdown from "react-markdown";

interface MarkdownBodyProps {
  content: string;
  className?: string;
}

export default function MarkdownBody({
  content,
  className = "",
}: MarkdownBodyProps) {
  if (!content) return null;

  return (
    <div
      className={`prose-custom text-base leading-relaxed text-slate-600 ${className}`}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
