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
      className={`prose-custom text-lg leading-relaxed text-stone sm:text-xl ${className}`}
    >
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h2 className="mt-12 font-display text-3xl font-semibold text-charcoal first:mt-0 sm:text-4xl">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-10 font-display text-2xl font-semibold text-charcoal sm:text-3xl">
              {children}
            </h3>
          ),
          ul: ({ children }) => (
            <ul className="mt-5 list-none space-y-4 border-l border-gold/30 pl-6">
              {children}
            </ul>
          ),
          li: ({ children }) => (
            <li className="relative text-stone before:absolute before:-left-[1.65rem] before:top-2.5 before:h-2 before:w-2 before:rounded-full before:bg-gold">
              {children}
            </li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-charcoal">{children}</strong>
          ),
          p: ({ children }) => <p className="mt-5 first:mt-0">{children}</p>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
