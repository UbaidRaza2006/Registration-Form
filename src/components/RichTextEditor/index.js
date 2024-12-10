"use client"

import MarkdownPreview from '@uiw/react-markdown-preview';

const RichTextPreview = ({ richText, style }) => {
    return (
        <MarkdownPreview
            source={richText}
            style={{ width: "100%", ...style }}
        />
    )
}

export default RichTextPreview