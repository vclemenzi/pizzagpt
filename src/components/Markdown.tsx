import { marked } from "marked";

export function Markdown({ children }: { children: string }) {
    return (
        <div
            className="markdown"
            dangerouslySetInnerHTML={{
                __html: marked(children),
            }}
        />
    );
}
