"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline"; // Import the Underline extension
import { Bold, Italic, Underline as UnderlineIcon, List, ListOrdered } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
    const editor = useEditor({
        extensions: [StarterKit, Underline], // Add the Underline extension here
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <div className="border rounded-md p-2">
            <div className="flex gap-2 mb-2">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    disabled={!editor?.can().chain().focus().toggleBold().run()}
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    disabled={!editor?.can().chain().focus().toggleItalic().run()}
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleUnderline().run()}
                    disabled={!editor?.can().chain().focus().toggleUnderline().run()}
                >
                    <UnderlineIcon className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    disabled={!editor?.can().chain().focus().toggleBulletList().run()}
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                    disabled={!editor?.can().chain().focus().toggleOrderedList().run()}
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
};

export default RichTextEditor;