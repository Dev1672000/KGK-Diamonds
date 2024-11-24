import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { getRegisteredBlocks } from '../plugins/plugin-registry'; 

const Editor = () => {
  const [editorContent, setEditorContent] = useState('');
  const editorRef = useRef(null);
  const quillRef = useRef<Quill | null>(null);

  const blocks = getRegisteredBlocks();  

 
  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write your content here...',
        modules: {
          toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline'],
            ['link'],
            ['blockquote'],
            [{ align: [] }],
            ['image'],
            ['custom-plugin'], 
          ],
        },
      });

    
      blocks.forEach((block) => {
        Quill.register(`formats/${block.name}`, block);
      });
    }
  }, [blocks]);

  
  const insertPluginBlock = (blockName: string) => {
    const block = blocks.find(b => b.name === blockName);
    if (block && quillRef.current) {
      const html = block.render({ images: ['image1.jpg', 'image2.jpg'] });
      const range = quillRef.current.getSelection();
      if (range) {
        quillRef.current.root.innerHTML += html; 
      }
    }
  };

  return (
    <div>
      <div ref={editorRef} style={{ minHeight: '300px' }}></div>

      <button onClick={() => insertPluginBlock('ImageSlider')}>Insert Image Slider</button>
    </div>
  );
};

export default Editor;
