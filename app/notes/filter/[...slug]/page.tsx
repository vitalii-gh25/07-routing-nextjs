// app/notes/filter/[...slug]/page.tsx

import NoteList from '@/components/NoteList/NoteList';
import NotesLayout from '../layout';
import { fetchNotes } from '@/lib/api';
import SidebarNotes from '../@sidebar/default';

type Props = {
  params: { slug?: string[] };
};

const NotesByCategory = async ({ params }: Props) => {
  const slugArr = params.slug || ['all']; // ← просто берём slug
  const tag = slugArr[0] === 'all' ? undefined : slugArr[0];

  const data = await fetchNotes({ tag, page: 1, perPage: 12 });

  const sidebar = <SidebarNotes />; // создаём React-элемент

  return (
    <NotesLayout sidebar={sidebar}>
      <h1>Notes List {tag ? `(Tag: ${tag})` : '(All)'}</h1>
      {data.notes.length ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found.</p>
      )}
    </NotesLayout>
  );
};

export default NotesByCategory;
