import { useState } from 'react';
import Editor from '../sub-pages/Editor';

function New() {
  const [editing, setEditing] = useState<editing>({
    emoji: '',
    title: '',
    description: '',
    categoryId: '',
    questions: [],
  });

  return (
    <div className="page">
      <Editor editing={editing} setEditing={setEditing} />
    </div>
  );
}

export default New;
