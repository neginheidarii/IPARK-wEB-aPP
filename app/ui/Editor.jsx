"use client";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import { toast } from "sonner";

const TinyEditor = ({ value, onValueChange }) => {
  const insertPlaceholder = (editor, placeholder, name = "") => {
    if (name === "signature") {
      toast.error('You cannot use the name "signature" for an input');
      return;
    }
    const placeholderContent = placeholder.includes("input")
      ? `{{${placeholder}::${name}}}`
      : `{{${placeholder}}}`;

    editor.insertContent(
      `<span class="placeholder">${placeholderContent}</span>&nbsp;`,
      { format: "raw" }
    );
  };

  return (
    <Editor
      value={value}
      apiKey={"cr31x86yagfr9q0yfkwyzvwp05zfos3c211w6ccz3fgyjo9m"}
      init={{
        selector: "textarea",
        height: 500,
        menubar: false,
        plugins: ["lists link image code media table help wordcount "],
        toolbar:
          "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | code | media",
        image_title: true,
        automatic_uploads: true,
        file_picker_types: "image",
        file_picker_callback: (callback, value, meta) => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.onchange = () => {
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = () => {
              const base64 = reader.result;
              callback(base64, { title: file.name });
            };
            reader.readAsDataURL(file);
          };
          input.click();
        },

        setup: (editor) => {
          editor.ui.registry.addButton("input", {
            text: "Input",
            onAction: () => {
              const name = prompt("Enter the name for the input:");
              insertPlaceholder(editor, "input", name);
            },
          });
          editor.ui.registry.addButton("signature", {
            text: "Signature",
            onAction: () => insertPlaceholder(editor, "signature"),
          });
        },
        // saving images to the firebase storage
        //   images_upload_url: "/your-upload-endpoint",
      }}
      onEditorChange={onValueChange}
    />
  );
};

export default TinyEditor;
