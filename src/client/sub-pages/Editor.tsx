/* eslint-disable no-param-reassign */

function Editor({ draft }: {draft: draft}) : JSX.Element {
  return (
    <div className="page edior">
      <form>
        <input type="text" value={draft.title} onChange={(e) => { draft.title = e.target.value; }} />
      </form>
    </div>
  );
}

export default Editor;
