import { transparentize } from "polished";
import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";
import styled from "styled-components";

const StyledReactMarkdown = styled(ReactMarkdown)`
  word-break: break-word;
`;

const Link = styled.a`
  text-decoration: none;
  color: var(--primary-color);

  &:hover {
    text-decoration: underline;
  }
`;

const BlockQuote = styled.blockquote`
  border-inline-start: 4px solid var(--border-color);
  padding-inline-start: 1rem;
  color: rgba(32, 33, 37, 0.8);
`;

const Image = styled.img`
  max-width: 100%;
  display: block;
`;

const Pre = styled.pre`
  border: 1px solid var(--border-color);
  padding: 0.75rem 0.5rem;
  border-radius: 0.25rem;
  background: var(--border-color);
  overflow: auto;
`;

const Code = styled.code<{ className?: string }>`
  :not(${Pre} > &) {
    color: #e55934;
    background-color: ${transparentize(0.9)("#E55934")};
    padding: 0 2px;
    border-radius: 4px;
    font-family: monospace;
  }
`;

interface Props {
  source: string;
}

const MarkdownRenderer = ({ source }: Props) => {
  return (
    <StyledReactMarkdown
      components={{
        a: Link,
        blockquote: BlockQuote,
        img: Image,
        code: Code,
        pre: Pre,
      }}
      remarkPlugins={[remarkGfm]}
    >
      {source}
    </StyledReactMarkdown>
  );
};

export { MarkdownRenderer };
