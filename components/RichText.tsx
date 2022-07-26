import Blocks from "editorjs-blocks-react-renderer";
import React from "react";

import { parseEditorJSData } from "@/lib";

export interface RichTextProps {
  jsonStringData?: string | null | any;
  backupText?: string;
}

export function RichText({ jsonStringData,backupText = 'Nothing to show here!' }: RichTextProps) {

  if(!jsonStringData ) return null
  const data = parseEditorJSData(jsonStringData);

  if (!data) {
    return null;
  }

  if(data.blocks.length === 0 || data.blocks[0].data.text === ''){
    return (
      <article className="prose-2xl">
       <p>{backupText}</p>
      </article>
    );
  }else{
    return (
      <article className="prose-2xl">
        <Blocks data={data} />
      </article>
    );
  }
  
}

export default RichText;