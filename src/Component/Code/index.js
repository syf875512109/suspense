import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/jsx/jsx';
// import './index.scss';

function Code(props) {
  const { str } = props;
  return (
    <CodeMirror
      value={str}
      options={{
        mode: 'jsx',
        theme: 'material',
        lineNumbers: true,
      }}
      height={'500px'}
      option={{
        lineNumbers: true,
        lineWrapping: true,
        foldGutter: true,
        fullScreen: true,
        styleActiveLine: true,
        height: '500px'
      }}
    />
  )
}

export default Code;
