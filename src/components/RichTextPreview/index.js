"use client"

import MarkdownEditor from '@uiw/react-markdown-editor';

const RichTextEditor = ({ richText, setRichText, style }) => {
    return (
        <MarkdownEditor
            style={{ width: "100%", height: "100%", ...style }}
            onChange={(val) => setRichText(val)}
        />
    )
}

export default RichTextEditor
