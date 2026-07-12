import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Render de Markdown en servidor (sin JS al cliente). Estilos "prose" propios. */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose-rl">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            const external = href?.startsWith("http");
            return (
              <a
                href={href}
                className="text-structure underline decoration-line-strong underline-offset-2 hover:text-signal"
                {...(external ? { rel: "noopener noreferrer", target: "_blank" } : {})}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
